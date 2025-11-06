# Lattify UX Design - Inspired by Creme.com

## Key UX Patterns from Creme.com

### Mobile-First Step-by-Step Experience
1. **Full-screen step view** - One step at a time, large visual content
2. **Dark overlay instructions** - Text overlaid on dark background at bottom
3. **Bottom action bar** - Help, Tips, Ingredients, Timer
4. **Immersive visuals** - Large video/image area dominates screen
5. **Swipe/scroll navigation** - Steps flow vertically
6. **Progress indicators** - Clear visual feedback
7. **Photo submission** - "Photos or it didn't happen" at completion

## Adapting for Lattify B2B Hospitality Training

### Employee Experience (Mobile-First)

**Current State:** List-based step view with cards
**Target State:** Full-screen immersive step-by-step (like Creme)

#### Key Features to Add:

1. **Full-Screen Step View**
   - Large visual area (video/image)
   - Dark overlay instruction text at bottom
   - One step visible at a time
   - Swipe/scroll to next step

2. **Bottom Action Bar**
   - **++ Help** - Context-aware AI help (15 seconds)
   - **+ Tip** - Add helpful tip for this step
   - **Report Issue** - Flag problems (measurement unclear, step missing)
   - **Timer** - For steps with timing (e.g., "Dry in oven at 100°C for 10m")
   - **Next** - Advance to next step

3. **Step Features**
   - Visual content (video/image) - full screen
   - Instruction text overlay (dark background)
   - Timer integration when needed
   - Progress indicator (Step X of Y)
   - Completion checkmark

4. **Completion Flow**
   - Photo upload requirement
   - "Photos or it didn't happen" screen
   - Review and submit

5. **Navigation**
   - Close button (X) top right
   - Back navigation
   - Step counter/indicator

### Manager Experience (Desktop-First)

**Current State:** Dashboard with metrics, staff table, guide library
**Target State:** Enhanced with Creme-inspired analytics

#### Enhancements Needed:

1. **Guide Preview Mode**
   - View guides in step-by-step format (like employee sees)
   - Edit mode with visual step editor
   - See feedback per step

2. **Analytics Dashboard**
   - Problem step identification (visual)
   - Help request rates per step
   - Completion time tracking
   - Before/after improvements

3. **Photo Verification**
   - Review staff completion photos
   - Approve/reject proof
   - Photo gallery view

4. **Feedback Management**
   - See all tips, issues, questions per step
   - Aggregate feedback (e.g., "3 staff said pasta water too low")
   - Quick update guide based on feedback

## Implementation Priority

### Phase 1: Employee Mobile Experience
1. ✅ Full-screen step view component
2. ✅ Bottom action bar (Help, Tip, Report Issue, Timer)
3. ✅ Dark overlay instruction text
4. ✅ Step navigation (swipe/scroll)
5. ✅ Photo upload at completion

### Phase 2: Manager Enhancements
1. ✅ Guide preview in step-by-step format
2. ✅ Analytics with visual step indicators
3. ✅ Photo verification gallery
4. ✅ Feedback aggregation per step

## Component Structure

```
components/
  employee/
    StepView.tsx          # Full-screen step view (like Creme)
    StepActions.tsx       # Bottom action bar
    StepTimer.tsx         # Timer component
    PhotoUpload.tsx       # Completion photos
  manager/
    GuidePreview.tsx      # Step-by-step preview
    StepAnalytics.tsx     # Problem step visualization
    PhotoVerification.tsx # Photo review
```

## Design Specifications

### Colors (Maintaining Black/White)
- Background: White (light mode)
- Step overlay: Dark gray/black with white text
- Action buttons: Black with white icons
- Active step: Highlighted border

### Typography
- Step instructions: Large, bold, white on dark
- Step numbers: Circular badges
- Actions: Icon + text labels

### Interactions
- Swipe left/right: Navigate steps
- Tap Help: Open AI chat
- Tap Tip: Add tip modal
- Tap Report: Flag issue modal
- Tap Timer: Start countdown

## Next Steps

1. Create StepView component (full-screen, Creme-style)
2. Add bottom action bar with Help, Tip, Report Issue
3. Implement step navigation
4. Add timer functionality
5. Create photo upload flow
6. Build manager preview mode

