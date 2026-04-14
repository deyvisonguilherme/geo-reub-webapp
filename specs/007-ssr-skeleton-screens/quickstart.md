# Quickstart: Using Skeleton Screens

## 1. Integrate into Dashboard

In your `dashboard.component.html`, use the skeleton when the store is loading:

```html
@if (store.loading()) {
  <app-statistic-card-skeleton [count]="4" />
} @else {
  <!-- Real Stats Grid -->
}
```

## 2. Integrate into Process List

In `process.component.html`, replace the table content or the entire card:

```html
<div class="process-grid">
  <section class="process-card table-card">
    @if (store.loading()) {
      <app-table-skeleton [rows]="10" />
    } @else {
      <p-table ...>
        <!-- Table Content -->
      </p-table>
    }
  </section>
</div>
```

## 3. Global CSS (Shimmer)

The shimmer animation is automatically applied via the `shimmer-effect` class provided by the standalone components.
