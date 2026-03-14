# Systematic Debugging Skill

This skill defines a methodical approach to debugging issues in this repository. It emphasizes finding and fixing root causes rather than just treating symptoms.

## Core Principle

**Fix the cause, not the symptom.**

A good fix addresses the underlying problem, not just the visible error. This prevents the same issue from recurring in different forms.

## The Debugging Process

### 1. Understand the Problem

**Goal:** Know exactly what's wrong before trying to fix it.

#### Steps

- **Read the error message carefully** - Don't skim, understand every word
- **Reproduce the issue reliably** - Can you make it happen consistently?
- **Document the symptoms** - What exactly goes wrong?
- **Define expected behavior** - What should happen instead?
- **Check if it ever worked** - Is this a regression or a new issue?

#### Questions to Ask

- What is the exact error message?
- Under what conditions does it occur?
- Can you reproduce it 100% of the time?
- Does it happen in all environments or just some?
- What changed recently that might be related?

#### Example

❌ **Poor understanding:**
```
"The button doesn't work"
```

✅ **Good understanding:**
```
"The Submit button in the ContactForm component doesn't trigger form 
submission when clicked. The onClick handler is called (confirmed via 
console.log) but the form state is not being sent to the API. This 
happens 100% of the time in the development environment after the 
recent React 19 upgrade."
```

### 2. Reproduce Reliably

**Goal:** Create the smallest possible case that demonstrates the bug.

#### Steps

- **Create a minimal reproduction** - Remove everything unrelated
- **Write a failing test** - Capture the bug in a test case
- **Document steps to reproduce** - Make it repeatable by others
- **Identify the trigger** - What specific action causes it?

#### Why This Matters

- Proves you understand the problem
- Makes verification easier later
- Helps prevent regressions
- Communicates the issue clearly

#### Example

```typescript
// Failing test that reproduces the bug
it('should submit form when Submit button is clicked', () => {
  const mockSubmit = vi.fn();
  render(<ContactForm onSubmit={mockSubmit} />);
  
  const submitButton = screen.getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);
  
  expect(mockSubmit).toHaveBeenCalledTimes(1); // ❌ FAILS
});
```

### 3. Find the Root Cause

**Goal:** Identify the underlying issue, not just the visible symptoms.

#### Techniques

**Binary Search (Divide and Conquer):**
- Comment out half the code
- Does the problem still occur?
- Narrow down to the smallest section

**Work Backwards from the Error:**
- Start at the error message
- Trace back through the call stack
- Find where incorrect data originates

**Add Logging:**
```typescript
console.log('State before:', state);
handleSubmit();
console.log('State after:', state);
```

**Use the Debugger:**
- Set breakpoints
- Step through code line by line
- Inspect variable values

**Git Bisect:**
```bash
# Find which commit introduced the bug
git bisect start
git bisect bad  # Current commit is bad
git bisect good <last-known-good-commit>
```

#### Questions to Ask

- What line of code actually fails?
- What is the value of key variables at that point?
- What assumptions are being made that might be wrong?
- Is there a mismatch between expected and actual data?
- Are there any race conditions or timing issues?

#### Example: Root Cause Analysis

**Symptom:** Form doesn't submit

**Investigation:**
```typescript
// Added logging
const handleSubmit = () => {
  console.log('handleSubmit called');
  console.log('formData:', formData); // ✅ Has correct data
  console.log('isValid:', isValid); // ❌ FALSE - AHA!
  
  if (isValid) {
    onSubmit(formData);
  }
};
```

**Root Cause:** Validation state is not updating when form data changes. The validation logic has a stale closure over the initial formData value.

### 4. Fix the Root Cause

**Goal:** Address the underlying problem correctly and completely.

#### Steps

- **Understand why the bug exists** - Don't just patch it
- **Fix the actual problem** - Not just this occurrence
- **Consider side effects** - Will this break something else?
- **Keep the fix minimal** - Don't refactor unnecessarily

#### Types of Fixes

**❌ Symptom Fix (Bad):**
```typescript
// Just hiding the error
try {
  onSubmit(formData);
} catch (error) {
  // Silent fail - BAD
}
```

**✅ Root Cause Fix (Good):**
```typescript
// Fix the validation state update issue
useEffect(() => {
  setIsValid(validateForm(formData));
}, [formData]); // Proper dependency
```

#### Questions to Ask

- Does this fix the root cause or just mask the symptom?
- Could this same issue occur elsewhere?
- Will this change affect other functionality?
- Is there a simpler fix?
- Is this the right abstraction level?

### 5. Verify the Fix

**Goal:** Confirm the bug is fixed and nothing else broke.

#### Verification Steps

1. **Run the failing test** - It should now pass
2. **Manually test the fix** - Verify expected behavior
3. **Run full test suite** - Check for regressions
4. **Test edge cases** - What about unusual inputs?
5. **Run verification** - `pnpm verify` should pass

#### Verification Checklist

