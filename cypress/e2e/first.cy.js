describe('Intercept backtrace.io API calls', () => {

  before(() => {
    // Set up intercept for backtrace.io API calls
    cy.intercept('POST', '**/backtrace.io/**', (req) => {
      req.continue((res) => {
        res.send({
          statusCode: 200,
          body: { success: true },
        });
      });
    }).as('backtraceAPI'); // Alias for easier reference

    // Clear session, cookies, and local storage
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearAllCookies();

    // Visit the Swag Labs page and login
    cy.visit('/');
    cy.contains("Swag Labs");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();
  });

  it('Add items to cart and verify cart count', () => {
    // Add items to the cart and check the cart count increments
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
    
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2');
    
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '3');

    cy.get(':nth-child(1) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]')
      .should('have.text', '$29.99');
    
    cy.get(':nth-child(2) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]')
      .should('have.text', '$9.99');
    
    cy.get(':nth-child(3) > [data-test="inventory-item-description"] > .pricebar > [data-test="inventory-item-price"]')
      .should('have.text', '$15.99');
    cy.get('[data-test="shopping-cart-link"]').click()
cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click()

cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2');
cy.get('[data-test="checkout"]').click()
const name = "Abigail"
const lastname = "Arko"
const postalcode = "1299"
cy.get('[data-test="firstName"]').type(name)
cy.get('[data-test="lastName"]').type(lastname)
cy.get('[data-test="postalCode"]').type(postalcode)
cy.get('[data-test="continue"]').click(); 
cy.get('[data-test="error"]').should('not.exist');

// Calculate the total price of items in the cart and verify
const totalPrice = 29.99 + 9.99;
cy.get('.summary_subtotal_label').should('contain.text', `$${totalPrice.toFixed(2)}`);
const taxRate = 0.08;
const expectedTax = totalPrice * taxRate;
const expectedTotalAmount = totalPrice + expectedTax;

cy.get('.summary_tax_label').should('contain.text', `$${expectedTax.toFixed(2)}`);
cy.get('.summary_total_label').should('contain.text', `$${expectedTotalAmount.toFixed(2)}`);

// Click finish and verify that the order was successful
cy.get('[data-test="finish"]').click();
cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');

// Ensure that no number is displayed on the cart icon after the order is confirmed
cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
// Complete the purchase (uncomment the next line if needed)
// cy.get('[data-test="finish"]').click();
}); 
})