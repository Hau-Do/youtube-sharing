import { render, screen } from '@testing-library/react';
import VideoRow from '.';

test('Video row should be renderred', () => {
  const video = {
    description: '',
    title: 'Video title',
    user: {
      email: '',
    },
  };

  const props = { video };

  render(<VideoRow {...props} />);

  expect(screen.getByText('Video title')).toBeInTheDocument();
});
