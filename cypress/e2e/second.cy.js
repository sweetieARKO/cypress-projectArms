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

    it('should login successfully with standard user credentials', () => {
        cy.contains("Swag Labs");
        loginPage.login();
        loginPage.addItemsandVerifyFirstItem();
        loginPage.addItemsandVerifySecondItem();
        loginPage.addItemsandVeriThirdItem();
        loginPage.verifyFirstPrice();
        loginPage.verifySecondPrice();
        loginPage.verifyThirdPrice();
        loginPage.removeThirdItem();
        loginPage.verifyThatOnlyTwoItemsInCart();
    })
});
