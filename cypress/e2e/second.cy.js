import loginPage from "../pages/list.cy"; // Adjust the path as necessary

describe('Swag Labs Login Tests', () => {
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

        // Visit the Swag Labs page
        cy.visit('/');
    });

    it('should login successfully with standard user credentials and complete the checkout process', () => {
        // Verify page title
        cy.contains("Swag Labs");

        // Perform login
        loginPage.login();

        // Add items to the cart and verify
        loginPage.addItemAndVerify(1); // Adds the first item and verifies
        loginPage.addItemAndVerify(2); // Adds the second item and verifies
        loginPage.addItemAndVerify(3); // Adds the third item and verifies

        // Verify item prices
        loginPage.verifyItemPrice(1, '$29.99');
        loginPage.verifyItemPrice(2, '$9.99');
        loginPage.verifyItemPrice(3, '$15.99');

        // Remove the third item and verify cart item count
        loginPage.removeItem(3);
        loginPage.verifyItemCount(2);

        // Proceed to checkout
        loginPage.clickCheckoutButton();
        loginPage.fillFirstName('Abigail');
        loginPage.fillLastName('Arko');
        loginPage.fillPostalCode('1669');
        
        // Continue to the next step and verify summary total
        loginPage.clickContinueButton();
        loginPage.verifySummaryTotal('$39.98'); // Example total; adjust based on actual prices

        // Complete the checkout process
        loginPage.finishWork();
    });
});
