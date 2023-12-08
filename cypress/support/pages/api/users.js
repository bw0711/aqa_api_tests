/// <reference types= "cypress" />
import { UserHelpers } from "../../helpers/user.helpers";
import { Wishlist } from "../api/wishlist";
const helpers = new UserHelpers();

export class UsersData {
    #wishedBook = new Wishlist();

    registerNewUser() {
        cy.fixture("userData").then((userData) => {
            userData.newUser = helpers.generateUserData();
            cy.request({
                method: "POST",
                url: "/user",
                body: userData.newUser,
            })
        })
    }

    loginExistingUser() {
        const loginData = {
            username: helpers.username,
            password: helpers.password
        };

        return cy.request({
            method: "POST",
            url: "/login",
            body: loginData
        }).its('body').then((body) => {
            expect(body).to.have.property('token');
            Cypress.env('userToken', body.token);
            process.env.USER_TOKEN = body.token;

            this.#wishedBook.setUserToken(body.token);
        });
    }
}