import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoggedIn from '.';

test('Log in should be renderred', () => {
  const handleLogout = jest.fn();
  const handleClickShare = jest.fn();
  const user = { email: 'test@gmail.com' };

  const props = { handleLogout, handleClickShare, user };

  render(<LoggedIn {...props} />);

  expect(screen.getByText('Welcome test@gmail.com')).toBeInTheDocument();
});

test('Logout submit should work correctly', async () => {
  const handleLogout = jest.fn();
  const handleClickShare = jest.fn();
  const user = { email: 'test@gmail.com' };

  const props = { handleLogout, handleClickShare, user };

  render(<LoggedIn {...props} />);

  await userEvent.click(screen.getByText('Logout'));

  await waitFor(() => expect(handleLogout).toBeCalled());
});

test('Click share submit should work correctly', async () => {
  const handleLogout = jest.fn();
  const handleClickShare = jest.fn();
  const user = { email: 'test@gmail.com' };

  const props = { handleLogout, handleClickShare, user };

  render(<LoggedIn {...props} />);

  await userEvent.click(screen.getByText('Share a movie'));

  await waitFor(() => expect(handleClickShare).toBeCalled());
});
