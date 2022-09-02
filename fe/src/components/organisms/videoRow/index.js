import VideoCard from 'components/molecules/videoCard';
import React from 'react';
import styled from 'styled-components';

function VideoRow({ video }) {
  return (
    <VideoRowContainerStyled>
      <img src={video?.thumbnail} alt={video?.title} />
      <VideoCard video={video} />
    </VideoRowContainerStyled>
  );
}

const VideoRowContainerStyled = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 32px;
  width: 100%;
  justify-content: center;

  @media screen and (min-width: 1080px) {
    justify-content: flex-start;
  }
  img {
    max-width: 100%;
  }
  div {
    &:nth-child(2) {
      width: 90%;

      @media screen and (min-width: 1080px) {
        width: 50%;
      }
    }
  }
`;

export default VideoRow;
