import { render, screen } from "@testing-library/react";
import VideoCard from ".";

test("Video card should be renderred", () => {
  const video = {
    description: "",
    title: "Video title",
    user: {
      email: "",
    },
  };

  const props = { video };

   render(<VideoCard {...props} />);

  expect(screen.getByText("Video title")).toBeInTheDocument();
});
