
## 2026-10-25 - Interactive Elements Hidden by Hover State
**Learning:** In VideoCardYT, an interactive save button was visually hidden (`opacity-0`) by default and only revealed on mouse hover (`group-hover:opacity-100`). This completely hides the element from users navigating with a keyboard who tab through the interface, preventing them from realizing the action exists or interacting with it properly.
**Action:** Always pair hover-based visibility classes (`group-hover:opacity-100`) with keyboard focus visibility classes (`focus-visible:opacity-100`) to ensure interactive elements appear for all users when focused.
