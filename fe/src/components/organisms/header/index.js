import LoggedIn from 'components/molecules/loggedIn';
import useAuth from 'hooks/useAuth';
import React from 'react';
import useAuthStore from 'stores/auth';
import styled from 'styled-components';
import AuthForm from '../../molecules/authForm';
import useActions from './hooks/useActions';
import homeImg from 'assets/images/home.png';
const Header = () => {
  const { handleLogin, handleRegister, handleLogout, isLoggedIn } = useAuth();
  const { user } = useAuthStore();
  const { handleClickShare, handleRedirectHome } = useActions();
  const authFormProps = {
    handleLogin,
    handleRegister,
  };
  const loggedInProps = {
    user,
    handleClickShare,
    handleLogout,
  };
  return (
    <HeaderContainerStyled>
      <HeaderLogoStyled onClick={handleRedirectHome}>
        <img src={homeImg} alt="home" />
        Funny Movies
      </HeaderLogoStyled>
      <HeaderFormStyled>
        {isLoggedIn ? (
          <LoggedIn {...loggedInProps} />
        ) : (
          <AuthForm {...authFormProps} />
        )}
      </HeaderFormStyled>
    </HeaderContainerStyled>
  );
};

const HeaderContainerStyled = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLogoStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 22px;

  flex: 1 1 100%;
  @media screen and (min-width: 1080px) {
    flex: initial;
    font-size: 32px;
    img {
      width: 45px;
    }
  }

  cursor: pointer;
  img {
    width: 30px;
  }
`;

const HeaderFormStyled = styled.div``;
export default Header;
