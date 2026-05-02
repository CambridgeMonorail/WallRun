import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InfoList } from './InfoList';
import { MeetingRow } from './MeetingRow';
import { SignagePanel } from './SignagePanel';

describe('office lobby primitives', () => {
  it('renders signage panel labels and content', () => {
    render(
      <SignagePanel label="Message">
        <div>Welcome to HQ</div>
      </SignagePanel>,
    );

    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('Welcome to HQ')).toBeInTheDocument();
  });

  it('renders meeting rows with mobile-safe stacked layout', () => {
    render(<MeetingRow time="09:30" title="Design Review" room="S1.12" />);

    expect(screen.getByText('09:30')).toBeInTheDocument();
    expect(screen.getByText('Design Review')).toBeInTheDocument();
    expect(screen.getByText('S1.12')).toBeInTheDocument();
    expect(screen.getByTestId('meeting-row')).toHaveClass('flex-col', 'lg:flex-row');
  });

  it('renders info lists as list items', () => {
    render(
      <InfoList items={['• Fire exits: follow green signage', '• Wi-Fi: HQ-Guest']} />,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});