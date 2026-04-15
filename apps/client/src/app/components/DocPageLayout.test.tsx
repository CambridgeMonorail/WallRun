import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { DocPageLayout } from './DocPageLayout';

describe('DocPageLayout', () => {
  const defaultProps = {
    header: {
      category: 'Test Category',
      title: 'Test Component',
      description: 'A test component description.',
    },
    builtOnSummary: 'Built with testing tools',
    builtOnItems: [{ text: 'Feature one' }, { text: 'Feature two' }],
  };

  it('renders header with category, title, and description', () => {
    render(
      <DocPageLayout {...defaultProps}>
        <div>Child content</div>
      </DocPageLayout>,
    );

    expect(screen.getByText('Test Category')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Test Component' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('A test component description.'),
    ).toBeInTheDocument();
  });

  it('renders Built On section with summary and items', () => {
    render(
      <DocPageLayout {...defaultProps}>
        <div>Child content</div>
      </DocPageLayout>,
    );

    expect(
      screen.getByRole('heading', { level: 2, name: 'Built On' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Built with testing tools')).toBeInTheDocument();
    expect(screen.getByText('Feature one')).toBeInTheDocument();
    expect(screen.getByText('Feature two')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(
      <DocPageLayout {...defaultProps}>
        <section data-testid="custom-section">Custom content</section>
      </DocPageLayout>,
    );

    expect(screen.getByTestId('custom-section')).toBeInTheDocument();
    expect(screen.getByText('Custom content')).toBeInTheDocument();
  });

  it('renders multiple builtOnItems as list items', () => {
    const props = {
      ...defaultProps,
      builtOnItems: [
        { text: 'Item A' },
        { text: 'Item B' },
        { text: 'Item C' },
      ],
    };

    render(
      <DocPageLayout {...props}>
        <div>Content</div>
      </DocPageLayout>,
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
    expect(screen.getByText('Item C')).toBeInTheDocument();
  });
});
