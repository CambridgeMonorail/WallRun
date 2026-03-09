import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@tsa/shadcnui';
import { AppSidebar } from './AppSidebar';
import { ReactNode } from 'react';
import { Moon, Sun, Github } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  SidebarProvider as SidebarDataProvider,
  SidebarData,
} from './sidebarContext';
import { Logo } from '@tsa/shadcnui-blocks';

interface LayoutProps {
  /** The main content to be displayed within the layout */
  children: ReactNode;
  /** Data for configuring the sidebar, including user info, teams, and navigation items */
  sidebarData: SidebarData;
}

/**
 * Layout component that provides a consistent structure for the application.
 * It includes a sidebar, header with breadcrumb navigation, theme toggle, and GitHub link.
 *
 * ## When a Sidebar Is Better
 *
 * - **Scalability**: Ideal for applications with numerous top-level items, as side navigation can accommodate more links and is easier to expand as the product grows.
 * - **Customizable Structures**: Supports user-configured navigation, making it suitable for platforms like Slack or Outlook where users manage channels or folders.
 * - **Vertical Scanning**: Aligns with natural vertical scanning patterns, allowing users to view multiple navigation links simultaneously, enhancing speed and efficiency.
 */
export function Layout({ children, sidebarData }: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const isLargeScreen = window.innerWidth > 1024;

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <SidebarProvider defaultOpen={isLargeScreen}>
      <SidebarDataProvider data={sidebarData}>
        <AppSidebar />
        <SidebarInset className="flex min-h-svh w-full flex-col bg-transparent">
          <header
            className="sticky top-0 z-20 mx-3 mt-3 flex h-16 shrink-0 items-center justify-between gap-2 overflow-hidden rounded-2xl border border-white/10 bg-background/70 px-4 shadow-[0_20px_50px_hsl(220_45%_3%_/_0.35)] backdrop-blur-xl transition-[width,height] ease-linear supports-[backdrop-filter]:bg-background/45 sm:mx-6 sm:mt-4 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 w-auto max-w-none"
            data-testid="header"
            role="banner"
          >
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--glow-cyan)/0.7)] to-transparent" />
            <div
              className="flex min-w-0 items-center gap-2"
              data-testid="breadcrumb-container"
              aria-label="Breadcrumb navigation"
            >
              <SidebarTrigger
                className="-ml-1 rounded-full border border-white/10 bg-background/35 backdrop-blur-md"
                data-testid="sidebar-trigger"
                aria-label="Toggle sidebar"
              />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    return (
                      <BreadcrumbItem
                        key={to}
                        className={isLast ? '' : 'hidden md:block'}
                        data-testid={`breadcrumb-item-${index}`}
                      >
                        {isLast ? (
                          <BreadcrumbPage aria-current="page">
                            {value}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink>
                            <Link to={to}>{value}</Link>
                          </BreadcrumbLink>
                        )}
                        {!isLast && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                      </BreadcrumbItem>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div
              className="flex items-center gap-2 rounded-full border border-white/10 bg-background/20 p-1"
              data-testid="theme-toggle-container"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="rounded-full"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                data-testid="theme-toggle-button"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full"
                title="View GitHub repository"
                data-testid="github-link"
                aria-label="View GitHub repository"
              >
                <a
                  href="https://github.com/CambridgeMonorail/TheSignAge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">GitHub repository</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="rounded-full"
                title="Open Storybook"
                aria-label="Open Storybook"
                data-testid="storybook-link"
              >
                <a
                  href="https://cambridgemonorail.github.io/TheSignAge/storybook/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Logo name="storybook" className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">Storybook</span>
                </a>
              </Button>
            </div>
          </header>
          <div className="relative flex-1 overflow-y-auto w-full" role="main">
            {children}
          </div>
        </SidebarInset>
      </SidebarDataProvider>
    </SidebarProvider>
  );
}
