# Rafael Velazco — Website Style Guide

_Defined: March 23, 2026_

---

## 1. Design Philosophy

**Personality + Clean.** The site should feel like a real person wrote it and cares about it — not a template. Every design decision leans toward warmth and character while keeping the reading experience distraction-free.

The target feeling: _"This person has range. They write great technical content AND think about people and ideas."_

---

## 2. Color

### Accent — Sage

The primary accent color used for links, active nav, tags, buttons, callouts, and highlights.

| Token    | Hex       | Usage                                |
| -------- | --------- | ------------------------------------ |
| sage-100 | `#f4f7f5` | Tag backgrounds, callout backgrounds |
| sage-200 | `#e4ede8` | Hover states, subtle borders         |
| sage-300 | `#c8ddd0` | Decorative elements                  |
| sage-400 | `#a8c8b4` | Disabled states                      |
| sage-500 | `#7daa8d` | Dark mode: links, highlights         |
| sage-600 | `#5c9070` | Dark mode: buttons                   |
| sage-700 | `#4d7c5f` | **Primary accent (light mode)**      |
| sage-800 | `#3b6049` | Hover on primary                     |
| sage-900 | `#274535` | Dark text on light sage bg           |

### Backgrounds

| Token        | Hex       | Usage                               |
| ------------ | --------- | ----------------------------------- |
| bg-light     | `#fafaf9` | Page background (light mode)        |
| bg-dark      | `#1a1a1a` | Page background (dark mode)         |
| bg-card-dark | `#1a1a1a` | Card background (dark mode)         |
| border-light | `#eee`    | Dividers, card borders (light mode) |
| border-dark  | `#2a2a2a` | Dividers, card borders (dark mode)  |

### Text

| Token             | Hex       | Usage                       |
| ----------------- | --------- | --------------------------- |
| text-primary      | `#111111` | Headings, body (light mode) |
| text-secondary    | `#666666` | Subtitles, descriptions     |
| text-muted        | `#aaaaaa` | Dates, metadata             |
| text-primary-dark | `#f0f0f0` | Headings, body (dark mode)  |
| text-muted-dark   | `#555555` | Metadata (dark mode)        |

### Category Tag Colors

Each content category gets its own color to differentiate at a glance.

| Category           | Background | Text                |
| ------------------ | ---------- | ------------------- |
| Angular            | `#f4f7f5`  | `#4d7c5f` (sage)    |
| NgRx               | `#eff6ff`  | `#3b82f6` (blue)    |
| Book               | `#fdf4ff`  | `#9333ea` (purple)  |
| Leadership / Ideas | `#f0f0f0`  | `#555555` (neutral) |

---

## 3. Typography

### Font Family

**Inter** — used throughout for all text (body, headings, UI).

```
font-family: 'Inter', sans-serif;
```

Import from Google Fonts:

```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap
```

### Type Scale

| Element              | Size    | Weight | Letter spacing | Notes                      |
| -------------------- | ------- | ------ | -------------- | -------------------------- |
| Homepage hero title  | 52–56px | 800    | -0.03em        | Bold, commanding           |
| Article page title   | 36–40px | 700    | -0.02em        | Strong but not loud        |
| Section heading (h2) | 26–28px | 700    | -0.02em        |                            |
| Sub-heading (h3)     | 20px    | 600    | -0.01em        |                            |
| Body text            | 16–17px | 400    | 0              | Comfortable for long reads |
| Article excerpt      | 15px    | 400    | 0              |                            |
| Metadata / dates     | 13px    | 400    | 0              | Muted color                |
| Tags / labels        | 11px    | 600    | 0.03em         | Uppercase optional         |
| Section labels       | 10–11px | 700    | 0.08em         | All caps, muted            |

### Reading Column

Articles are constrained to **~750px** max-width for comfortable long-form reading.

---

## 4. Layout

### Homepage

1. **Header** — Brand name + title (left), navigation links (right), dark mode toggle
2. **Hero section** — Large bold headline with sage accent on the highlighted phrase. Short tagline below. _Photo placeholder ready — add when available._
3. **Recent Articles** — Grid of article cards (3 columns on desktop)
4. **"Ver todos los artículos →"** CTA link
5. **Footer**

### Blog Listing Page

- Left column: article list (date, tag, title, excerpt, "Leer más →")
- Right sidebar: category filter
- No pagination complexity — keep it simple

### Article Page

- Centered single column, 750px max-width
- Dark code blocks that stand out from the light prose
- Table of contents for long articles
- Author/date metadata at top

### Footer (all pages)

Three-column layout:

- **Col 1:** Name, short bio mentioning "código, personas e ideas"
- **Col 2:** Navigation links (Blog, Portfolio, About, Contacto)
- **Col 3:** Topic links (Angular, NgRx, Libros, Liderazgo)
- Bottom bar: Copyright (left), Social links — GitHub, LinkedIn, Contact (right)

---

## 5. Components

### Navigation

- Brand name + subtitle (left)
- Nav links (right): Home, Blog, Portfolio, Contacto
- Active link: sage color + 2px underline
- Dark mode toggle button (far right)

### Article Cards (homepage grid)

- Light border, rounded corners (~12px)
- Date + category tag (top)
- Title (bold, ~18px)
- Excerpt (2–3 lines, muted)
- "Leer más →" link in sage

### Buttons

- **Primary:** Sage background, white text, 8px radius
- **Ghost:** Transparent, sage border, sage text
- **Text link:** No background, sage color, arrow suffix (→)

### Code Blocks

- **Dark background** (e.g. `#1a1a2e`) on light pages — high contrast
- Syntax highlighted
- Filename tab header in darker sage shade
- Monospace font

### Callout / Info Box

- Left border in sage (3px)
- Soft sage-100 background
- sage-900 text
- Used for tips, best practices, warnings

### Tags / Badges

- Small, rounded (6px)
- Category-specific colors (see Color section)
- 11px, semi-bold

---

## 6. Dark Mode

Dark mode is offered as a user toggle. Key differences:

- Background: `#1a1a1a` (cards), `#0c0c0c` (page)
- Sage accent shifts to lighter variants (`#7daa8d`) for readability
- Tag backgrounds use semi-transparent dark versions of their colors
- Borders: `#2a2a2a`
- Code blocks remain dark (already match dark mode)

---

## 7. Content Strategy

The blog covers four content areas, all within the professional space:

1. **Technical** (Angular, NgRx, JavaScript) — code-heavy posts
2. **Engineering practices** — patterns, architecture, tooling
3. **People & ideas** — working with teams, communication, soft skills
4. **Book summaries** — professional books worth reading

All content types use the same layout — differentiated only by tag color.

---

## 8. About Page

A dedicated About page for the full personal story. The homepage hero keeps it brief (tagline only for now, photo to be added). The footer bio is a one-liner that links to About for more.

---

_Style guide created through collaborative design session with Claude (Cowork mode)._
