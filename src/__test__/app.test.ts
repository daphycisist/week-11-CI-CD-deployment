import supertest from "supertest";
import app from "../app";
import mongoose from "mongoose";

afterAll(() => {
  mongoose.connection.dropDatabase()
  mongoose.disconnect();
});

const request = supertest(app);

describe("Test all Root Queries on Organization", () => {
  it("Get all organizations", (done) => {
    request
      .post("/graphql1")
      .send({
        query: "{AllOrganizations{organization id}}",
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.AllOrganizations.length).toBeLessThan(16);
        done();
      });
  });

  it("Get an organization", (done) => {
    request
      .post("/graphql1")
      .send({
        query: '{OneOrganization(organization: "Third"){organization id}}',
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body.data.OneOrganization.organization).toEqual("Third");
        expect(res.body).toBeInstanceOf(Object);
        done();
      });
  });
});

describe("Test all Mutations on Organization", () => {

  it("Signup a new user", (done) => {
    let user = `user${Math.trunc(Math.random() * 100)}@email.com`
    request
      .post("/graphql1")
      .send({
        query: `mutation{signup(email: ${user}, password: "12345"){
            email
            password
          }
        }`
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        // expect(res.body.data.signup).toHaveProperty('email', user)
        done();
      });
  });

  it("Signup an already existing user", (done) => {
    request
      .post("/graphql1")
      .send({
        query: `mutation{signup(email: "Feyi@email.com", password: "12345"){
            email
            password
          }
        }`,
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        let expected = res.body.errors[0].message;
        expect(res.status).toBe(200);
        expect(expected).toEqual("User already Exists");
        done();
      });
  });

  it("Log user in", (done) => {
    request
      .post("/graphql1")
      .send({
        query: `mutation{login (email: "test@email.com", password: "12345"){
            email
            password
          }
        }`,
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.status).toBe(200);
        expect(res.body.data.login).toHaveProperty("email", "test@email.com");
        expect(res.body.data.login.password.length).toBeGreaterThan(10);
        done();
      });
  });

  it("Creates an organization", (done) => {
    request
      .post("/graphql1")
      .send({
        query: `mutation{addOrganization(organization: "Carrington", products:["Wheels", "Blings"], marketvalue: 70000000, address: "Hillary street, Montonna Carlifornia", ceo: "Wale trent", country: "Greece", employees:["Cornor", "William", "Sabitzer", "Kelly"]){
            products
            noOfEmployees
            employees
          }
        }`,
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect.objectContaining({
          organization: "Carrington",
          products: ["Wheels", "Blings"],
          marketvalue: 70000000,
          address: "Hillary street, Montonna Carlifornia",
          ceo: "Wale trent",
          country: "Greece",
          employees: ["Cornor", "William", "Sabitzer", "Kelly"],
        });
        done();
      });
  });

  it("Updates an organization", (done) => {
    request
      .post("/graphql1")
      .send({
        query: `mutation{updateOrganization(organization: "Carrington", ceo: "Harry", country: "England"){
          organization, ceo, country
        }}`,
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect.objectContaining({
          ceo: "Harry",
          country: "England",
        });
        done();
      });
  });

  it("Deletes an organization", (done) => {
    request
      .post("/graphql1")
      .send({
        query: `mutation{deleteOrganization(organization: "Carrington"){
          organization
          employees
        }}`,
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.status).toBe(200);
        expect(res.body.data.deleteOrganization.organization).toEqual(
          "Carrington"
        );
        done();
      });
  });

  it("Deletes an organization that does not exist in the database", (done) => {
    request
      .post("/graphql1")
      .send({
        query: `mutation{deleteOrganization(organization: "Second"){
          organization
          employees
        }}`,
      })
      .set("Accept", "application.json")
      .expect("Content-Type", /json/)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.status).toBe(200);
        console.log(res.body.data.deleteOrganization);
        expect(res.body.data.deleteOrganization).toBe(null);
        done();
      });
  });
});
