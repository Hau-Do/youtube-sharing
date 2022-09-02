import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShareForm from '.';

test('Share form should be renderred', () => {
  const handleSubmit = jest.fn();

  const props = { handleSubmit };

  render(<ShareForm {...props} />);

  expect(screen.getByText('Share a Youtube movie')).toBeInTheDocument();
});

test('Submit function should work correctly', async () => {
  const handleSubmit = jest.fn();

  const props = { handleSubmit };

  render(<ShareForm {...props} />);

  await userEvent.click(screen.getByText('Share'));

  await waitFor(() => expect(handleSubmit).toBeCalled());
});
