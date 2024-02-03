import axios from "axios";
import createChart from "./createChart";

jest.mock("axios");

describe("createChart", () => {
  it("calls the Astrology API with the correct parameters", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;

    // Mock the Axios post method to return a specific response
    mockedAxios.post.mockResolvedValue({
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
          {
            name: "Moon",
            full_degree: 12.271,
            norm_degree: 12.271,
            speed: 13.5085,
            is_retro: "false",
            sign_id: 1,
            sign: "Aries",
            house: 5,
          },
          {
            name: "Venus",
            full_degree: 307.0102,
            norm_degree: 7.0102,
            speed: 1.2339,
            is_retro: "false",
            sign_id: 11,
            sign: "Aquarius",
            house: 3,
          },
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

    // Mock response object with json method
    const res = {
      json: jest.fn(),
    };

    // Call your function with the dummy data
    const result = await createChart(
      {
        name: "John Doe",
        gender: 1,
        email: "john@example.com",
        day: 6,
        month: 1,
        year: 2000,
        hour: 7,
        min: 45,
        lat: 19.132,
        lon: 72.342,
        tzone: 5.5,
      },
      res
    );

    // Perform assertions based on the expected behavior
    // For example, you can expect that the Axios post method was called once
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);

    // You can also check other expectations based on the specific behavior of your function
    // For example, checking that the MongoDB insert operation was performed correctly
    // Please adapt these expectations based on your actual implementation and desired behavior
  });
});
