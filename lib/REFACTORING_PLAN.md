# Refactoring Plan: Shared Guided Experience

## Vision

**One guided experience component** used by:
- Consumers (public guides)
- Employees (assigned guides)
- Managers (preview/edit)

The B2B dashboard is just the **management layer** on top.

## Structure

```
components/
  guide/                    # Core guided experience (NEW)
    StepView.tsx           # Full-screen step view (Creme-style)
    StepActions.tsx        # Bottom action bar (Help, Tip, Report, Timer)
    StepTimer.tsx          # Timer component
    PhotoUpload.tsx        # Completion photos
    GuideHeader.tsx        # Title, progress, close button
    index.tsx              # Main GuideView component

app/
  guide/[id]/              # Public consumer view (NEW)
    page.tsx               # Uses guide/GuideView
    
  employee/
    guide/[id]/            # Employee assigned view
      page.tsx             # Uses guide/GuideView + assignment context
      
  manager/
    preview/[id]/          # Manager preview mode (NEW)
      page.tsx             # Uses guide/GuideView + edit context
```

## Component API

```typescript
interface GuideViewProps {
  guideId: string;
  mode?: 'consumer' | 'employee' | 'manager';
  onComplete?: () => void;
  onHelp?: (stepNumber: number) => void;
  onTip?: (stepNumber: number) => void;
  onReportIssue?: (stepNumber: number) => void;
  progress?: GuideProgress;
  requireCompletion?: boolean; // For employees
}
```

## Next Steps

1. ✅ Create components/guide/ folder
2. Build StepView component (full-screen, Creme-style)
3. Build StepActions component (bottom action bar)
4. Refactor employee/guide/[id]/page.tsx to use shared component
5. Create public guide/[id]/page.tsx route
6. Create manager preview route

