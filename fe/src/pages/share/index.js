import ShareForm from 'components/molecules/shareForm';
import useVideos from 'hooks/useVideos';
import React from 'react';
import styled from 'styled-components';

const SharePage = () => {
  const { handleShareVideo } = useVideos({ lazy: true });
  const shareFormProps = {
    handleSubmit: handleShareVideo,
  };
  return (
    <SharePageStyled>
      <ShareForm {...shareFormProps} />
    </SharePageStyled>
  );
};

const SharePageStyled = styled.div`
  height: 90vh;
  display: grid;
  place-items: center;
`;
export default SharePage;
