import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useAuth from 'hooks/useAuth';
import useAuthStore from 'stores/auth';
import Header from '.';
import useActions from './hooks/useActions';

jest.mock('hooks/useAuth');
jest.mock('./hooks/useActions');

const mocUseAuth = useAuth;
const mocUseActions = useActions;
const initialStoreState = useAuthStore.getState();

beforeEach(() => {
  useAuthStore.setState(initialStoreState, true);
  mocUseAuth.mockImplementation(() => {
    return {
      isLoggedIn: true,
      handleRegister: jest.fn(),
      handleLogin: jest.fn(),
      handleLogout: jest.fn(),
    };
  });
  mocUseActions.mockImplementation(() => {
    return {
      handleClickShare: jest.fn,
      handleRedirectHome: jest.fn,
    };
  });
});

test('Header should be renderred', async () => {
  const handleClickShare = jest.fn();
  const handleRedirectHome = jest.fn();
  mocUseAuth.mockImplementation(() => {
    return {
      isLoggedIn: true,
      handleRegister: jest.fn,
      handleLogin: jest.fn,
      handleLogout: jest.fn,
    };
  });
  mocUseActions.mockImplementation(() => {
    return {
      handleClickShare,
      handleRedirectHome,
    };
  });
  render(<Header />);

  expect(screen.getByText('Funny Movies')).toBeInTheDocument();
  await userEvent.click(screen.getByText('Funny Movies'));
  await waitFor(() => expect(handleRedirectHome).toBeCalled());
});

test('Click share should work correctly', async () => {
  const handleClickShare = jest.fn();
  const handleRedirectHome = jest.fn();
  mocUseAuth.mockImplementation(() => {
    return {
      isLoggedIn: true,
      handleRegister: jest.fn(),
      handleLogin: jest.fn(),
      handleLogout: jest.fn(),
    };
  });
  mocUseActions.mockImplementation(() => {
    return {
      handleClickShare,
      handleRedirectHome,
    };
  });
  render(<Header />);

  await userEvent.click(screen.getByText('Share a movie'));
  await waitFor(() => expect(handleClickShare).toBeCalled());
});

test('Click redirect should work correctly', async () => {
  const handleClickShare = jest.fn();
  const handleRedirectHome = jest.fn();
  mocUseActions.mockImplementation(() => {
    return {
      handleClickShare,
      handleRedirectHome,
    };
  });
  render(<Header />);

  await userEvent.click(screen.getByText('Funny Movies'));
  await waitFor(() => expect(handleRedirectHome).toBeCalled());
});

test('LoggedIn component should be renderred when user is logged in', () => {
  mocUseAuth.mockImplementation(() => {
    return {
      isLoggedIn: true,
      handleRegister: jest.fn(),
      handleLogin: jest.fn(),
      handleLogout: jest.fn(),
    };
  });

  const user = {
    email: 'test@gmail.com',
    id: '6303cdd1e365a8001d1ea2b0',
  };
  useAuthStore.setState({
    user,
  });

  render(<Header />);

  expect(screen.getByText('Share a movie')).toBeInTheDocument();
  expect(screen.getByText(`Welcome ${user.email}`)).toBeInTheDocument();
});

test('AuthForm component should be renderred when user is not logged in', () => {
  mocUseAuth.mockImplementation(() => {
    return {
      isLoggedIn: false,
      handleRegister: jest.fn(),
      handleLogin: jest.fn(),
      handleLogout: jest.fn(),
    };
  });
  render(<Header />);
  expect(screen.getByText('Register')).toBeInTheDocument();
});
