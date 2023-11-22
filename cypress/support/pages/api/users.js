/// <reference types= "cypress" />
import { UserHelpers } from "../../helpers/user.helpers";
const helpers = new UserHelpers();

export class UsersData {

    registerNewUser() {

        cy.fixture("userData").then((userData) => {
            userData.newUser = helpers.generateUserData();
            cy.request({
                method: "POST",
                url: helpers.registerBaseUrl,
                body: userData.newUser,
            }).then((response) => {
                expect(response.status).to.eq(200);
            })
        })
    }

    loginExistingUser() {
        const loginData = {
            username: helpers.username,
            password: helpers.password
        };

        cy.request({
            method: "POST",
            url: helpers.loginBaseUrl,
            body: loginData
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    }
}