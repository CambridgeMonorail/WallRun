import { FC, useMemo } from 'react';
import {
  AutoPagingList,
  Clock,
  ContentRotator,
  Countdown,
  OfflineFallback,
  SignageTransition,
  StaleDataIndicator,
} from '@wallrun/shadcnui-signage';
import { SignageExample } from './components/SignageExample';

type Meeting = { id: string; time: string; title: string; room: string };

export const OfficeLobbyLoop: FC = () => {
  const meetings = useMemo<Meeting[]>(
    () => [
      { id: '1', time: '09:30', title: 'Design Review', room: 'S1.12' },
      { id: '2', time: '10:00', title: 'Platform Standup', room: 'S1.06' },
      { id: '3', time: '10:30', title: 'Hiring Panel', room: 'S2.03' },
      { id: '4', time: '11:00', title: 'Customer Call', room: 'S1.08' },
      { id: '5', time: '11:30', title: 'Ops Sync', room: 'S1.05' },
      { id: '6', time: '12:00', title: 'Lunch & Learn', room: 'Atrium' },
      { id: '7', time: '13:00', title: 'Security Review', room: 'S2.01' },
      { id: '8', time: '14:30', title: 'Roadmap', room: 'S1.10' },
      { id: '9', time: '15:00', title: 'Demo', room: 'S1.07' },
      { id: '10', time: '16:00', title: '1:1s', room: 'Various' },
    ],
    [],
  );

  const nextUpdateEpochMs = useMemo(() => Date.now() + 5 * 60_000, []);
  const staleLastUpdatedEpochMs = useMemo(() => Date.now() - 22 * 60_000, []);

  return (
    <SignageExample>
      <div
        className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white"
        data-testid="office-lobby-loop"
      >
        <div
          className="px-4 py-6 sm:px-8 sm:py-10 lg:px-16 lg:py-14"
          data-testid="office-lobby-loop-shell"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
            <div>
              <div className="text-lg text-white/70 sm:text-xl lg:text-2xl">
                Office Lobby
              </div>
              <div className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
                Today
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6">
              <Clock
                format="HH:mm"
                className="text-4xl font-semibold tabular-nums sm:text-5xl lg:text-7xl"
              />
              <StaleDataIndicator
                lastUpdatedEpochMs={staleLastUpdatedEpochMs}
                warnAfterMin={5}
                staleAfterMin={15}
                variant="badge"
              />
            </div>
          </div>

          <div className="mt-12">
            <ContentRotator
              intervalMs={9000}
              transition="slide"
              className="w-full"
            >
              <div
                className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-10"
                data-testid="office-lobby-loop-welcome-slide"
              >
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:col-span-7 lg:p-10">
                  <div className="text-lg text-white/70 sm:text-xl lg:text-2xl">
                    Message
                  </div>
                  <div className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-6xl">
                    Welcome to HQ
                  </div>
                  <div className="mt-4 max-w-2xl text-lg text-white/70 sm:text-2xl lg:mt-6 lg:text-3xl">
                    Visitors: please check in at reception. Staff: remember your
                    badge.
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:col-span-5 lg:p-10">
                  <div className="text-lg text-white/70 sm:text-xl lg:text-2xl">
                    Next update in
                  </div>
                  <Countdown
                    targetEpochMs={nextUpdateEpochMs}
                    format="mm:ss"
                    className="mt-3 text-5xl font-semibold tabular-nums sm:text-6xl lg:mt-4 lg:text-8xl"
                  />
                  <div className="mt-4 text-lg text-white/60 sm:text-xl lg:mt-6 lg:text-2xl">
                    (demo countdown)
                  </div>
                </div>
              </div>

              <div
                className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-10"
                data-testid="office-lobby-loop-meetings-slide"
              >
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:col-span-7 lg:p-10">
                  <div className="mb-4 text-lg text-white/70 sm:text-xl lg:mb-6 lg:text-2xl">
                    Upcoming meetings
                  </div>
                  <AutoPagingList
                    items={meetings}
                    pageSize={5}
                    dwellMs={3500}
                    getKey={(m) => m.id}
                    renderItem={(m) => (
                      <div className="flex flex-col gap-3 border-b border-white/10 py-3 last:border-b-0 sm:py-4 lg:flex-row lg:items-baseline lg:justify-between">
                        <div className="flex flex-col gap-1 lg:flex-row lg:items-baseline lg:gap-6">
                          <div className="text-2xl font-semibold tabular-nums sm:text-3xl lg:text-4xl">
                            {m.time}
                          </div>
                          <div className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                            {m.title}
                          </div>
                        </div>
                        <div className="text-xl text-white/70 tabular-nums sm:text-2xl lg:text-3xl">
                          {m.room}
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:col-span-5 lg:p-10">
                  <div className="text-lg text-white/70 sm:text-xl lg:text-2xl">
                    Notes
                  </div>
                  <ul className="mt-4 space-y-3 text-lg text-white/70 sm:text-2xl lg:mt-5 lg:space-y-4 lg:text-3xl">
                    <li>• Fire exits: follow green signage</li>
                    <li>• Quiet zones on Level 2</li>
                    <li>• Wi‑Fi: HQ‑Guest</li>
                  </ul>
                </div>
              </div>

              <div
                className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12 lg:gap-10"
                data-testid="office-lobby-loop-connectivity-slide"
              >
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:col-span-12 lg:p-10">
                  <div className="mb-4 text-lg text-white/70 sm:text-xl lg:mb-6 lg:text-2xl">
                    Connectivity boundary
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
                    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5 sm:p-6 lg:p-8">
                      <div className="mb-3 text-lg text-white/70 sm:text-xl lg:mb-4">
                        Healthy
                      </div>
                      <OfflineFallback
                        isOnline={true}
                        isHealthy={true}
                        fallback={<div className="text-3xl">Fallback</div>}
                      >
                        <SignageTransition type="crossfade" durationMs={250}>
                          <div className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                            Live data
                          </div>
                        </SignageTransition>
                      </OfflineFallback>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-5 sm:p-6 lg:p-8">
                      <div className="mb-3 text-lg text-white/70 sm:text-xl lg:mb-4">
                        Unhealthy
                      </div>
                      <OfflineFallback
                        isOnline={true}
                        isHealthy={false}
                        fallback={
                          <div className="text-2xl text-white/70 sm:text-3xl">
                            Showing fallback (unhealthy)
                          </div>
                        }
                      >
                        <div className="text-2xl font-semibold sm:text-3xl lg:text-4xl">
                          Live data
                        </div>
                      </OfflineFallback>
                    </div>
                  </div>
                </div>
              </div>
            </ContentRotator>
          </div>
        </div>
      </div>
    </SignageExample>
  );
};
