# Lattify Consumer Information Architecture

## Overview

The Lattify consumer experience is designed around a project-focused journey that guides users from discovery to completion with reactive AI assistance at key moments. This information architecture prioritizes hands-on execution and step-by-step guidance, with controls optimized for active building scenarios.

## Primary Navigation Structure

### 1. Home
The central hub for all Lattify interactions, featuring:
- Seasonally relevant trending projects
- Recently viewed/in-progress projects 
- Search bar with auto-complete for popular projects
- Featured categories based on search trends
- Quick filters (time required, skill level, tools needed)

### 2. Main Sections

#### 2.1 Discover
The primary entry point for finding new projects, organized around:
- **Trending Projects**: Visually-driven cards showing popular projects based on search volume and seasonal relevance
- **Categories**: Organized collections based on project types (Home Improvement, Furniture Building, etc.)
- **Search**: Advanced search functionality with filters for difficulty, time, and materials

#### 2.2 My Projects
User's personal workspace containing:
- **Projects Grid**: Visual display of started, saved, and completed projects
- Progress indicators showing completion status
- Recently viewed projects with quick-resume functionality
- Saved projects for future execution

#### 2.3 Profile (Post-MVP)
*Note: This section is planned for post-MVP implementation*
- User account information
- Skill development tracking
- Achievement gallery
- Project history

## User Flow: Project Discovery to Completion

### 3. Project Selection
From any discovery path (trending, categories, search), users access:
- **Project Details**: Comprehensive overview including:
  - Before/after gallery from real users
  - Comprehensive materials list with alternatives
  - Required tools with common substitutions
  - Estimated completion time ranges
  - Printable/saveable complete instructions
  - Common mistakes and how to avoid them

### 4. Project Preparation
- **Materials Check**:
  - Interactive checklist of required items
  - Swipe to mark available/unavailable
  - Suggested local retailers for missing items
  - Substitute options for unavailable materials
  - Option to adjust project scale based on materials

- **Project Preparation**:
  - Workspace setup guidance
  - Safety considerations
  - Tools preparation and setup
  - Materials preparation steps
  - Time-saving prep suggestions

### 5. Project Execution
- **Project Steps Overview**:
  - Visual timeline of all steps
  - Estimated time per step
  - Complexity indicators
  - Tools needed per step
  - Critical step highlights

- **Craft Reels Mode**:
  - Full-screen vertical video optimized for workbench viewing
  - Large, simplified step indicator with progress percentage
  - Clear materials focus for current step only
  - Gesture/voice control status indicators
  - Automatic brightness adjustment based on environment

### 6. Contextual Assistance Layers
These layers can be accessed throughout the execution process:

- **Step Navigation Interface**:
  - Swipe/gesture-based progression controls
  - Voice command listening mode ("next," "back," "repeat")
  - Motion-activated controls for dirty/busy hands
  - Haptic confirmation of step transitions
  - Time-remaining indicator for current step

- **"Ask for Help" Reactive AI Assistance**:
  - Contextual help triggered by user request
  - Step-specific guidance and troubleshooting
  - Material and tool alternatives
  - Technique clarification

- **Real-time Guidance Layer**:
  - Contextual tips based on time spent on step
  - "Stuck points" prediction with preemptive help
  - Alternative approach suggestions for common obstacles
  - Progress confirmation indicators
  - Specific material handling tips

- **Obstacle Resolution Screen**:
  - Common problem quick-fixes
  - Alternative approaches based on available materials
  - Interactive troubleshooting guide
  - Option to contact community for specific help (post-MVP)
  - Video examples of problem resolution

### 7. Project Completion
- **Completion Celebration**:
  - Before/after comparison
  - Shareable completion card
  - Skill badges earned (post-MVP)
  - Suggested follow-up projects
  - Material leftover usage ideas

## Key Design Considerations

### Tactile-First Controls
The entire architecture is designed around a "dirty hands" context:
- Large, gesture-based navigation elements
- Voice command capabilities
- Motion detection for hands-free control
- Simplified interfaces optimized for workshop environments

### Content Organization Principles
- **Step-Based Structure**: All content is organized into discrete, manageable steps
- **Just-in-Time Information**: Only showing what's needed for the current step
- **Contextual Assistance**: Help is always available but never intrusive
- **Linear Progression**: Clear path from start to finish with flexibility to navigate between steps

### AI Integration Points
- **Reactive Assistance**: User-triggered, contextual help
- **Materials Optimization**: Alternatives and substitutions
- **Safety Detection**: Warnings for high-risk operations
- **Progress Support**: Assistance based on time spent on steps
- **Analytics Foundation**: Data collection for future ML capabilities

## MVP vs. Future State

This architecture represents the MVP focus areas while acknowledging planned post-MVP enhancements:
- Initial focus on reactive AI only (user must request help)
- Profile and community features planned for future releases
- Visual troubleshooting capabilities (photo upload) planned post-MVP
- User skill tracking and personalization planned post-MVP

The design prioritizes the core flow from project discovery to successful completion, with special attention to the unique needs of users actively engaged in hands-on building.
