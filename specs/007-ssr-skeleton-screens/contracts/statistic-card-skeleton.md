# Statistic Card Skeleton Contract

## Visual Structure
- **Outer Wrapper**: `div.stat-card-skeleton` mirroring `.stat-card`.
- **Inner Content**:
  - `div.icon-wrapper-skeleton`: Circle placeholder (48x48px).
  - `div.text-wrapper-skeleton`:
    - `p-skeleton` (width: 60px, height: 12px) for the label.
    - `p-skeleton` (width: 100px, height: 24px) for the value.

## CSS Requirements
- Must use `display: flex; align-items: center; gap: 1rem;`.
- Background must match the `.stat-card` background (white/surface).
- Animation: Shimmer (defined in global SCSS).
