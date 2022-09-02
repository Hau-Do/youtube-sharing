import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthAPI from 'api/actions/auth';
import config from 'api/config';
import AuthForm from '.';
import axios from 'axios';

jest.mock('axios');

const mockAxios = axios;

test('Form should be renderred', () => {
  const handleLogin = jest.fn();
  const handleRegister = jest.fn();

  const props = { handleLogin, handleRegister };

  render(<AuthForm {...props} />);

  expect(screen.getByText('Register')).toBeInTheDocument();
});

test('Login submit should work correctly', async () => {
  const handleLogin = jest.fn();
  const handleRegister = jest.fn();

  const props = { handleLogin, handleRegister };

  render(<AuthForm {...props} />);

  await userEvent.click(screen.getByText('Login'));

  await waitFor(() => expect(handleLogin).toBeCalled());
});

test('Register submit should work correctly', async () => {
  const handleLogin = jest.fn();
  const handleRegister = jest.fn();

  const props = { handleLogin, handleRegister };

  render(<AuthForm {...props} />);

  await userEvent.click(screen.getByText('Register'));

  await waitFor(() => expect(handleRegister).toBeCalled());
});

test('Invalid email login submit should not run submit function', async () => {
  const handleLogin = jest.fn();
  const handleRegister = jest.fn();

  const props = { handleLogin, handleRegister };

  render(<AuthForm {...props} />);

  await userEvent.type(screen.getByTestId('email'), 'test');
  await userEvent.type(screen.getByTestId('password'), 'test');

  await userEvent.click(screen.getByText('Login'));

  await waitFor(() => expect(handleLogin).not.toBeCalled());
});

test('Empty email and login submit should not run submit function', async () => {
  const handleLogin = jest.fn();
  const handleRegister = jest.fn();

  const props = { handleLogin, handleRegister };

  render(<AuthForm {...props} />);

  await userEvent.type(screen.getByTestId('email'), '');
  await userEvent.type(screen.getByTestId('password'), '');

  await userEvent.click(screen.getByText('Login'));

  await waitFor(() => expect(handleLogin).not.toBeCalled());
});

describe('Login tests', () => {
  describe('login function', () => {
    let email = 'test@gmail.com';
    let password = 'test';

    describe('success', () => {
      const data = {};

      beforeEach(() => {
        mockAxios.mockResolvedValue(data);
      });

      test('should call endpoint with given email & password', async () => {
        await AuthAPI.login({
          email,
          password,
        });
        expect(mockAxios).toBeCalledWith({
          cancelToken: undefined,
          data: {
            email: 'test@gmail.com',
            password: 'test',
          },
          headers: {},
          method: 'POST',
          params: {},
          url: `${config.API.AUTH_SERVICE}/login`,
        });
      });

      test('should return response data', async () => {
        const response = await AuthAPI.login(email, password);
        expect(response).toStrictEqual(undefined);
      });
    });

    describe('with error', () => {
      describe('status 401', () => {
        beforeEach(() => {
          mockAxios.mockRejectedValue({
            code: 401,
            message: 'Incorrect email or password',
          });
        });

        test('should throw', async () => {
          await expect(AuthAPI.login(email, password)).rejects.toEqual({
            code: 401,
            message: 'Incorrect email or password',
          });
        });
      });

      describe('status 400', () => {
        beforeEach(() => {
          mockAxios.mockRejectedValue({
            code: 400,
            message:
              '""email" is not allowed to be empty, "password" is not allowed to be empty"',
          });
        });

        test('should throw', async () => {
          await expect(AuthAPI.login(email, password)).rejects.toEqual({
            code: 400,
            message:
              '""email" is not allowed to be empty, "password" is not allowed to be empty"',
          });
        });
      });
    });
  });
});

describe('Register tests', () => {
  describe('register function', () => {
    let email = 'test@gmail.com';
    let password = 'test';

    describe('success', () => {
      const data = {};

      beforeEach(() => {
        mockAxios.mockResolvedValue(data);
      });

      test('should call endpoint with given email & password', async () => {
        await AuthAPI.register({
          email,
          password,
        });
        expect(mockAxios).toBeCalledWith({
          cancelToken: undefined,
          data: {
            email: 'test@gmail.com',
            password: 'test',
          },
          headers: {},
          method: 'POST',
          params: {},
          url: `${config.API.AUTH_SERVICE}/register`,
        });
      });

      test('should return response data', async () => {
        const response = await AuthAPI.register(email, password);
        expect(response).toStrictEqual(undefined);
      });
    });

    describe('with error', () => {
      describe('status 401', () => {
        beforeEach(() => {
          mockAxios.mockRejectedValue({
            code: 401,
            message: 'Incorrect email or password',
          });
        });

        test('should throw', async () => {
          await expect(AuthAPI.register(email, password)).rejects.toEqual({
            code: 401,
            message: 'Incorrect email or password',
          });
        });
      });

      describe('status 400', () => {
        beforeEach(() => {
          mockAxios.mockRejectedValue({
            code: 400,
            message:
              '""email" is not allowed to be empty, "password" is not allowed to be empty"',
          });
        });

        test('should throw', async () => {
          await expect(AuthAPI.register(email, password)).rejects.toEqual({
            code: 400,
            message:
              '""email" is not allowed to be empty, "password" is not allowed to be empty"',
          });
        });
      });
    });
  });
});
