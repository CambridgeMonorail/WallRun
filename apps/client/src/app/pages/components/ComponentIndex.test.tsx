import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';
import { ComponentIndexPage } from './ComponentIndex';

describe('ComponentIndexPage', () => {
  it('lists the new issue 98 docs entries in the browseable catalog', () => {
    render(
      <MemoryRouter>
        <ComponentIndexPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('link', { name: /OneMessageFrame/i }),
    ).toHaveAttribute('href', '/components/blocks/one-message-frame');
    expect(
      screen.getByRole('link', { name: /NoContentFallback/i }),
    ).toHaveAttribute('href', '/components/behaviour/no-content-fallback');
    expect(
      screen.getByRole('link', { name: /ContentExpiredWarning/i }),
    ).toHaveAttribute('href', '/components/behaviour/content-expired-warning');
    expect(
      screen.getByRole('link', { name: /LastUpdatedStamp/i }),
    ).toHaveAttribute('href', '/components/behaviour/last-updated-stamp');
    expect(
      screen.getByRole('link', { name: /ReconnectingState/i }),
    ).toHaveAttribute('href', '/components/behaviour/reconnecting-state');
  });
});