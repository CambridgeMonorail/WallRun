interface Sale {
  name: string;
  email: string;
  amount: string;
  avatarSrc: string;
  avatarFallback: string;
}

export const salesData: Sale[] = [
  {
    name: 'Dom Node',
    email: 'dom.node@TSA.dev',
    amount: '+£1,234.56',
    avatarSrc: 'WallRun/assets/images/avatars/01.png',
    avatarFallback: 'DN',
  },
  {
    name: 'Jason Script',
    email: 'jason.script@TSA.dev',
    amount: '+£45.67',
    avatarSrc: 'WallRun/assets/images/avatars/02.png',
    avatarFallback: 'JS',
  },
  {
    name: 'Sarah Styles',
    email: 'sarah.styles@TSA.dev',
    amount: '+£678.90',
    avatarSrc: 'WallRun/assets/images/avatars/03.png',
    avatarFallback: 'SS',
  },
  {
    name: 'Debbie Bug',
    email: 'debbie.bug@TSA.dev',
    amount: '+£12.34',
    avatarSrc: 'WallRun/assets/images/avatars/04.png',
    avatarFallback: 'DB',
  },
  {
    name: 'Ajax Fetcher',
    email: 'ajax.fetcher@TSA.dev',
    amount: '+£89.01',
    avatarSrc: 'WallRun/assets/images/avatars/05.png',
    avatarFallback: 'AF',
  },
];
