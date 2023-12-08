/// <reference types= "cypress" />
import { Wishlist } from "../../../../support/pages/api/wishlist"
import { UsersData } from "../../../../support/pages/api/users";
const usersData = new UsersData();
const wishedBook = new Wishlist;

describe("API tests for /wishlist", () => {
    beforeEach(() => {
        return usersData.loginExistingUser().then(() => {
            wishedBook.setUserToken(process.env.USER_TOKEN);
            wishedBook.clearTheWishlist();
        });
    });

    afterEach(() => {
        wishedBook.clearTheWishlist();
    });

    it("Delete existen book from the wishlist", () => {
        wishedBook.addABookToTheWishlist().then(() => {
            wishedBook.getTheListOfWishedBooks().then((response) => {
                const bookIdFromResponse = response.body[0].bookId;
                wishedBook.addABookToTheWishlist(bookIdFromResponse).then((deleteResult) => {
                    expect(deleteResult.response.status).to.eq(200);
                });
            });
        });
    });

    it("Add a book to the wishlist", () => {
        wishedBook.addABookToTheWishlist().then((result) => {
            const response = result.response;
            const selectedBookId = result.selectedBookId;

            cy.fixture('bookData.json').then(bookData => {
                const selectedBook = bookData.find(book => book.bookId === selectedBookId);
                const book = response.body[0];

                expect(book.bookId).to.eq(selectedBook.bookId);
                expect(book.title).to.eq(selectedBook.title);
                expect(book.author).to.eq(selectedBook.author);
                expect(book.category).to.eq(selectedBook.category);
                expect(book.price).to.eq(selectedBook.price);
                expect(book.coverFileName).to.eq(selectedBook.coverFileName);
            });
        });
    });
});