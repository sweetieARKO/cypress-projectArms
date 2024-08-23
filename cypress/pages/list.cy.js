class LoginPage {
    elements = {
        username: () => cy.get('[data-test="username"]'),
        password: () => cy.get('[data-test="password"]'),
        loginBtn: () => cy.get('[data-test="login-button"]'),
        firstItem: () => cy.get('[data-test="add-to-cart-sauce-labs-backpack"]'),
        secondItem: () => cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]'),
        thirdItem: () => cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'),
        cart: () => cy.get('[data-test="shopping-cart-link"]'),
        firstPrice: () => cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'),
        secondPrice: () => cy.get(':nth-child(2) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'),
        thirdPrice: () => cy.get(':nth-child(3) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'),
        removeThirdItem: () => cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]'),
        checkout: () => cy.get('[data-test="checkout"]'),
        firstName: () => cy.get('[data-test="firstName"]'),
        lastName: () => cy.get('[data-test="lastName"]'),
        postalCode: () => cy.get('[data-test="postalCode"]'),
        continue: () => cy.get('[data-test="continue"]'),
        error: () => cy.get('[data-test="error"]'),
        finish: () => cy.get('[data-test="finish"]'),
        complete: () => cy.get('[data-test="complete-header"]'),
        summaryTotal: () => cy.get('.summary_subtotal_label'),
        cartBadge: () => cy.get('[data-test="shopping-cart-badge"]')
    }

    login() {
        this.elements.username().type("standard_user");
        this.elements.password().type("secret_sauce");
        this.elements.loginBtn().click();
    }

    addItemAndVerify(itemNumber) {
        const items = [this.elements.firstItem, this.elements.secondItem, this.elements.thirdItem];
        items[itemNumber - 1]().click();
        this.elements.cart().should('have.text', itemNumber.toString());
    }

    verifyItemPrice(itemNumber, expectedPrice) {
        const prices = [this.elements.firstPrice, this.elements.secondPrice, this.elements.thirdPrice];
        prices[itemNumber - 1]().should('have.text', expectedPrice);
    }

    removeItem(itemNumber) {
        this.elements.cart().click();
        const removeItems = [this.elements.removeFirstItem, this.elements.removeSecondItem, this.elements.removeThirdItem];
        removeItems[itemNumber - 1]().click();
    }

    verifyItemCount(expectedCount) {
        this.elements.cart().should('have.text', expectedCount.toString());
    }

    clickCheckoutButton() {
        this.elements.checkout().click();
    }

    fillFirstName(name) {
        this.elements.firstName().type(name);
    }

    fillLastName(name) {
        this.elements.lastName().type(name);
    }

    fillPostalCode(code) {
        this.elements.postalCode().type(code);
    }

    clickContinueButton() {
        this.elements.continue().click();
    }

    verifySummaryTotal(expectedTotal) {
        this.elements.summaryTotal().should('contain.text', expectedTotal);
    }

    finishWork() {
        this.elements.finish().click();
        this.elements.complete().should('have.text', 'Thank you for your order!');
        this.elements.cartBadge().should('not.exist');
    }
}

module.exports = new LoginPage();
''