import VideoAPI from "api/actions/video";
import axios from "axios";
import config from "api/config";

jest.mock("hooks/useVideos");
jest.mock("axios");

const mockAxios = axios;

describe("Videos tests", () => {
  describe("video share function", () => {
    const data = {
      youtubeUrl: "youtubeUrl",
    };

    describe("success", () => {
      const response = "success";

      beforeEach(() => {
        mockAxios.mockResolvedValue(response);
      });

      test("should call endpoint with given params", async () => {
        await VideoAPI.share(data);

        expect(mockAxios).toBeCalledWith({
          cancelToken: undefined,
          headers: {},
          method: "POST",
          data: {
            youtubeUrl: "youtubeUrl",
          },
          params: {},
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
