describe("Product Browsing & Filtering", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should complete product browsing, cart addition, and checkout flow", () => {
    // Navigate to Products page
    cy.get(".nav.navbar-nav li").contains("Products").click();
    cy.url().should("include", "/products");

    // Browse Women → first subcategory
    cy.get('a[href="#Women"]').click();
    cy.get("#Women .panel-body ul li").first().click();

    // Verify product list is visible
    cy.get(".features_items").should("be.visible");
    cy.get(".features_items .title").should("be.visible");

    // View details of third product
    cy.get(".features_items .product-image-wrapper")
      .eq(2)
      .within(() => {
        cy.get(".choose .nav li a").click();
      });

    // Verify product details
    cy.get(".product-information > h2")
      .should("be.visible")
      .and("contain.text", "Sleeveless Dress");

    cy.get(".product-information span").contains("Rs. 1000").should("exist");
    cy.get(".product-information").should("contain.text", "In Stock");

    // Add to cart with quantity
    cy.get("#quantity").clear().type("3");
    cy.get("button.cart").click(); // Use class or data-qa if possible
    cy.get(".modal-footer .btn").click();
    cy.get(".modal-title").should("contain", "Added!");

    // Add 2 more products
    cy.get(".nav.navbar-nav li").contains("Products").click();

    // Add product 3
    cy.get(".features_items .product-image-wrapper")
      .eq(2)
      .within(() => {
        cy.get(".productinfo .btn").click();
      });
    cy.get(".modal-footer .btn").click();

    // Add product 18
    cy.get(".features_items .product-image-wrapper")
      .eq(17)
      .within(() => {
        cy.get(".productinfo .btn").click();
      });
    cy.get(".modal-footer .btn").click();

    // Go to Cart
    cy.get(".shop-menu .nav li").contains("Cart").click();
    cy.get(".col-sm-6 .btn").click(); // Proceed to checkout
    cy.get(":nth-child(7) > .btn").click(); // Place order

    // Enter payment info
    cy.get('[data-qa="name-on-card"]').type("John Doe");
    cy.get('[data-qa="card-number"]').type("1234567890123456");
    cy.get('[data-qa="cvc"]').type("123");
    cy.get('[data-qa="expiry-month"]').type("12");
    cy.get('[data-qa="expiry-year"]').type("2027");
    cy.get('[data-qa="pay-button"]').click();

    // Confirm order
    cy.get(".col-sm-9 > p").should(
      "contain",
      "Congratulations! Your order has been confirmed!"
    );
    cy.get('[data-qa="continue-button"]').click();

    // Logout
    cy.get(".shop-menu .nav li").contains("Logout").click();
    Cypress.session.clearAllSavedSessions();

    //  re-login
    cy.login();
  });
});
