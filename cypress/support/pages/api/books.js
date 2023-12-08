/// <reference types= "cypress" />

export class BookList {
    getAllBooksList() {
        return cy.request({
            method: "GET",
            url: "/Book"
        }).then((response) => {
            cy.writeFile('cypress/fixtures/books.json', response.body);
        }) 
    }
}