import { render, screen } from "@testing-library/react";
import useVideos from "hooks/useVideos";
import HomePage from ".";
import VideoAPI from "api/actions/video";
import axios from "axios";
import config from "api/config";

jest.mock("hooks/useVideos");
jest.mock("axios");

const mockAxios = axios;
const mocUseVideos = useVideos;

test("Videos should be renderred", () => {
  mocUseVideos.mockImplementation(() => {
    return {
      handleShareVideo: jest.fn,
      videos: [
        {
          description: "Test video description",
          id: "6303d6a3757b4c001de1ef4a",
          thumbnail: "https://i.ytimg.com/vi/aU2vd3oLtgY/hqdefault.jpg",
          title: "Test video title",
          user: { email: "test@gmail.com", id: "6303d4df757b4c001de1ef36" },
          email: "test@gmail.com",
          id: "6303d4df757b4c001de1ef36",
          youtubeId: "aU2vd3oLtgY",
        },
      ],
      fetchVideos: jest.fn,
    };
  });

  render(<HomePage />);

  expect(screen.getByText("Test video description")).toBeInTheDocument();
});

describe("Videos tests", () => {
  describe("video list function", () => {
    const data = {
      limit: 1000,
      sortBy: "createdAt:desc",
    };

    describe("success", () => {
      const response = {
        limit: 1000,
        page: 1,
        results: [
          {
            description: "",
            title: "Video title",
            user: {
              email: "",
            },
          },
        ],
        totalPages: 1,
        totalResults: 6,
      };

      beforeEach(() => {
        mockAxios.mockResolvedValue(response);
      });

      test("should call endpoint with given params", async () => {
        await VideoAPI.list(data);

        expect(mockAxios).toBeCalledWith({
          cancelToken: undefined,
          headers: {},
          method: "GET",
          data: "",
          params: {
            limit: "1000",
            sortBy: "createdAt:desc",
          },
          url: `${config.API.VIDEO_SERVICE}`,
        });
      });

      test("should return response data", async () => {
        const response = await VideoAPI.list(data);
        expect(response).toStrictEqual(undefined);
      });
    });
  });
});
