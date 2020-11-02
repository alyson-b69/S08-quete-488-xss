const request = require("supertest");

const app = require("./app");
const agent = request.agent(app);

describe("app", () => {
  describe("when authenticated", () => {
    beforeEach(async () => {
      await agent
        .post("/login")
        .send("username=randombrandon&password=randompassword");
    });

    describe("POST /messages", () => {
      describe("with non-empty content", () => {
        describe("with JavaScript code in personalWebsiteURL", () => {
          test("responds with error", async (done) => {
            const response = await request(app)
              .post("/message")
              .send(
                "content=testwithkack&personalWebsiteURL=javascript:alert('hack tentative');"
              );
            expect(response.statusCode).toBe(400);
            done();
          });
        });

        describe("with HTTP URL in personalWebsiteURL", () => {
          test("responds with success", async (done) => {
            const response = await agent
              .post("/message")
              .send("content=test&personalWebsiteURL=https://google.fr");
            expect(response.statusCode).toBe(201);
            done();
          });
        });
      });
    });
  });
});
