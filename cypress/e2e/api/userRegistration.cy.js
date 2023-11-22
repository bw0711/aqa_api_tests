import { UsersData } from "../../support/pages/api/users";
const user = new UsersData;

describe("Register a new user", () => {
    it("Register a new user using API", () => {
        user.registerNewUser();
    })

    it("Login existing user using API", () => {
        user.loginExistingUser();
    })
})