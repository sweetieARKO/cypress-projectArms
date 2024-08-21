class LoginPage {
    elements = {
        username: () => cy.get('[data-test="username"]'),
        password: () => cy.get('[data-test="password"]'),
        loginBtn: () => cy.get('[data-test="login-button"]'),
        fisrtItem:()=>cy.get('[data-test="add-to-cart-sauce-labs-backpack"]'),
        secondItem:()=> cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]'),
        thirdItem:()=>cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'),
        cart:()=>cy.get('[data-test="shopping-cart-link"]'),
        firstPrice:()=> cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'),
        secondPrice:()=>cy.get(':nth-child(2) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'),
        thirdPrice:()=>cy.get(':nth-child(3) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]'),
            
        removeThirdItem:()=>cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]'),
         checkout:()=>cy.get('[data-test="checkout"]'),
         firstName:()=>cy.get('[data-test="firstName"]'),
         lastname:()=>cy.get('[data-test="lastName"]'),
postalcode:()=>cy.get('[data-test="postalCode"]'),
continue:()=>cy.get('[data-test="continue"]'),

// Verify that user cannot proceed unless all required fields are filled out
Error:()=>cy.get('[data-test="error"]'),


    }

    login() {
        this.elements.username().type("standard_user");
        this.elements.password().type("secret_sauce");
        this.elements.loginBtn().click();
    }
    addItemsandVerifyFirstItem(){
        this.elements.fisrtItem().click()
        this.elements.cart().should('have.text', '1')
    }
    addItemsandVerifySecondItem(){
     this.elements.secondItem().click()
     this.elements.cart().should('have.text', '2')
    }
    addItemsandVeriThirdItem(){

        this.elements.thirdItem().click()
        this.elements.cart().should('have.text', '3')
    }
    verifyFirstPrice(){
        this.elements.firstPrice().should('have.text', '$29.99');
    
    }
    verifySecondPrice(){
        this.elements.secondPrice().should('have.text', '$9.99')
    }
    verifyThirdPrice(){
        this.elements.thirdPrice().should('have.text', '$15.99')
    }
    removeThirdItem(){
        this.elements.cart().click();
        this.elements.removeThirdItem().click()
    }
    verifyThatOnlyTwoItemsInCart(){
        this.elements.cart().should('have.text', '2')
    }

}

module.exports = new LoginPage();
