import { FC } from 'react';
import {
  MenuBoard,
  MenuItem,
  MenuSection,
} from '@wallrun/shadcnui-signage';
import { SignageExample } from './components/SignageExample';

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
      <MenuBoard
        eyebrow="DAILY SELECTION"
        title="Today's Menu"
        subtitle="Fresh. Local. Delicious."
        data-testid="restaurant-menu"
        footer={
          <footer className="mt-10 border-t border-slate-800 pt-6 text-center sm:mt-12 sm:pt-8 lg:mt-16">
            <p className="text-base text-slate-400 sm:text-xl lg:text-2xl">
              Ask your server about daily specials and dietary options
            </p>
          </footer>
        }
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-10">
          {Object.entries(menuCategories).map(([category, items]) => (
            <MenuSection
              key={category}
              title={category}
              className="rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/60 p-5 shadow-2xl backdrop-blur-sm sm:p-6 lg:p-8"
              contentClassName="space-y-5 sm:space-y-6 lg:space-y-8"
            >
              {items.map((item) => (
                <MenuItem
                  key={item.name}
                  name={item.name}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </MenuSection>
          ))}
        </div>
      </MenuBoard>
    </SignageExample>
  );
};
