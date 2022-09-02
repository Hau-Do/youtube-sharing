import React from 'react';
import styled from 'styled-components';

const VideoCard = ({ video }) => {
  return (
    <VideoCardContainerStyled>
      <VideoCardTitleStyled>{video?.title}</VideoCardTitleStyled>
      <p>
        <strong>Shared by:</strong> {video?.user?.email}
      </p>
      <p>
        <strong>Description</strong>
      </p>
      <VideoCardDescriptionStyled
        dangerouslySetInnerHTML={{ __html: video?.description }}
      ></VideoCardDescriptionStyled>
    </VideoCardContainerStyled>
  );
};

const VideoCardContainerStyled = styled.div``;
const VideoCardTitleStyled = styled.p`
  color: red;
  font-weight: 600;
  font-size: 20px;
`;
const VideoCardDescriptionStyled = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  line-clamp: 5;
  -webkit-box-orient: vertical;
`;

export default VideoCard;
