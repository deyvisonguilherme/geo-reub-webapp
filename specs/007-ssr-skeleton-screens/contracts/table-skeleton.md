# Table Skeleton Contract

## Visual Structure
- **Container**: `div.table-card-skeleton` mirroring `.table-card`.
- **Header**: `div.table-header-skeleton` with placeholders for titles and search box.
- **Rows**: Iterative `div.row-skeleton` matching the actual table row height.
- **Columns**: 
  - Col 1: Text placeholder (width: 150px).
  - Col 2: Text placeholder (width: 100px).
  - Col 3: Status badge placeholder (rounded, width: 80px).
  - Col 4: Progress bar placeholder (width: 120px).
  - Col 5: Action buttons placeholders (2 small circles).

## CSS Requirements
- Must use `display: grid;` or `display: flex;` depending on the actual table row implementation.
- Row padding and borders must match the PrimeNG table layout.
