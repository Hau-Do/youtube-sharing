import Button from 'components/atoms/button';
import React from 'react';
import styled from 'styled-components';

const LoggedIn = ({ user, handleLogout, handleClickShare }) => {
  return (
    <LoggedInContainerStyled>
      <span>Welcome {user?.email}</span>
      <LoggedInButtonWrapperStyled>
        <Button onClick={handleClickShare}>Share a movie</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </LoggedInButtonWrapperStyled>
    </LoggedInContainerStyled>
  );
};

const LoggedInContainerStyled = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;

const LoggedInButtonWrapperStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export default LoggedIn;
