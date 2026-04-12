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
        <div
          className="px-4 py-6 sm:px-8 sm:py-10 lg:px-16 lg:py-14"
          data-testid="daypart-menu-shell"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="text-lg text-white/70 sm:text-xl lg:text-2xl">Café</div>
              <div className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-7xl">
                Daypart Menu
              </div>
            </div>
            <Clock
              format="HH:mm"
              className="text-4xl font-semibold tabular-nums sm:text-5xl lg:text-7xl"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:col-span-12 lg:p-10">
              <ScheduleGate
                windows={[
                  { start: '06:00', end: '11:00', timezone: 'Europe/London' },
                ]}
                fallback={null}
              >
                <div>
                  <div className="text-xl text-white/70 sm:text-2xl lg:text-3xl">Breakfast</div>
                  <div className="mt-4 grid grid-cols-1 gap-3 text-2xl sm:mt-5 sm:gap-4 sm:text-3xl lg:mt-6 lg:grid-cols-2 lg:gap-6 lg:text-4xl">
                    <div className="flex justify-between border-b border-white/10 py-3 lg:py-4">
                      <span>Egg & Avocado</span>
                      <span className="tabular-nums text-white/70">£6.50</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-3 lg:py-4">
                      <span>Porridge</span>
                      <span className="tabular-nums text-white/70">£3.20</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-3 lg:py-4">
                      <span>Croissant</span>
                      <span className="tabular-nums text-white/70">£2.10</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-3 lg:py-4">
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
                  <div className="text-xl text-white/70 sm:text-2xl lg:text-3xl">Lunch</div>
                  <div className="mt-4 grid grid-cols-1 gap-3 text-2xl sm:mt-5 sm:gap-4 sm:text-3xl lg:mt-6 lg:grid-cols-2 lg:gap-6 lg:text-4xl">
                    <div className="flex justify-between border-b border-white/10 py-3 lg:py-4">
                      <span>Chicken Bowl</span>
                      <span className="tabular-nums text-white/70">£8.90</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-3 lg:py-4">
                      <span>Vegan Salad</span>
                      <span className="tabular-nums text-white/70">£7.80</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-3 lg:py-4">
                      <span>Soup + Bread</span>
                      <span className="tabular-nums text-white/70">£5.40</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-3 lg:py-4">
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
                  <div className="text-xl text-white/70 sm:text-2xl lg:text-3xl">
                    We’re currently closed.
                  </div>
                }
              >
                <div data-testid="daypart-menu-evening">
                  <div className="text-xl text-white/70 sm:text-2xl lg:text-3xl">Evening</div>
                  <div className="mt-4 grid grid-cols-1 gap-3 text-2xl sm:mt-5 sm:gap-4 sm:text-3xl lg:mt-6 lg:grid-cols-2 lg:gap-6 lg:text-4xl">
                    <div className="flex justify-between border-b border-white/10 py-3 lg:py-4">
                      <span>Ramen</span>
                      <span className="tabular-nums text-white/70">£10.50</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-3 lg:py-4">
                      <span>Veggie Curry</span>
                      <span className="tabular-nums text-white/70">£9.70</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-3 lg:py-4">
                      <span>Kimchi Fries</span>
                      <span className="tabular-nums text-white/70">£4.20</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 py-3 lg:py-4">
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