- [ ] Failing test now passes
- [ ] Manual testing confirms fix
- [ ] No new test failures
- [ ] Edge cases tested
- [ ] `pnpm verify` passes
- [ ] Fix works in all affected environments

#### Example

```bash
# 1. Run specific test
pnpm test:client -- ContactForm.test.tsx

# 2. Run all tests for the project
pnpm test:client

# 3. Run verification
pnpm verify

# 4. Manual test in browser
pnpm serve:client
# Navigate to contact form, test submission
```

### 6. Document What Changed and Why

**Goal:** Explain the fix so others (and future you) understand it.

#### What to Document

**In Code Comments:**
```typescript
// Fix: Update validation state when form data changes
// Previously, isValid had a stale closure over initial formData
// which caused validation to never update after mount
useEffect(() => {
  setIsValid(validateForm(formData));
}, [formData]);
```

**In Commit Message:**
```
fix(client): update validation state when form data changes

The ContactForm validation state was not updating when form data
changed due to a stale closure over the initial formData value.

This caused the form submission to be blocked even when all
fields were valid.

Fixed by adding a useEffect that updates isValid whenever
formData changes.

Fixes #456
```

**In PR Description:**
```markdown
## Bug Description

Form submission was blocked even when all fields were valid.

## Root Cause

The validation state (isValid) was not updating when form data changed.
This was caused by a stale closure in the validation logic that captured
the initial formData value and never updated.

## Fix

Added a useEffect hook that recalculates isValid whenever formData
changes, ensuring validation state stays synchronized.

## How to Verify

1. Open the Contact Form
2. Fill in all fields correctly
3. Click Submit
4. Form should submit successfully (previously would fail silently)

## Testing

- Added test case for validation state updates
- Verified manual testing
- All existing tests still pass
```

#### Questions to Ask

- Could someone understand this fix in 6 months?
- Is the root cause explained?
- Is the solution justified?
- Are there any trade-offs or limitations?

## Common Pitfalls to Avoid

### ❌ Jumping to Solutions

**Problem:** Trying to fix before understanding

```typescript
// Saw error, added try-catch without investigating
try {
  doSomething();
} catch {
  // Hope it works?
}
```

**Better:** Understand the problem first, then fix the root cause.

### ❌ Fixing Symptoms

**Problem:** Treating the symptom, not the disease

```typescript
// Check keeps failing, so disabled it
// if (isValid) {  // ❌ Commented out to "fix" it
  onSubmit(formData);
// }
```

**Better:** Find out why isValid is wrong.

### ❌ Assuming Without Verifying

**Problem:** Guessing what's wrong

```
"It's probably a React 19 issue, let me roll back..."
```

**Better:** Reproduce and investigate to confirm the cause.

### ❌ Making Multiple Changes at Once

**Problem:** Can't tell which change fixed it

```typescript
// Changed 10 things at once
// Which one actually fixed the bug? 🤷
```

**Better:** Make one change at a time, test after each.

### ❌ Not Testing Thoroughly

**Problem:** Assuming it's fixed without verification

```
"Looks good to me!" 
*doesn't run tests*
*bug still exists in production*
```

**Better:** Follow the full verification checklist.

## Debugging Async and Timing Issues

Async bugs require different techniques because the failure depends on execution order, not just logic.

### Recognising async bugs

- The bug is intermittent or "works sometimes"
- Adding a `console.log` or breakpoint makes the bug disappear
- The bug appears under load or slow network but not locally
- State appears correct at one point and wrong at another with no obvious mutation

### Techniques

**Add timestamps to logs:**
```typescript
console.log(`[${Date.now()}] fetchUser started`);
const user = await fetchUser();
console.log(`[${Date.now()}] fetchUser resolved`, user);
```

**Check for race conditions in useEffect:**
```typescript
// Bug: component unmounts before fetch completes
useEffect(() => {
  let cancelled = false;
  fetchData().then(data => {
    if (!cancelled) setData(data); // Guard against stale update
  });
  return () => { cancelled = true; };
}, [id]);
```

**Check for stale closures:**
```typescript
// Bug: handler captures stale state
const handleClick = useCallback(() => {
  console.log('count is:', count); // Is this the current value?
  setCount(count + 1);
}, []); // Missing `count` in dependency array = stale closure
```

**Test with artificial delays:**
```typescript
// Make timing bugs more visible
const fetchData = async () => {
  await new Promise(r => setTimeout(r, 2000)); // Exaggerate delay
  return realFetch();
};
```

**Use Promise.race to find timeout issues:**
```typescript
const result = await Promise.race([
  fetchData(),
  new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout after 5s')), 5000))
]);
```

### Common async root causes

| Symptom | Likely cause |
|---------|-------------|
| State updates after unmount | Missing cleanup in useEffect |
| Data shows then disappears | Two competing fetches, last one returns empty |
| Intermittent "undefined" errors | Race between data fetch and render |
| Handler uses stale values | Closure captures old state/props |
| Works with DevTools open | Breakpoint changes timing enough to mask race |

