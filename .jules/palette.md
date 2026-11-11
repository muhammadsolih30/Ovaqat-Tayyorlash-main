## 2024-11-12 - Hover-Based Visibility Interaction Pattern
**Learning:** In interactive cards (like video cards), buttons are frequently hidden by default using `opacity-0` and revealed on hover (`group-hover:opacity-100`). This completely breaks keyboard navigation because the focused button remains invisible.
**Action:** When implementing hover-reveal buttons, always pair `group-hover:opacity-100` with `focus-visible:opacity-100` to ensure keyboard users can actually see the controls they are interacting with.
