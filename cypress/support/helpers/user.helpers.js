import { faker } from '@faker-js/faker';

export class UserHelpers {

    constructor() {
        this.baseUrl = Cypress.env("baseUrl");
        this.username = Cypress.env("USERNAME");
        this.password = Cypress.env("PASSWORD");
        this.userId = Cypress.env("USERID");
        this.bookId = Cypress.env("BOOKID");
    }


    generateUserData() {
        const commonPassword = faker.internet.password();

        return {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            username: faker.internet.userName(),
            password: commonPassword,
            confirmPassword: commonPassword,
            gender: faker.person.sex()
        }
    }
}