## Debugging Intermittent Bugs

When a bug cannot be reliably reproduced:

### Step 1: Increase observability

- Add structured logging around the suspected area
- Include timestamps, request IDs, and state snapshots
- Log both the happy path and error paths

### Step 2: Identify conditions

- Does it happen more under load? (Timing issue)
- Does it happen with specific data? (Edge case)
- Does it happen after a certain duration? (Memory leak or state accumulation)
- Does it happen only on certain devices or browsers? (Environment issue)

### Step 3: Narrow the window

- If you can reproduce 1 in 10 times, run 20 attempts and compare the logs from failing vs passing runs
- Look for ordering differences, missing events, or unexpected null values

### Step 4: Write a stress test

```typescript
it('handles concurrent updates without data loss', async () => {
  const results = await Promise.all(
    Array.from({ length: 50 }, (_, i) => updateRecord(i))
  );
  expect(results.every(r => r.success)).toBe(true);
});
```

### Step 5: If still not reproducible

- Document what you know and the conditions you've ruled out
- Add monitoring or assertions that will catch the issue in production
- Don't apply a speculative fix — it may mask the real problem without solving it

## When to Invest in Deep Debugging

Not every bug deserves the full 6-step process. Use this decision guide:

### Use the full 6-step process when:

- The bug affects multiple users or a critical path
- You've already tried an obvious fix and it didn't work
- The bug is intermittent and could recur unpredictably
- Understanding the root cause teaches something valuable about the system
- A wrong fix could introduce worse problems

### Use a quick targeted fix when:

- The root cause is obvious (typo, wrong variable name, missing import)
- The fix is a one-line change with no risk of side effects
- The bug is in code that will be replaced soon
- Time pressure is high and the fix is safe even if the root cause is unclear

### Escalate when:

- You've spent more than 30 minutes without narrowing the cause
- The bug requires access you don't have (production logs, specific hardware)
- The bug spans multiple systems or teams
- You suspect a framework or library bug rather than application code

## Real-World Example

### Bug Report

"User reported that the dashboard doesn't load after login. Console shows 'Cannot read property user of undefined'."

### 1. Understand

```typescript
// Error occurs in Dashboard component
const Dashboard = () => {
  const { user } = useAuth(); // ❌ Error here
  return <div>Welcome, {user.name}</div>;
};
```

Reproduction steps:
1. Log in as test user
2. Redirected to dashboard
3. White screen, console error

### 2. Reproduce

```typescript
// Minimal test case
it('should render dashboard after login', () => {
  const { result } = renderHook(() => useAuth());
  act(() => result.current.login('test', 'pass'));
  
  render(<Dashboard />);
  
  expect(screen.getByText(/welcome/i)).toBeInTheDocument(); // ❌ FAILS
});
```

### 3. Find Root Cause

```typescript
// Added logging
const Dashboard = () => {
  const authContext = useAuth();
  console.log('Auth context:', authContext); // ❌ undefined!
  
  // Root cause: Dashboard rendered outside AuthProvider
  // The router renders Dashboard before AuthProvider is set up
};
```

### 4. Fix Root Cause

```typescript
// Fix: Ensure Dashboard is rendered inside AuthProvider
function App() {
  return (
    <AuthProvider>
      <Router>
        <Route path="/dashboard" element={<Dashboard />} />
      </Router>
    </AuthProvider>
  );
}
```

### 5. Verify

```bash
pnpm test:client -- Dashboard.test.tsx  # ✅ Pass
pnpm test:client                         # ✅ All pass
pnpm verify                              # ✅ Pass
```

Manual test: Login → Dashboard loads correctly ✅

### 6. Document

```
fix(client): render Dashboard inside AuthProvider

The Dashboard component was failing with "Cannot read property 
user of undefined" because it was rendered outside the AuthProvider 
context.

Root cause: Router component was wrapping AuthProvider instead of
being wrapped by it, causing routes to render before context was
available.

Fixed by restructuring App component to ensure AuthProvider wraps
the entire Router.

Fixes #789
```

## Integration with Other Skills

- **[Planning](../../planning/SKILL.md)** - For complex bug fixes, create a plan
- **[Verification](../../verification/SKILL.md)** - Always verify fixes thoroughly
- **[Code Review Ready](../../code-review-ready/SKILL.md)** - Document your debugging process

## Debugging Mindset

- **Be curious** - Why did this happen?
- **Be skeptical** - Verify your assumptions
- **Be methodical** - Follow the process
- **Be patient** - Don't skip steps
- **Be thorough** - Verify completely

## Quick Reference

```
1. Understand → What exactly is wrong?
2. Reproduce → Can you make it happen reliably?
3. Root Cause → Why is it happening?
4. Fix → Address the underlying problem
5. Verify → Does it work? Did anything break?
6. Document → Explain what and why
```

**Remember:** The goal is not just to make the error go away, but to understand and fix the underlying problem so it never comes back.

**Last Updated:** 2026-01-28
