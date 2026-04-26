import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LandingPage } from './Landing';

describe('LandingPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );
    expect(baseElement).toBeTruthy();
  });
  it('should have the signage platform title', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );
    expect(getByText(/Digital Signage as Software\./gi)).toBeTruthy();
  });

  it('should render signage-specific features', () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );
    expect(getAllByText(/Developer First/gi).length).toBeGreaterThan(0);
    expect(getAllByText(/Generative/gi).length).toBeGreaterThan(0);
    expect(getAllByText(/Data Driven/gi).length).toBeGreaterThan(0);
  });

  it('should render BrightSign and offline-first features', () => {
    const { getAllByText, getByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    expect(getByText(/BrightSign Ready/gi)).toBeTruthy();
    expect(getAllByText(/Fixed Canvas/gi).length).toBeGreaterThan(0);
    expect(getByText(/Distance Readable/gi)).toBeTruthy();
  });

  it('should make the open source developer-first positioning explicit', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    expect(getByText(/open source workspace for developers/gi)).toBeTruthy();
    expect(
      getByText(/Read the source, inspect the deployment scripts/gi),
    ).toBeTruthy();
    expect(getByText(/Read The Code/gi)).toBeTruthy();
  });
});
