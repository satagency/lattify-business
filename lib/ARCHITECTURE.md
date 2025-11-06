# Lattify Architecture - Guided Experience as Core Product

## Core Insight

**The employee experience IS the consumer experience.**

The guided step-by-step interface is the product. It works the same whether:
- A consumer discovers a public guide
- An employee follows an assigned guide
- A manager previews a guide

The B2B dashboard is just the **management layer** on top.

## Architecture

```
components/
  guide/                    # Core guided experience (shared)
    StepView.tsx           # Full-screen step view (Creme-style)
    StepActions.tsx        # Bottom action bar
    StepTimer.tsx          # Timer component
    PhotoUpload.tsx        # Completion photos
    GuideHeader.tsx        # Title, progress, close button

app/
  guide/[id]/              # Public consumer view
    page.tsx               # Uses guide/StepView
  employee/
    guide/[id]/            # Employee assigned view
      page.tsx             # Uses guide/StepView + assignment context
  manager/
    preview/[id]/          # Manager preview mode
      page.tsx             # Uses guide/StepView + edit context
```

## Key Principles

1. **One Guided Experience Component**
   - Same step-by-step interface for everyone
   - Full-screen, immersive, Creme-style
   - Bottom action bar: Help, Tip, Report Issue, Timer

2. **Context Determines Behavior**
   - **Consumer**: Self-discovery, optional completion
   - **Employee**: Assigned, required completion, photo proof
   - **Manager**: Preview/edit mode, see all feedback

3. **B2B Dashboard Adds:**
   - Assignment management
   - Progress tracking
   - Analytics
   - Photo verification
   - Feedback aggregation

4. **Guide Component is Context-Agnostic**
   - Receives: guideId, stepNumber, onComplete, onHelp, etc.
   - Doesn't know if it's consumer or employee
   - Same beautiful UX for everyone

## Implementation

The guided experience should be:
- **Mobile-first** (like Creme)
- **Full-screen step view**
- **Immersive visuals**
- **Bottom action bar**
- **Swipe/scroll navigation**

Then add B2B features:
- Assignment tracking
- Required completion
- Photo verification
- Manager analytics

This way, we're building ONE amazing guided experience, not two separate products.

