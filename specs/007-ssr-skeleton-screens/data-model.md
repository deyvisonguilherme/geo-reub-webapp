# Data Model: Skeleton Components

## Component Hierarchy

- **StatisticCardSkeleton**: Mirrored structure of `StatisticCardComponent`.
- **TableSkeleton**: Mirrored structure of `p-table` used in processes.

## Interfaces / Inputs

### `TableSkeletonComponent`
| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `rows` | `number` | `5` | Number of shimmering rows to display. |
| `cols` | `number` | `5` | Number of columns to mirror. |

### `StatisticCardSkeletonComponent`
| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `count` | `number` | `4` | Number of cards in the grid. |

## Layout Matching

| UI Class | Skeleton Match | Target CSS |
|----------|----------------|------------|
| `.stat-card` | `.stat-card-skeleton` | `display: grid; gap: 1rem;` |
| `.table-card` | `.table-card-skeleton` | `padding: 1.5rem;` |
