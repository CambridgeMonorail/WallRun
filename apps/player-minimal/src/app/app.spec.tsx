import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should render branding', () => {
    const { getByText } = render(<App />);
    expect(getByText('WALLRUN')).toBeTruthy();
  });

  it('should render tech stack', () => {
    const { getByText } = render(<App />);
    expect(getByText(/React 19/i)).toBeTruthy();
    expect(getByText(/Tailwind v4/i)).toBeTruthy();
    expect(getByText(/BrightSign/i)).toBeTruthy();
  });

  it('should render time components', () => {
    const { baseElement } = render(<App />);
    // Time display exists with tabular-nums class for consistent digit width
    expect(baseElement.querySelector('.tabular-nums')).toBeTruthy();
  });

  it('should render tagline', () => {
    const { getByText } = render(<App />);
    expect(getByText('Digital Signage as Software')).toBeTruthy();
  });
});
