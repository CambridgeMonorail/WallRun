# State Machine Code Examples

## State Type Definition

```typescript
type SignageState = { status: 'boot' } | { status: 'loading' } | { status: 'content'; data: ContentData } | { status: 'refreshing'; data: ContentData } | { status: 'data-error'; lastGoodData: ContentData | null } | { status: 'offline'; cachedData: ContentData | null } | { status: 'idle' };
```

## State Container — Discriminated Union vs Booleans

```typescript
// ✅ Good: single discriminated union
const [state, setState] = useState<SignageState>({ status: 'boot' });

// ❌ Bad: multiple booleans that can conflict
const [isLoading, setIsLoading] = useState(true);
const [isError, setIsError] = useState(false);
const [isOffline, setIsOffline] = useState(false);
```

## Rendering by State

Map each state to a visual output. No state should render nothing:

```typescript
switch (state.status) {
  case 'boot':
  case 'loading':
    return <BrandedSplash />;
  case 'content':
  case 'refreshing':
    return <SignageContent data={state.data} />;
  case 'data-error':
    return state.lastGoodData
      ? <SignageContent data={state.lastGoodData} />
      : <StaticFallback />;
  case 'offline':
    return state.cachedData
      ? <SignageContent data={state.cachedData} />
      : <StaticFallback />;
  case 'idle':
    return <IdleScreen />;
}
```

## `useSignageState` Hook

A `useReducer`-based hook that enforces valid transitions:

```typescript
import { useReducer } from 'react';

type SignageAction = { type: 'LOAD' } | { type: 'CONTENT_READY'; data: ContentData } | { type: 'REFRESH_START' } | { type: 'REFRESH_SUCCESS'; data: ContentData } | { type: 'DATA_ERROR' } | { type: 'OFFLINE' } | { type: 'RECONNECT' } | { type: 'IDLE' };

function assertNever(action: never): never {
  throw new Error('Unhandled signage action: ' + JSON.stringify(action));
}

function signageReducer(state: SignageState, action: SignageAction): SignageState {
  switch (action.type) {
    case 'LOAD':
      return { status: 'loading' };
    case 'CONTENT_READY':
      return { status: 'content', data: action.data };
    case 'REFRESH_START':
      if (state.status === 'content') {
        return { status: 'refreshing', data: state.data };
      }
      return state; // Ignore if not in content state
    case 'REFRESH_SUCCESS':
      return { status: 'content', data: action.data };
    case 'DATA_ERROR': {
      const lastGood = state.status === 'content' || state.status === 'refreshing' ? state.data : state.status === 'data-error' ? state.lastGoodData : null;
      return { status: 'data-error', lastGoodData: lastGood };
    }
    case 'OFFLINE': {
      const cached = state.status === 'content' || state.status === 'refreshing' ? state.data : state.status === 'offline' ? state.cachedData : null;
      return { status: 'offline', cachedData: cached };
    }
    case 'RECONNECT':
      return { status: 'loading' };
    case 'IDLE':
      return { status: 'idle' };
    default:
      return assertNever(action);
  }
}

const initialSignageState: SignageState = { status: 'boot' };

function useSignageState() {
  return useReducer(signageReducer, initialSignageState);
}
```

## Data Caching Strategy

- Cache the last-known-good data in memory and optionally in `localStorage`
- On boot, check for cached data before fetching fresh data
- Validate cached data age — stale-but-present is better than empty

```typescript
function getCachedData(): ContentData | null {
  try {
    const raw = localStorage.getItem('signage-data');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Optional: check age
    return parsed;
  } catch {
    return null;
  }
}

function setCachedData(data: ContentData): void {
  try {
    localStorage.setItem('signage-data', JSON.stringify(data));
  } catch {
    // Storage full — ignore
  }
}
```
