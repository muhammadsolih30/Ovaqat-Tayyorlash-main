## 2024-11-20 - Accessible icon-only save buttons
**Learning:** Icon-only buttons used for saving items (like hearts and bookmarks) in cards across the app frequently lack screen reader labels and keyboard focus states. Users relying on keyboards or assistive tech could miss the purpose of the button or their active focus state.
**Action:** Always add descriptive `aria-label`s reflecting state (e.g., "Saqlash" vs "Saqlanganlardan o'chirish") and visible `focus-visible` styles (`focus-visible:ring-2 focus-visible:ring-offset-2`) when implementing interactive icon elements without text.
