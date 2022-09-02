import VideoRow from 'components/organisms/videoRow';
import useVideos from 'hooks/useVideos';
import React, { useMemo } from 'react';
import styled from 'styled-components';

const HomePage = () => {
  const hookProps = useMemo(
    () => ({
      params: {
        limit: 1000,
        sortBy: 'createdAt:desc',
      },
    }),
    []
  );
  const { videos } = useVideos(hookProps);
  const renderVideos = (videos) => {
    return videos?.map((video, idx) => (
      <VideoRow key={`video-${idx}`} video={video} />
    ));
  };
  return (
    <HomePageContainerStyled>
      <HomePageGridStyled>{renderVideos(videos)}</HomePageGridStyled>
    </HomePageContainerStyled>
  );
};

const HomePageContainerStyled = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;
const HomePageGridStyled = styled.div`
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
`;

export default HomePage;
