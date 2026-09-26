## 2024-05-18 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Many icon-only buttons (like close modals, save recipes, and go back buttons) throughout the app are missing `aria-label` attributes. This presents a critical accessibility issue for screen readers. Some buttons like the pagination ones have labels, but it needs to be systematic.
**Action:** Found multiple icon-only buttons (`LoginModal.tsx` close button, `RecipeCard.tsx` save button, `VideoCard.tsx` save button). Implemented `aria-label` on one of the key interactive buttons for this PR.
