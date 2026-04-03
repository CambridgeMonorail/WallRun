import { FC } from 'react';
import { Clock, ScheduleGate } from '@wallrun/shadcnui-signage';
import { SignageExample } from './components/SignageExample';

export const DaypartMenu: FC = () => {
  return (
    <SignageExample>
      <div
        className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-950 to-slate-950 text-white"
        data-testid="daypart-menu"
      >
        <div className="px-16 py-14">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-2xl text-white/70">Café</div>
              <div className="text-7xl font-semibold tracking-tight">
                Daypart Menu
              </div>
            </div>
            <Clock
              format="HH:mm"
              className="text-7xl font-semibold tabular-nums"
            />
          </div>

          <div className="mt-12 grid grid-cols-12 gap-10">
            <div className="col-span-12 rounded-2xl border border-white/10 bg-white/5 p-10">
              <ScheduleGate
                windows={[
                  { start: '06:00', end: '11:00', timezone: 'Europe/London' },
                ]}
                fallback={null}
              >
                <div>
                  <div className="text-3xl text-white/70">Breakfast</div>
                  <div className="mt-6 grid grid-cols-2 gap-6 text-4xl">
                    <div className="flex justify-between border-b border-white/10 py-4">
                      <span>Egg & Avocado</span>
                      <span className="tabular-nums text-white/70">£6.50</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-4">
                      <span>Porridge</span>
                      <span className="tabular-nums text-white/70">£3.20</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-4">
                      <span>Croissant</span>
                      <span className="tabular-nums text-white/70">£2.10</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-4">
                      <span>Flat White</span>
                      <span className="tabular-nums text-white/70">£2.80</span>
                    </div>
                  </div>
                </div>
              </ScheduleGate>

              <ScheduleGate
                windows={[
                  { start: '11:00', end: '15:00', timezone: 'Europe/London' },
                ]}
                fallback={null}
              >
                <div>
                  <div className="text-3xl text-white/70">Lunch</div>
                  <div className="mt-6 grid grid-cols-2 gap-6 text-4xl">
                    <div className="flex justify-between border-b border-white/10 py-4">
                      <span>Chicken Bowl</span>
                      <span className="tabular-nums text-white/70">£8.90</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-4">
                      <span>Vegan Salad</span>
                      <span className="tabular-nums text-white/70">£7.80</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-4">
                      <span>Soup + Bread</span>
                      <span className="tabular-nums text-white/70">£5.40</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-4">
                      <span>Iced Tea</span>
                      <span className="tabular-nums text-white/70">£2.30</span>
                    </div>
                  </div>
                </div>
              </ScheduleGate>

              <ScheduleGate
                windows={[
                  { start: '15:00', end: '22:00', timezone: 'Europe/London' },
                ]}
                fallback={
                  <div className="text-3xl text-white/70">
                    We’re currently closed.
                  </div>
                }
              >
                <div>
                  <div className="text-3xl text-white/70">Evening</div>
                  <div className="mt-6 grid grid-cols-2 gap-6 text-4xl">
                    <div className="flex justify-between border-b border-white/10 py-4">
                      <span>Ramen</span>
                      <span className="tabular-nums text-white/70">£10.50</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-4">
                      <span>Veggie Curry</span>
                      <span className="tabular-nums text-white/70">£9.70</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-4">
                      <span>Kimchi Fries</span>
                      <span className="tabular-nums text-white/70">£4.20</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-4">
                      <span>Sparkling Water</span>
                      <span className="tabular-nums text-white/70">£1.80</span>
                    </div>
                  </div>
                </div>
              </ScheduleGate>
            </div>
          </div>
        </div>
      </div>
    </SignageExample>
  );
};
