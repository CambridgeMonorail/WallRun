import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { CodeSnippet } from './CodeSnippet';

describe('CodeSnippet', () => {
  const sampleCode = `import { Button } from '@wallrun/shadcnui';

export const App = () => <Button>Click me</Button>;`;

  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.resolve()),
      },
    });
  });

  it('renders code content', () => {
    render(<CodeSnippet code={sampleCode} />);
    expect(screen.getByText(/import { Button }/i)).toBeInTheDocument();
  });

  it('displays filename when provided', () => {
    render(<CodeSnippet code={sampleCode} filename="App.tsx" />);
    expect(screen.getByText('App.tsx')).toBeInTheDocument();
  });

  it('copies code to clipboard when copy button is clicked', async () => {
    render(<CodeSnippet code={sampleCode} />);

    const copyButton = screen.getByTestId('copy-button');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(sampleCode);
    });
  });

  it('shows "Copied" message after successful copy', async () => {
    render(<CodeSnippet code={sampleCode} />);

    const copyButton = screen.getByTestId('copy-button');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(screen.getByText('Copied')).toBeInTheDocument();
    });
  });

  it('displays line numbers when showLineNumbers is true', () => {
    render(<CodeSnippet code={sampleCode} showLineNumbers={true} />);

    const lines = sampleCode.split('\n');
    lines.forEach((_, index) => {
      expect(screen.getByText(`${index + 1}`)).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <CodeSnippet code={sampleCode} className="custom-class" />,
    );
    const snippet = container.querySelector('.custom-class');
    expect(snippet).toBeInTheDocument();
  });

  it('sets language attribute on code element', () => {
    render(<CodeSnippet code={sampleCode} language="typescript" />);
    const codeElement = screen.getByText(/import { Button }/i).closest('code');
    expect(codeElement).toHaveAttribute('data-language', 'typescript');
  });

  it('handles copy failure gracefully', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
    const mockError = new Error('Copy failed');

    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(() => Promise.reject(mockError)),
      },
    });

    render(<CodeSnippet code={sampleCode} />);

    const copyButton = screen.getByTestId('copy-button');
    fireEvent.click(copyButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to copy code:',
        mockError,
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it('uses default language "tsx" when not specified', () => {
    render(<CodeSnippet code={sampleCode} />);
    const codeElement = screen.getByText(/import { Button }/i).closest('code');
    expect(codeElement).toHaveAttribute('data-language', 'tsx');
  });
});
