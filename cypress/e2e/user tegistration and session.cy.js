///<reference types="cypress"/>
import { faker } from "@faker-js/faker";

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

describe("User Registration and Session Handling", () => {
  let name = faker.person.firstName();
  const user = {
    name: name,
    email: faker.internet.email().toLowerCase(),
    //
    title: "Mr" || "Mrs",
    password: faker.internet.password(10),
    day: faker.number.int({ min: 1, max: 31 }),
    month: months[Math.floor(Math.random() * months.length)],
    year: faker.number.int({ min: 1900, max: 2021 }),
    firstname: name,
    lastname: faker.person.lastName(),
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.streetAddress(),
    country: "India",
    city: faker.location.city(),
    state: faker.location.state(),
    zipcode: faker.location.zipCode(),
    mobile_number: "98" + faker.string.numeric(8),
  };

  beforeEach(() => {
    cy.visit("/");
  });

  it("should register a new user and verify login", () => {
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.get('[data-qa="signup-button"]').click();
    cy.get(`input[value='${user.title}']`).click();
    cy.get("#id_gender2").check();
    cy.get('[data-qa="password"]').type(user.password);
    cy.get('[data-qa="days"]').select(user.day);
    cy.get('[data-qa="months"]').select(user.month);
    cy.get('[data-qa="years"]').select(String(user.year));
    cy.get("#newsletter").check();
    cy.get("#optin").check();
    cy.get('[data-qa="first_name"]').type(user.firstname);
    cy.get('[data-qa="last_name"]').type(user.lastname);
    cy.get('[data-qa="company"]').type(user.company);
    cy.get('[data-qa="address"]').type(user.address);
    cy.get('[data-qa="address2"]').type(user.address2);
    cy.get('[data-qa="country"]').select(user.country);
    cy.get('[data-qa="state"]').type(user.state);
    cy.get('[data-qa="city"]').type(user.city);
    cy.get('[data-qa="zipcode"]').type(user.zipcode);
    cy.get('[data-qa="mobile_number"]').type(user.mobile_number);
    cy.get('[data-qa="create-account"]').click();
    cy.get("b").should("contain", "ACCOUNT CREATED!");
    cy.writeFile("cypress/fixtures/user.json", user);
  });
});
