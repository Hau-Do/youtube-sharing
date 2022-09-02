import { screen, render } from '@testing-library/react';
import React from 'react';

import Input from './index';

describe('<Input />', () => {
  test('should render an <input> tag', () => {
    render(<Input />);
    screen.getByRole('textbox');
  });

  test('should adopt a valid attribute', () => {
    const className = 'test';
    render(<Input className={className} />);
    screen.getByRole('textbox', { className });
  });
});
