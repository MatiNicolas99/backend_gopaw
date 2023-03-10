const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const pool = require("../config/appconfig");
const {
  appGetVeterinarys,
  appGetReviews,
  appDelReviewById,
  
} = require("./appcontroller");

const waitForPort = require("wait-for-port");

describe("my server", () => {
  beforeAll(async () => {
    await new Promise((resolve) => {
      waitForPort("localhost", 8080, resolve);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  jest.mock("./appcontroller.js");

  describe("appGetVeterinarys", () => {
    test("should return an array of veterinarys", async () => {
      const getVeterinarys = jest.fn();
      const mockVeterinarys = [
        {
          id: 4,
          veterinary_name: "pedro",
          phone: "123412345",
          email: "pedro@gmail.com",
          image: null,
        },
        {
          id: 6,
          veterinary_name: "pedro",
          phone: "123412345",
          email: "pedro@gmail.com",
          image: null,
        },
        {
          id: 2,
          veterinary_name: "sanchoPanza",
          phone: "99988877744",
          email: "sancho@panza.com",
          image: null,
        },
        {
          email: "test@gmail.com",
          id: 8,
          image: null,
          phone: "123123123",
          veterinary_name: "test",
        },
      ];
      getVeterinarys.mockResolvedValue(mockVeterinarys);
      const req = {};
      const res = { json: jest.fn() };
      await appGetVeterinarys(req, res);
      expect(res.json).toHaveBeenCalledWith(mockVeterinarys);
    });

    test("should return an error response if getVeterinarys throws an error", async () => {
      const getVeterinarys = jest.fn();
      const mockError = { message: "Something went wrong" };
      getVeterinarys.mockRejectedValue(mockError);
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      await appGetVeterinarys(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(mockError);
    });
  });

  describe("appGetReviews", () => {
    test("should return an array of reviews", async () => {
      const mockReviews = [
        {
          id: 3,
          date: "12/30/2023",
          title: "review test",
          content: "asdasdasdasdassdasdasdasdasdasdasdas",
          owner_id: 5,
          veterinary_id: 6,
        },
        {
          id: 1,
          date: "12/31/2023",
          title: "edicion de review",
          content: "se edita el review",
          owner_id: 1,
          veterinary_id: 2,
        },
      ];

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockReviews),
        })
      );

      const req = {};
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await appGetReviews(req, res);

      expect(res.json).toHaveBeenCalledWith(mockReviews);
    });
  });

  describe("appDelReviewById", () => {
    test("should delete review successfully", async () => {
      const mockReq = {
        body: { id: 1 },
        header: () => "Bearer mockToken",
      };
      const mockRes = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      jest.spyOn(jwt, "verify").mockImplementation(() => {});
      jest.spyOn(pool, "query").mockImplementation(() => {
        return { rowCount: 1 };
      });
  
      await appDelReviewById(mockReq, mockRes);
  
      expect(jwt.verify).toHaveBeenCalled();
      expect(pool.query).toHaveBeenCalledWith(
        "DELETE FROM review WHERE id = $1",
        [1]
      );
      expect(mockRes.send).toHaveBeenCalledWith("Review eliminado con éxito");
    });
  
    test("should throw error if review not found", async () => {
      const mockReq = {
        body: { id: 1 },
        header: () => "Bearer mockToken",
      };
      const mockRes = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      jest.spyOn(jwt, "verify").mockImplementation(() => {});
      jest.spyOn(pool, "query").mockImplementation(() => {
        return { rowCount: 0 };
      });
  
      await appDelReviewById(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.send).toHaveBeenCalledWith({
        code: 404,
        message: "No se encontró ningún review con este ID",
      });
    });
  
    test("should throw error if authorization fails", async () => {
      const mockReq = {
        body: { id: 1 },
        header: () => "Bearer invalidToken",
      };
      const mockRes = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      jest.spyOn(jwt, "verify").mockImplementation(() => {
        throw new Error("invalid token");
      });
  
      await appDelReviewById(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith(expect.any(Error));
    });
  
    test("should throw error if query fails", async () => {
      const mockReq = {
        body: { id: 1 },
        header: () => "Bearer mockToken",
      };
      const mockRes = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
  
      jest.spyOn(jwt, "verify").mockImplementation(() => {});
      jest.spyOn(pool, "query").mockImplementation(() => {
        throw new Error("query error");
      });
  
      await appDelReviewById(mockReq, mockRes);
  
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

});
