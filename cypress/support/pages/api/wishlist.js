import { UserHelpers } from "../../helpers/user.helpers";
const user = new UserHelpers;

export class Wishlist {
    #userToken;

    setUserToken(token) {
        this.#userToken = `Bearer ${token}`;
    }

    #getRandomBookId(bookData) {
        const allBookIds = bookData.map(book => book.bookId);
        return allBookIds[Math.floor(Math.random() * allBookIds.length)];
    }

    addABookToTheWishlist(bookId) {
        return cy.fixture('bookData.json').then((bookdata) => {
            const selectedBookId = bookId || this.#getRandomBookId(bookdata);

            return cy.request({
                method: "POST",
                url: `/Wishlist/ToggleWishlist/${user.userId}/${selectedBookId}`,
                headers: {
                    'Authorization': this.#userToken
                },
                body: {
                    userId: user.userId,
                    bookId: selectedBookId
                }
            }).then(response => {
                return {
                    response,
                    selectedBookId: selectedBookId
                }
            });
        });
    }

    getTheListOfWishedBooks() {
        return cy.request({
            method: "GET",
            url: `/Wishlist/${user.userId}`,
            headers: {
                'Authorization': this.#userToken
            }
        }).then(response => {
            return {
                response: response,
                body: response.body
            }
        });
    }

    clearTheWishlist() {
        return cy.request({
            method: "DELETE",
            url: `/Wishlist/${user.userId}`,
            headers: {
                'Authorization': this.#userToken
            }
        });
    }
}