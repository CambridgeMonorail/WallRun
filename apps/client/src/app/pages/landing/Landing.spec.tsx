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
    expect(
      getByText(/Digital Signage as Software/gi),
    ).toBeTruthy();
  });
  it('should render signage-specific features', () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );
    expect(getAllByText(/Fixed-Aspect Layouts/gi).length).toBeGreaterThan(0);
    expect(getAllByText(/Distance-Readable Typography/gi).length).toBeGreaterThan(0);
    expect(getAllByText(/Signage Components/gi).length).toBeGreaterThan(0);
  });
  it('should render BrightSign and offline-first features', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );
    expect(getByText(/BrightSign-Focused/gi)).toBeTruthy();
    expect(getByText(/Offline-First/gi)).toBeTruthy();
    expect(getByText(/Developer Experience/gi)).toBeTruthy();
  });

  it('should make the open source developer-first positioning explicit', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>,
    );

    expect(getByText(/open source, developer-first workspace/gi)).toBeTruthy();
    expect(getByText(/built by developers for developers/gi)).toBeTruthy();
    expect(getByText(/View The Open Source Repo/gi)).toBeTruthy();
  });
});
