'use client';

import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@wallrun/shadcnui';
import { useSidebarData } from './sidebarContext';
import { NavMain } from '../nav/NavMain';

/**
 * AppSidebar component
 *
 * This component renders the sidebar of the application for WallRun demo site.
 *
 * The sidebar is composed of:
 * - SidebarHeader: Contains the project name "WallRun"
 * - SidebarContent: Contains the NavMain component to display the main navigation items.
 * - SidebarRail: An additional sidebar rail for extra functionality or icons.
 *
 * The `sidebarData` object contains the main navigation items.
 *
 * @param {React.ComponentProps<typeof Sidebar>} props - Props passed to the Sidebar component.
 * @returns {React.JSX.Element} The rendered AppSidebar component.
 */
export const AppSidebar = (
  props: React.ComponentProps<typeof Sidebar>,
): React.JSX.Element => {
  const sidebarData = useSidebarData();

  return (
    <Sidebar collapsible="icon" className="chrome-sidebar" {...props}>
      <SidebarHeader>
        <Link
          to="/"
          className="brand-frame m-2 flex items-center gap-3 px-3 py-4 transition duration-200 hover:border-[hsl(var(--glow-violet)/0.42)] hover:bg-white/5"
          aria-label="Go to WallRun landing page"
        >
          <div
            className="flex h-10 w-12 shrink-0 items-center justify-center"
            aria-hidden="true"
          >
            <WallRunMark className="h-7 w-11 text-[hsl(var(--glow-violet))] drop-shadow-[0_0_18px_hsl(var(--glow-violet)/0.32)]" />
          </div>
          <div className="grid min-w-0 flex-1 text-left leading-snug">
            <span className="block text-sm font-semibold text-foreground">
              WallRun
            </span>
            <span className="mono-detail block text-[0.56rem] text-muted-foreground">
              Signage software
            </span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

const WallRunMark = ({
  className,
}: {
  className?: string;
}): React.JSX.Element => (
  <svg
    viewBox="0 0 64 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M2 4H17L28 32H13L2 4Z" fill="currentColor" />
    <path d="M22 4H37L48 32H33L22 4Z" fill="currentColor" opacity="0.92" />
    <path d="M42 4H57L62 17H47L42 4Z" fill="currentColor" opacity="0.84" />
  </svg>
);
