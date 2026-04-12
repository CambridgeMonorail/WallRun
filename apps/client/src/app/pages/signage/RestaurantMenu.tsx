import { FC } from 'react';
import { SignageExample } from './components/SignageExample';

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

const menuCategories = {
  Breakfast: [
    {
      name: 'Classic Breakfast',
      description: 'Eggs, bacon, toast, hash browns',
      price: '$12.99',
    },
    {
      name: 'Pancake Stack',
      description: 'Buttermilk pancakes with maple syrup',
      price: '$9.99',
    },
    {
      name: 'Breakfast Burrito',
      description: 'Scrambled eggs, cheese, peppers, onions',
      price: '$11.99',
    },
  ],
  'Lunch Specials': [
    {
      name: 'Club Sandwich',
      description: 'Turkey, bacon, lettuce, tomato, mayo',
      price: '$13.99',
    },
    {
      name: 'Caesar Salad',
      description: 'Romaine, parmesan, croutons, Caesar dressing',
      price: '$10.99',
    },
    {
      name: 'Soup & Sandwich Combo',
      description: 'Daily soup with half sandwich',
      price: '$12.99',
    },
  ],
  'Dinner Entrees': [
    {
      name: 'Grilled Salmon',
      description: 'Atlantic salmon with seasonal vegetables',
      price: '$24.99',
    },
    {
      name: 'Ribeye Steak',
      description: '12oz ribeye with mashed potatoes',
      price: '$32.99',
    },
    {
      name: 'Pasta Primavera',
      description: 'Fresh vegetables in garlic white wine sauce',
      price: '$18.99',
    },
  ],
};

export const RestaurantMenu: FC = () => {
  return (
    <SignageExample>
      <div
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-950 p-4 text-white sm:p-8 lg:p-16"
        data-testid="restaurant-menu"
      >
        {/* Ambient background elements */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-900/10 via-transparent to-transparent"
        />

        <div className="relative z-10">
          <header className="mb-10 text-center sm:mb-12 lg:mb-16">
            <div className="mb-4 inline-block rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 sm:mb-6 sm:px-6 sm:py-3 lg:px-8">
              <p className="text-sm tracking-[0.3em] text-teal-300 sm:text-lg lg:text-2xl">
                DAILY SELECTION
              </p>
            </div>
            <h1 className="mb-4 bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-5xl font-bold leading-none text-transparent sm:text-6xl lg:mb-6 lg:text-8xl">
              Today's Menu
            </h1>
            <p className="text-lg tracking-[0.2em] text-slate-300 sm:text-2xl lg:text-3xl">
              Fresh. Local. Delicious.
            </p>
          </header>

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-10">
            {Object.entries(menuCategories).map(([category, items]) => (
              <div
                key={category}
                className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-5 shadow-2xl backdrop-blur-sm sm:p-6 lg:p-8"
              >
                <div className="mb-6 sm:mb-8">
                  <h2 className="mb-2 text-3xl font-bold text-teal-400 sm:text-4xl lg:text-5xl">
                    {category}
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-orange-500 rounded-full" />
                </div>
                <div className="space-y-5 sm:space-y-6 lg:space-y-8">
                  {items.map((item: MenuItem) => (
                    <div key={item.name} className="group">
                      <div className="mb-2 flex flex-col gap-2 sm:mb-3 sm:flex-row sm:items-baseline sm:justify-between">
                        <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-teal-300 sm:text-2xl lg:text-3xl">
                          {item.name}
                        </h3>
                        <span className="text-xl font-bold text-orange-400 sm:ml-4 sm:text-2xl lg:text-3xl">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-base leading-relaxed text-slate-400 sm:text-lg lg:text-xl">
                        {item.description}
                      </p>
                      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent sm:mt-6" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <footer className="mt-10 border-t border-slate-800 pt-6 text-center sm:mt-12 sm:pt-8 lg:mt-16">
            <p className="text-base text-slate-400 sm:text-xl lg:text-2xl">
              Ask your server about daily specials and dietary options
            </p>
          </footer>
        </div>
      </div>
    </SignageExample>
  );
};
