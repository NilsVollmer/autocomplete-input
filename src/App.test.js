import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

test('render a role="combobox" element', () => {
  const { getByRole } = render(<App />);
  const linkElement = getByRole(/combobox/i);
  expect(linkElement).toBeInTheDocument();
});
