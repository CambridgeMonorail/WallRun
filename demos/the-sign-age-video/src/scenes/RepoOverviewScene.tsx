import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { type FC } from 'react';
import { BRAND } from '../data/brand';
import { SCRIPT } from '../data/script';
import { DURATIONS, MOTION } from '../data/timings';
import { FadeIn } from '../components/FadeIn';
import { SectionTitle } from '../components/SectionTitle';
import { BrowserFrame } from '../components/BrowserFrame';
import { Callout } from '../components/Callout';

const ITEMS_START = 30;

/** Show what's in the repo with callout labels */
export const RepoOverviewScene: FC = () => {
  const frame = useCurrentFrame();
  const { headline, items } = SCRIPT.repoOverview;

  const fadeOut = interpolate(
    frame,
    [DURATIONS.repoOverview - MOTION.fadeOut, DURATIONS.repoOverview],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        background: BRAND.background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 100px',
        gap: 40,
        opacity: fadeOut,
      }}
    >
      <FadeIn slideDistance={20}>
        <SectionTitle text={headline} />
      </FadeIn>

      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
        {/* Simulated repo view */}
        <div style={{ flex: 1 }}>
          <FadeIn delay={15} slideDistance={10}>
            <BrowserFrame url="github.com/CambridgeMonorail/TheSignAge">
              <div
                style={{
                  padding: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  minHeight: 400,
                }}
              >
                {['apps/', 'libs/', 'skills/', 'scripts/', 'docs/'].map(
                  (dir, i) => (
                    <div
                      key={dir}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '8px 0',
                        borderBottom: `1px solid ${BRAND.border}`,
                        color: BRAND.accentSecondary,
                        fontSize: 22,
                        fontFamily: 'monospace',
                        opacity: interpolate(
                          frame,
                          [20 + i * 5, 25 + i * 5],
                          [0, 1],
                          {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                          }
                        ),
                      }}
                    >
                      📁 {dir}
                    </div>
                  )
                )}
              </div>
            </BrowserFrame>
          </FadeIn>
        </div>

        {/* Callout labels */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            paddingTop: 20,
          }}
        >
          {items.map((item, i) => (
            <FadeIn
              key={item.label}
              delay={ITEMS_START + i * MOTION.staggerDelay}
              slideDistance={12}
            >
              <Callout label={item.label} description={item.description} />
            </FadeIn>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
