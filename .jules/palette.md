## 2024-11-02 - Keyboard focus for hover-based visibility
**Learning:** Using `opacity-0 group-hover:opacity-100` on interactive elements like buttons makes them completely inaccessible to keyboard users because they remain invisible even when focused.
**Action:** Always pair hover-based visibility utility classes with keyboard focus visibility classes (e.g., `focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none`) to ensure interactive elements are usable via keyboard.
