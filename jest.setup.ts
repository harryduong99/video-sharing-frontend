import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";
import dotenv from "dotenv";

fetchMock.enableMocks();

dotenv.config({ path: "./.env" });
