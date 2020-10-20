import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('check if breadcrumb link rendered', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Phones/i);
  expect(linkElement).toBeInTheDocument();
});
