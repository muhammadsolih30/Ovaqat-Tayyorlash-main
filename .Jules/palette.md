## 2024-05-15 - Missing aria-labels on icon-only buttons
**Learning:** Across the application's components, icon-only buttons (such as Close, Bookmark, Share) are frequently missing `aria-label` attributes. This creates a significant accessibility issue as screen readers cannot announce the purpose of these buttons to visually impaired users.
**Action:** When adding or reviewing icon-only buttons, always ensure an `aria-label` is present to describe its functionality clearly.
