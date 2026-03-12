import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCanonicalUrl, getRouteSeo, getSiteImageUrl } from '../seo/routeSeo';

const setMetaTag = (
  selector: string,
  attributeName: 'name' | 'property',
  attributeValue: string,
  content: string,
) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
};

const setCanonicalLink = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
};

const setStructuredData = (items: Array<Record<string, unknown>> | undefined) => {
  const existing = document.head.querySelector<HTMLScriptElement>(
    'script[data-route-structured-data="true"]',
  );

  if (!items || items.length === 0) {
    existing?.remove();
    return;
  }

  const script = existing ?? document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.setAttribute('data-route-structured-data', 'true');
  script.textContent = JSON.stringify(items.length === 1 ? items[0] : items);

  if (!existing) {
    document.head.appendChild(script);
  }
};

export const SeoManager: FC = () => {
  const location = useLocation();

  useEffect(() => {
    const seo = getRouteSeo(location.pathname);
    const canonicalUrl = getCanonicalUrl(seo.canonicalPath);
    const imageUrl = getSiteImageUrl();

    document.title = seo.title;

    setMetaTag('meta[name="description"]', 'name', 'description', seo.description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', seo.keywords ?? '');
    setMetaTag('meta[name="robots"]', 'name', 'robots', seo.robots ?? 'index, follow');
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', seo.title);
    setMetaTag(
      'meta[property="og:description"]',
      'property',
      'og:description',
      seo.description,
    );
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', seo.type ?? 'website');
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    setMetaTag(
      'meta[name="twitter:description"]',
      'name',
      'twitter:description',
      seo.description,
    );
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);
    setCanonicalLink(canonicalUrl);
    setStructuredData(seo.structuredData);
  }, [location.pathname]);

  return null;
};