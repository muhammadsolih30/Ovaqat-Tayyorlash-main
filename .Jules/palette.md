## 2024-05-18 - Input Label Associations and Icon Buttons
**Learning:** Found that custom modal components (like `LoginModal`) often miss basic accessibility attributes. Icon-only buttons lack `aria-label`s, and form inputs lack `id` attributes to connect them to their corresponding `<label>` tags (via `htmlFor`). This makes screen reader navigation and tap target sizes (clicking the label to focus input) worse.
**Action:** When reviewing custom forms or modals, always ensure inputs have `id`s paired with `<label htmlFor="...">` and icon-only buttons include descriptive `aria-label`s.
