describe('Intercept backtrace.io API calls', () => {

  it('Visits the Sauce Demo website and interacts with the login form', () => {
    // Increase the timeout to allow the page to fully load
    cy.clearAllLocalStorage()
    cy.clearAllSessionStorage()
    cy.clearAllCookies()
    cy.visit('/') // Set to 60 seconds
    cy.contains("Swag Labs")
    cy.get('[data-test="username"]').type("standard_user")
    cy.get('[data-test="password"]').type("secret_sauce")
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

  }  )
})