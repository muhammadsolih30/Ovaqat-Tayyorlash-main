## $(date +%Y-%m-%d) - Adding ARIA labels to icon-only buttons
**Learning:** Several interactive elements (like the 'close' button in BottomNav and the sidebar navigation items in collapsed view) were only visually identifiable by icons, making them inaccessible to screen reader users. The application also uses `lang` context to toggle languages, meaning some labels needed dynamic localization checking.
**Action:** Always add descriptive `aria-label` attributes to any `<button>` that doesn't have internal text content. Ensure labels respect the application's i18n structure.
