'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@tsa/shadcnui';
import { useSidebarData } from './sidebarContext';
import { NavMain } from '../nav/NavMain';

/**
 * AppSidebar component
 *
 * This component renders the sidebar of the application for The Sign Age demo site.
 *
 * The sidebar is composed of:
 * - SidebarHeader: Contains the project name "The Sign Age"
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
    <Sidebar
      collapsible="icon"
      className="chrome-sidebar"
      {...props}
    >
      <SidebarHeader>
        <div className="demo-panel-soft m-2 flex items-start gap-3 px-3 py-4">
          <div className="chrome-badge flex h-11 w-11 items-center justify-center rounded-2xl text-primary-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <rect width="18" height="14" x="3" y="5" rx="2" />
              <path d="M7 15h10" />
            </svg>
          </div>
          <div className="grid min-w-0 flex-1 text-left leading-snug">
            <span className="block text-sm font-medium uppercase tracking-[0.08em] text-foreground">
              The Sign Age
            </span>
            <span className="block text-[0.7rem] text-muted-foreground">
              Digital signage toolkit
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};
