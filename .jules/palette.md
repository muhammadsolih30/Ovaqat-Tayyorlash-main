## 2024-03-20 - Invisible Keyboard Traps
**Learning:** Elements relying on `opacity-0 group-hover:opacity-100` utility classes become completely inaccessible to keyboard users because they can receive focus but remain invisible.
**Action:** When using hover-based visibility utility classes on interactive elements, always pair them with `focus-visible:opacity-100` (and appropriate focus rings) to ensure they are visible when navigated via keyboard.
