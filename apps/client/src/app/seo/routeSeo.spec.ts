import { describe, expect, it } from 'vitest';
import { getCanonicalUrl, getRouteSeo } from './routeSeo';

describe('routeSeo', () => {
  it('should build canonical URLs for the custom domain', () => {
    expect(getCanonicalUrl('/')).toBe('https://wallrun.dev/');
    expect(getCanonicalUrl('/tooling')).toBe('https://wallrun.dev/tooling');
  });

  it('should return route-specific metadata for known pages', () => {
    const seo = getRouteSeo('/tooling');

    expect(seo.title).toContain('Tooling And Deployment');
    expect(seo.description).toContain('Scaffold player apps');
  });

  it('should include breadcrumb structured data for component docs pages', () => {
    const seo = getRouteSeo('/components/primitives/metric-card');

    expect(seo.title).toContain('MetricCard Component Docs');
    expect(seo.keywords).toContain('MetricCard');
    expect(
      seo.structuredData?.some((item) => item['@type'] === 'BreadcrumbList'),
    ).toBe(true);
  });

  it('should noindex unknown paths', () => {
    const seo = getRouteSeo('/missing-page');

    expect(seo.robots).toBe('noindex, nofollow');
  });
});
