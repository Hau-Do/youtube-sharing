import { screen, render } from '@testing-library/react';
import React from 'react';

import Button from './index';

describe('<Button />', () => {
  test('should render an <button> tag', () => {
    render(<Button />);
    screen.getByRole('button');
  });

  test('should adopt a valid attribute', () => {
    const id = 'test';
    render(<Button id={id} />);
    screen.getByRole('button', { id });
  });
});

