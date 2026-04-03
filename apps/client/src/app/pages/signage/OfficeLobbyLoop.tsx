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
        <div className="px-16 py-14">
          <div className="flex items-start justify-between gap-10">
            <div>
              <div className="text-2xl text-white/70">Office Lobby</div>
              <div className="text-7xl font-semibold tracking-tight">Today</div>
            </div>
            <div className="flex items-center gap-6">
              <Clock
                format="HH:mm"
                className="text-7xl font-semibold tabular-nums"
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
              <div className="grid grid-cols-12 gap-10">
                <div className="col-span-7 rounded-2xl border border-white/10 bg-white/5 p-10">
                  <div className="text-2xl text-white/70">Message</div>
                  <div className="mt-3 text-6xl font-semibold tracking-tight">
                    Welcome to HQ
                  </div>
                  <div className="mt-6 text-3xl text-white/70 max-w-2xl">
                    Visitors: please check in at reception. Staff: remember your
                    badge.
                  </div>
                </div>
                <div className="col-span-5 rounded-2xl border border-white/10 bg-white/5 p-10">
                  <div className="text-2xl text-white/70">Next update in</div>
                  <Countdown
                    targetEpochMs={nextUpdateEpochMs}
                    format="mm:ss"
                    className="mt-4 text-8xl font-semibold tabular-nums"
                  />
                  <div className="mt-6 text-2xl text-white/60">
                    (demo countdown)
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-10">
                <div className="col-span-7 rounded-2xl border border-white/10 bg-white/5 p-10">
                  <div className="text-2xl text-white/70 mb-6">
                    Upcoming meetings
                  </div>
                  <AutoPagingList
                    items={meetings}
                    pageSize={5}
                    dwellMs={3500}
                    getKey={(m) => m.id}
                    renderItem={(m) => (
                      <div className="flex items-baseline justify-between py-4 border-b border-white/10 last:border-b-0">
                        <div className="flex items-baseline gap-6">
                          <div className="text-4xl font-semibold tabular-nums">
                            {m.time}
                          </div>
                          <div className="text-4xl font-semibold tracking-tight">
                            {m.title}
                          </div>
                        </div>
                        <div className="text-3xl text-white/70 tabular-nums">
                          {m.room}
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="col-span-5 rounded-2xl border border-white/10 bg-white/5 p-10">
                  <div className="text-2xl text-white/70">Notes</div>
                  <ul className="mt-5 space-y-4 text-3xl text-white/70">
                    <li>• Fire exits: follow green signage</li>
                    <li>• Quiet zones on Level 2</li>
                    <li>• Wi‑Fi: HQ‑Guest</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 rounded-2xl border border-white/10 bg-white/5 p-10">
                  <div className="text-2xl text-white/70 mb-6">
                    Connectivity boundary
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-8">
                      <div className="text-xl text-white/70 mb-4">Healthy</div>
                      <OfflineFallback
                        isOnline={true}
                        isHealthy={true}
                        fallback={<div className="text-3xl">Fallback</div>}
                      >
                        <SignageTransition type="crossfade" durationMs={250}>
                          <div className="text-4xl font-semibold">
                            Live data
                          </div>
                        </SignageTransition>
                      </OfflineFallback>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-black/20 p-8">
                      <div className="text-xl text-white/70 mb-4">
                        Unhealthy
                      </div>
                      <OfflineFallback
                        isOnline={true}
                        isHealthy={false}
                        fallback={
                          <div className="text-3xl text-white/70">
                            Showing fallback (unhealthy)
                          </div>
                        }
                      >
                        <div className="text-4xl font-semibold">Live data</div>
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
