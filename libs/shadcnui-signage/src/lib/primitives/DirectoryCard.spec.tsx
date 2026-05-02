import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DirectoryCard } from './DirectoryCard';
import { FloorBadge } from './FloorBadge';
import { LocationIndicator } from './LocationIndicator';

describe('DirectoryCard primitives', () => {
  it('renders department, floor, room, and phone details', () => {
    render(
      <DirectoryCard
        department="Engineering"
        floor={3}
        room="301"
        phone="x3001"
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'Engineering' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Floor 3')).toBeInTheDocument();
    expect(screen.getByText('Room 301')).toBeInTheDocument();
    expect(screen.getByText('x3001')).toBeInTheDocument();
  });

  it('keeps stacked-to-row layout classes for header and metadata rows', () => {
    render(
      <DirectoryCard
        department="Reception"
        floor={1}
        room="101"
        phone="x1001"
      />,
    );

    const heading = screen.getByRole('heading', { name: 'Reception' });
    expect(heading.parentElement).toHaveClass('flex-col', 'sm:flex-row');

    const roomLabel = screen.getByText('Room 101');
    expect(roomLabel.parentElement).toHaveClass('flex-col', 'sm:flex-row');
  });

  it('renders floor badges and location indicators with the expected labels', () => {
    render(
      <>
        <FloorBadge floor={4} />
        <LocationIndicator location="Main Lobby" />
      </>,
    );

    expect(screen.getByText('Floor 4')).toBeInTheDocument();
    expect(screen.getByText('You are here: Main Lobby')).toBeInTheDocument();
  });
});
