import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import createChart, { CreateChartParams } from "./createChart";

jest.mock("../../lib/mongodb", () => ({
  __esModule: true,
  default: {
    db: jest.fn(() => ({
      collection: jest.fn(() => ({
        insertOne: jest.fn((data) => ({ insertedId: data })),
      })),
    })),
  },
}));

describe("createChart", () => {
  const mockedAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockedAxios.reset();
  });

  it("calls the Astrology API with the correct parameters", async () => {
    const params: CreateChartParams = {
      name: "Alexandra VDG",
      gender: "female",
      email: "alexandra_von_der_goltz@brown.edu",
      day: 18,
      month: 3,
      year: 2002,
      hour: 6,
      min: 0,
      lat: 19.132,
      lng: 72.342,
      tzone: 5.5,
    };

    mockedAxios
      .onPost("https://json.astrologyapi.com/v1/western_horoscope")
      .reply(200, {
        data: {
          planets: [
            {
              name: "Sun",
              full_degree: 275.6427,
              norm_degree: 5.6427,
              speed: 1.019,
              is_retro: "false",
              sign_id: 10,
              sign: "Capricorn",
              house: 2,
            },
            // Add other planets as needed
          ],
          houses: [
            {
              house: 1,
              sign: "Sagittarius",
              degree: 240.71431,
            },
          ],
          ascendant: 240.71431015862024,
          midheaven: 156.92135925483103,
        },
      });
    const res = {
      json: jest.fn(),
    };

    const result = await createChart(params, res);

    expect(result).toBeDefined();
    // Add more assertions based on the expected behavior of createChart
  });

  it("handles errors gracefully", async () => {
    mockedAxios
      .onPost("https://json.astrologyapi.com/v1/western_horoscope")
      .reply(500);

    const params: CreateChartParams = {
      name: "Alexandra VDG",
      gender: "female",
      email: "alexandra_von_der_goltz@brown.edu",
      day: 18,
      month: 3,
      year: 2002,
      hour: 6,
      min: 0,
      lat: 19.132,
      lng: 72.342,
      tzone: 5.5,
    };
    const res = {
      json: jest.fn(),
    };

    await expect(createChart(params, res)).rejects.toThrowError(
      "An error occurred while fetching data"
    );
  });
});
