import { FC } from 'react';
import {
  Clock,
  MenuBoard,
  MenuItem,
  MenuSection,
  ScheduleGate,
} from '@wallrun/shadcnui-signage';
import { SignageExample } from './components/SignageExample';

const breakfastItems = [
  { name: 'Egg & Avocado', price: '£6.50' },
  { name: 'Porridge', price: '£3.20' },
  { name: 'Croissant', price: '£2.10' },
  { name: 'Flat White', price: '£2.80' },
];

const lunchItems = [
  { name: 'Chicken Bowl', price: '£8.90' },
  { name: 'Vegan Salad', price: '£7.80' },
  { name: 'Soup + Bread', price: '£5.40' },
  { name: 'Iced Tea', price: '£2.30' },
];

const eveningItems = [
  { name: 'Ramen', price: '£10.50' },
  { name: 'Veggie Curry', price: '£9.70' },
  { name: 'Kimchi Fries', price: '£4.20' },
  { name: 'Sparkling Water', price: '£1.80' },
];

export const DaypartMenu: FC = () => {
  return (
    <SignageExample>
      <MenuBoard
        eyebrow="Café"
        eyebrowVariant="plain"
        title="Daypart Menu"
        data-testid="daypart-menu"
        variant="orange"
        className="p-0 bg-gradient-to-br from-amber-950 via-orange-950 to-slate-950"
        shellClassName="px-4 py-6 sm:px-8 sm:py-10 lg:px-16 lg:py-14"
        shellTestId="daypart-menu-shell"
        titleClassName="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl"
        headerRight={
          <Clock
            format="HH:mm"
            className="text-4xl font-semibold tabular-nums sm:text-5xl lg:text-7xl"
          />
        }
      >
        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 lg:mt-12 lg:grid-cols-12 lg:gap-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:col-span-12 lg:p-10">
            <ScheduleGate
              windows={[
                { start: '06:00', end: '11:00', timezone: 'Europe/London' },
              ]}
              fallback={null}
            >
              <MenuSection
                title="Breakfast"
                className="text-white"
                titleClassName="text-xl font-normal text-white/70 sm:text-2xl lg:text-3xl"
                accentClassName="hidden"
                contentClassName="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-4 lg:mt-6 lg:grid-cols-2 lg:gap-6"
              >
                {breakfastItems.map((item) => (
                  <MenuItem
                    key={item.name}
                    name={item.name}
                    price={item.price}
                    hideDivider
                    rowClassName="justify-between border-b border-white/10 py-3 lg:py-4 text-2xl sm:text-3xl lg:text-4xl"
                    titleClassName="text-inherit font-normal text-white"
                    priceClassName="tabular-nums text-inherit font-normal text-white/70 sm:ml-0"
                  />
                ))}
              </MenuSection>
            </ScheduleGate>

            <ScheduleGate
              windows={[
                { start: '11:00', end: '15:00', timezone: 'Europe/London' },
              ]}
              fallback={null}
            >
              <MenuSection
                title="Lunch"
                className="text-white"
                titleClassName="text-xl font-normal text-white/70 sm:text-2xl lg:text-3xl"
                accentClassName="hidden"
                contentClassName="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-4 lg:mt-6 lg:grid-cols-2 lg:gap-6"
              >
                {lunchItems.map((item) => (
                  <MenuItem
                    key={item.name}
                    name={item.name}
                    price={item.price}
                    hideDivider
                    rowClassName="justify-between border-b border-white/10 py-3 lg:py-4 text-2xl sm:text-3xl lg:text-4xl"
                    titleClassName="text-inherit font-normal text-white"
                    priceClassName="tabular-nums text-inherit font-normal text-white/70 sm:ml-0"
                  />
                ))}
              </MenuSection>
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
                <MenuSection
                  title="Evening"
                  className="text-white"
                  titleClassName="text-xl font-normal text-white/70 sm:text-2xl lg:text-3xl"
                  accentClassName="hidden"
                  contentClassName="mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:gap-4 lg:mt-6 lg:grid-cols-2 lg:gap-6"
                >
                  {eveningItems.map((item) => (
                    <MenuItem
                      key={item.name}
                      name={item.name}
                      price={item.price}
                      hideDivider
                      rowClassName="justify-between border-b border-white/10 py-3 lg:py-4 text-2xl sm:text-3xl lg:text-4xl"
                      titleClassName="text-inherit font-normal text-white"
                      priceClassName="tabular-nums text-inherit font-normal text-white/70 sm:ml-0"
                    />
                  ))}
                </MenuSection>
              </div>
            </ScheduleGate>
          </div>
        </div>
      </MenuBoard>
    </SignageExample>
  );
};
