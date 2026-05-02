import { FC } from 'react';
import { FullscreenHero, SignageContainer } from '@wallrun/shadcnui-signage';
import { SignageExample } from './components/SignageExample';

export const WelcomeScreen: FC = () => {
  return (
    <SignageExample>
      <SignageContainer
        variant="pink"
        className="p-0"
        data-testid="welcome-screen"
      >
        <FullscreenHero
          title="Welcome"
          subtitle="to WallRun"
          body="Digital Signage as Software"
          variant="dark"
          className="min-h-screen bg-transparent px-4 py-16 sm:px-8 lg:px-16"
          contentClassName="max-w-[22rem] sm:max-w-4xl lg:max-w-6xl"
          titleClassName="mb-4 text-6xl leading-none tracking-tight text-white sm:text-8xl md:text-[8rem] lg:mb-6 lg:text-[12rem] xl:text-[14rem]"
          subtitleClassName="text-2xl font-light tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl"
          bodyClassName="text-lg font-light text-white/70 sm:text-2xl md:text-3xl lg:text-4xl"
          decoration={
            <div className="mx-auto mb-8 h-1 w-32 bg-gradient-to-r from-transparent via-purple-400 to-transparent sm:mb-12 sm:w-48 md:w-64" />
          }
        />
      </SignageContainer>
    </SignageExample>
  );
};
