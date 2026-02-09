import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should render the status page title', () => {
    const { getByText } = render(<App />);
    expect(getByText('The Sign Age')).toBeTruthy();
    expect(getByText('Player Status Monitor')).toBeTruthy();
  });
});
