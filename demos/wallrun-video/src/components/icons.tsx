/**
 * Abstract monoline SVG icons for Remotion scenes.
 * Replaces emoji icons with clean, geometric line art
 * that matches the premium dark aesthetic of the demo site.
 *
 * All icons render at the given size (default 40) with accent stroke.
 */
import { type FC, type CSSProperties } from 'react';
import { BRAND } from '../data/brand';

type IconProps = {
  size?: number;
  color?: string;
  style?: CSSProperties;
};

const defaults = (props: IconProps) => ({
  size: props.size ?? 40,
  color: props.color ?? BRAND.accent,
});

/** Clipboard / template — grid of horizontal lines */
export const IconTemplate: FC<IconProps> = (props) => {
  const { size, color } = defaults(props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M9 2v2M15 2v2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 9h8M8 13h6M8 17h4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

/** Cursor click — drag-and-drop CMS */
export const IconCursor: FC<IconProps> = (props) => {
  const { size, color } = defaults(props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <path
        d="M5 3l12.5 8.5-5.5 1.5 3.5 6-2.5 1.5-3.5-6L5 18V3z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/** Lock — vendor lock-in */
export const IconLock: FC<IconProps> = (props) => {
  const { size, color } = defaults(props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M8 11V7a4 4 0 118 0v4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="1.5" fill={color} />
    </svg>
  );
};

/** Utensils — restaurant / food menu */
export const IconMenu: FC<IconProps> = (props) => {
  const { size, color } = defaults(props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <path
        d="M3 3v8a4 4 0 004 4h2v6M3 7h6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 3v18M21 3v6a4 4 0 01-4 4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/** Trending up — KPI dashboard */
export const IconChart: FC<IconProps> = (props) => {
  const { size, color } = defaults(props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <polyline
        points="22,7 13.5,15.5 8.5,10.5 2,17"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="16,7 22,7 22,13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/** Building — office directory */
export const IconBuilding: FC<IconProps> = (props) => {
  const { size, color } = defaults(props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M9 22V18h6v4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <rect
        x="8"
        y="6"
        width="3"
        height="3"
        rx="0.5"
        stroke={color}
        strokeWidth="1"
      />
      <rect
        x="13"
        y="6"
        width="3"
        height="3"
        rx="0.5"
        stroke={color}
        strokeWidth="1"
      />
      <rect
        x="8"
        y="11"
        width="3"
        height="3"
        rx="0.5"
        stroke={color}
        strokeWidth="1"
      />
      <rect
        x="13"
        y="11"
        width="3"
        height="3"
        rx="0.5"
        stroke={color}
        strokeWidth="1"
      />
    </svg>
  );
};

/** Calendar — event schedule */
export const IconCalendar: FC<IconProps> = (props) => {
  const { size, color } = defaults(props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M3 10h18" stroke={color} strokeWidth="1.5" />
      <path
        d="M8 2v4M16 2v4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="7"
        y="14"
        width="3"
        height="3"
        rx="0.5"
        fill={color}
        opacity="0.4"
      />
    </svg>
  );
};

/** Layers — component library */
export const IconLayers: FC<IconProps> = (props) => {
  const { size, color } = defaults(props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <path
        d="M12 2L2 7l10 5 10-5-10-5z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M2 12l10 5 10-5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M2 17l10 5 10-5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/** Type / letter A — typography / distance reading */
export const IconType: FC<IconProps> = (props) => {
  const { size, color } = defaults(props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <path
        d="M4 21L12 3l8 18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 15h11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

/** Terminal / chevron-right — deploy */
export const IconTerminal: FC<IconProps> = (props) => {
  const { size, color } = defaults(props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <polyline
        points="4,17 10,12 4,7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17h8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

/** Bot / circuit — AI agents */
export const IconBot: FC<IconProps> = (props) => {
  const { size, color } = defaults(props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <rect
        x="3"
        y="8"
        width="18"
        height="12"
        rx="3"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx="9" cy="14" r="1.5" fill={color} />
      <circle cx="15" cy="14" r="1.5" fill={color} />
      <path
        d="M12 2v4M8 4h8"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

/** Shield / signal — offline-first, resilience */
export const IconShield: FC<IconProps> = (props) => {
  const { size, color } = defaults(props);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={props.style}
    >
      <path
        d="M12 2l8 4v5c0 5.25-3.5 10-8 11.5C7.5 21 4 16.25 4 11V6l8-4z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * Icon registry — maps string keys to icon components.
 * Used by scenes to look up icons from script data.
 */
export const ICONS: Record<string, FC<IconProps>> = {
  template: IconTemplate,
  cursor: IconCursor,
  lock: IconLock,
  menu: IconMenu,
  chart: IconChart,
  building: IconBuilding,
  calendar: IconCalendar,
  layers: IconLayers,
  type: IconType,
  terminal: IconTerminal,
  bot: IconBot,
  shield: IconShield,
};
