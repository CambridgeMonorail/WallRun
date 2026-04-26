# Style Guide Integration Update

**Date**: February 7, 2026  
**Purpose**: Integrate `docs/design/STYLE_GUIDE.md` into Copilot configuration

> Status: superseded for active demo-app work. The current app-scoped design
> contract is `apps/client/DESIGN.md`, with expanded rationale in
> `docs/design/STYLE_GUIDE.md`. The notes below document the older B2B SaaS
> integration and are retained as historical context only.

## Changes Made

### 1. Created New Instruction File

**File**: `.github/instructions/style-guide-compliance.instructions.md`

- Applies to: `apps/client/**/*.{ts,tsx}`
- Comprehensive style guide rules for demo website
- Token-first color system enforcement
- Typography constraints (Inter, 400/500 weights only)
- Component style rules (no gradients, minimal decoration)
- Motion constraints (150-300ms, linear easing)
- Content tone guidelines (declarative, no CTAs)

### 2. Updated Existing Instructions

**File**: `.github/instructions/ui-and-accessibility.instructions.md`

- Added "Visual Style Philosophy" section
- References STYLE_GUIDE.md for apps/client
- Includes aesthetic intent, color system, typography, component style, motion, and content tone rules
- Drift prevention checklist

### 3. Updated UI Designer Agent

**File**: `.github/agents/ui-designer.agent.md`

- Added "Style Guide Compliance" section before review framework
- Mandatory checks for token-first colors, typography, motion, component style
- Rejection criteria (gradients, bounce animations, marketing CTAs)
- Philosophy test: "B2B SaaS vs marketing landing page"

### 4. Updated Signage Architect Agent

**File**: `.github/agents/signage-architect.agent.md`

- Added scope clarification at top
- Distinguished between signage components (libs/shadcnui-signage) and demo website (apps/client)
- Signage: 10-foot rule, high visibility, 72pt+ text
- Demo website: Follow STYLE_GUIDE.md calm B2B aesthetic

### 5. Updated Main Copilot Instructions

**File**: `.github/copilot-instructions.md`

- Updated "App-Specific Rules" section
- Added reference to `style-guide-compliance.instructions.md`
- Added "Design Philosophy" section with key principles

## Key Integration Points

### For Demo Website (apps/client)

1. **Color**: Token-first only (`bg-background`, `text-foreground`, etc.)
2. **Typography**: Inter 400/500, avoid bold
3. **Buttons**: Default to `variant="secondary"` or `variant="ghost"`
4. **Motion**: 150-300ms linear (no bounce/spring)
5. **Tone**: Declarative, no exclamation marks

### For Signage Components (libs/shadcnui-signage)

1. **Viewing distance**: 10-foot rule (72pt+ text)
2. **Contrast**: 7:1 minimum
3. **Philosophy**: High visibility, not calm B2B aesthetic

### Enforcement

All agents and instructions now:

- Reference STYLE_GUIDE.md as authoritative source
- Enforce token-first color usage
- Reject gradients, glow, bounce animations
- Verify calm B2B SaaS aesthetic
- Apply philosophy test before recommendations

## Testing Recommendations

1. Test UI Designer agent with demo site review
2. Verify style guide compliance in new PR reviews
3. Check that signage components maintain separate design constraints
4. Validate drift prevention checklist catches violations

## Next Steps

- Monitor PR reviews for style guide compliance
- Collect feedback on enforcement effectiveness
- Update STYLE_GUIDE.md as design evolves
- Consider adding automated linting for style violations
