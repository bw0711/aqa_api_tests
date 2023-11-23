import { faker } from '@faker-js/faker';

export class UserHelpers {

    constructor() {
        this.loginBaseUrl = Cypress.env("loginBaseUrl");
        this.registerBaseUrl = Cypress.env("registerBaseUrl");
        this.username = Cypress.env("USERNAME");
        this.password = Cypress.env("PASSWORD");
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