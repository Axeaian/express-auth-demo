const mockAuthenticateUser = jest.fn();
jest.doMock("../middlewares/auth", () => {
  return {
    authenticateUser: mockAuthenticateUser
  };
});

const app = require("../app");
const request = require("supertest");

test("GET /secret should respond with 200 if authentication middleware allows access", async () => {
  mockAuthenticateUser.mockImplementationOnce((req, res, next) => next());
  const response = await request(app).get("/secret");

  expect(response.status).toEqual(200);
  expect(response.body).toEqual({
    message: "Success! You can not see this without a token"
  });
});

test("GET /secret should respond with 401 if authentication middleware denies access", async () => {
  mockAuthenticateUser.mockImplementationOnce((req, res, next) =>
    res.sendStatus(401)
  );
  const response = await request(app).get("/secret");

  expect(response.status).toEqual(401);
  expect(response.body).toEqual({});
});
