
## 2024-05-15 - [Added aria-labels to VideoHeader buttons]
**Learning:** Found multiple icon-only buttons (menu, search clear, search submit, theme toggle, profile menu) in the header lacking `aria-label`s. Language selection buttons using abbreviations also lacked context.
**Action:** Always verify icon-only buttons have descriptive `aria-label` attributes in the active application language (Uzbek) so screen readers can interpret their functionality.
