export const PROCESS_FORM_STYLES = `
  :host {
    display: block;
  }

  .section-card {
    border: 1px solid #d5d7da;
    border-radius: 20px;
    background: #ffffff;
    padding: 1.25rem;
    box-shadow: 0 16px 36px rgba(17, 24, 39, 0.06);
  }

  .section-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .section-title {
    margin: 0;
    font-size: 1.1rem;
    color: #111111;
  }

  .section-subtitle {
    margin: 0.35rem 0 0;
    color: #4b5563;
    line-height: 1.5;
    font-size: 0.92rem;
  }

  .section-note {
    margin: 0 0 1rem;
    padding: 0.85rem 1rem;
    border-left: 4px solid #1f7a3f;
    background: #f3f6f4;
    color: #1f2937;
    border-radius: 12px;
    font-size: 0.92rem;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: 1rem;
  }

  .field-span-2 {
    grid-column: span 2;
  }

  .field-span-full {
    grid-column: 1 / -1;
  }

  .form-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .form-field label {
    font-size: 0.82rem;
    font-weight: 700;
    color: #111111;
  }

  .form-field input,
  .form-field select,
  .form-field textarea {
    width: 100%;
    border: 1px solid #cfd4dc;
    border-radius: 12px;
    padding: 0.8rem 0.9rem;
    font: inherit;
    color: #111111;
    background: #ffffff;
  }

  .form-field textarea {
    min-height: 110px;
    resize: vertical;
  }

  .checkbox-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .checkbox-field {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 0.9rem;
    border: 1px solid #d5d7da;
    border-radius: 12px;
    background: #fafafa;
    color: #111111;
  }

  .checkbox-field input {
    width: auto;
    margin: 0;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1.2rem;
    flex-wrap: wrap;
  }

  .primary-button,
  .secondary-button,
  .danger-button {
    border: none;
    border-radius: 999px;
    padding: 0.8rem 1.15rem;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.15s ease, opacity 0.15s ease;
  }

  .primary-button {
    background: #1f7a3f;
    color: #ffffff;
  }

  .secondary-button {
    background: #111111;
    color: #ffffff;
  }

  .danger-button {
    background: #d14343;
    color: #ffffff;
  }

  .primary-button:hover,
  .secondary-button:hover,
  .danger-button:hover {
    transform: translateY(-1px);
  }

  .list-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  .list-table th,
  .list-table td {
    padding: 0.85rem 0.75rem;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
    font-size: 0.92rem;
    vertical-align: top;
  }

  .list-table th {
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #6b7280;
  }

  .row-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .text-muted {
    color: #6b7280;
  }

  .helper-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    border-radius: 999px;
    background: #edf5ef;
    color: #1f7a3f;
    padding: 0.35rem 0.7rem;
    font-size: 0.78rem;
    font-weight: 700;
  }

  .warning-box {
    margin-top: 1rem;
    padding: 0.9rem 1rem;
    border-radius: 14px;
    background: #f5f5f5;
    border: 1px solid #d1d5db;
    color: #111111;
  }

  @media (max-width: 768px) {
    .field-span-2 {
      grid-column: span 1;
    }
  }
`;
