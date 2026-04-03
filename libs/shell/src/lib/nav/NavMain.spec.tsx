import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NavMain } from './NavMain';

const mockUseSidebar = vi.fn();

vi.mock('@wallrun/shadcnui', () => ({
  Collapsible: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  CollapsibleContent: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  CollapsibleTrigger: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  SidebarGroup: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  SidebarGroupLabel: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  SidebarMenu: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  SidebarMenuButton: ({
    children,
    onClick,
  }: {
    children: ReactNode;
    onClick?: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
  SidebarMenuItem: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  SidebarMenuSub: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  SidebarMenuSubButton: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  SidebarMenuSubItem: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  useSidebar: () => mockUseSidebar(),
}));

vi.mock('lucide-react', () => ({
  ChevronRight: () => <span aria-hidden="true">chevron</span>,
}));

describe('NavMain', () => {
  const setOpenMobile = vi.fn();

  beforeEach(() => {
    setOpenMobile.mockReset();
    mockUseSidebar.mockReturnValue({
      isMobile: true,
      setOpenMobile,
      state: 'expanded',
      toggleSidebar: vi.fn(),
    });
  });

  it('closes the mobile sidebar when a nav link is selected', () => {
    render(
      <MemoryRouter>
        <NavMain
          items={[
            {
              title: 'Documentation',
              url: '/getting-started',
              items: [{ title: 'Getting Started', url: '/getting-started' }],
            },
          ]}
        />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Getting Started' }));

    expect(setOpenMobile).toHaveBeenCalledWith(false);
  });

  it('does not try to close desktop navigation after link selection', () => {
    mockUseSidebar.mockReturnValue({
      isMobile: false,
      setOpenMobile,
      state: 'expanded',
      toggleSidebar: vi.fn(),
    });

    render(
      <MemoryRouter>
        <NavMain
          items={[
            {
              title: 'Documentation',
              url: '/getting-started',
              items: [{ title: 'Getting Started', url: '/getting-started' }],
            },
          ]}
        />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Getting Started' }));

    expect(setOpenMobile).not.toHaveBeenCalled();
  });
});
