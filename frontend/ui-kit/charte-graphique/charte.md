# Charte Graphique: SOLIWAYS 2027

## Identity
- **Mood**: High-tech, futuristic, ambitious, educational, and inspiring.
- **Audience**: Students, developers, tech entrepreneurs, engineers, and digital innovators in Morocco and worldwide.
- **Feel**: Deep futuristic blue & night cyber tones punctuated with vibrant glowing turquoise and electric violet accents. Clean, sharp typography and premium glassmorphism.

---

## Colors

| Token | HEX | Tailwind | Usage |
| :--- | :--- | :--- | :--- |
| `primary` (Turquoise) | `#25A6AC` | `bg-primary`, `text-primary`, `border-primary` | Primary CTAs, active indicators, neon glow highlights |
| `primary-hover` | `#1E878C` | `hover:bg-primary-hover` | Interactive hover state for primary elements |
| `secondary` (Bleu Digital) | `#456BB8` | `bg-secondary`, `text-secondary` | Gradients, badges, supporting iconography |
| `accent` (Violet Innovation)| `#6554B8` | `bg-accent`, `text-accent` | Cyber gradient stops, event feature badges |
| `dark` (Bleu Nuit) | `#101828` | `bg-dark`, `text-dark` | Hero, dark sections, headers, dark buttons |
| `dark-surface` | `#162036` | `bg-dark-surface` | Elevated cards on dark backgrounds |
| `dark-card` | `#1A2640` | `bg-dark-card` | Interactive items and program timeline nodes |
| `background-light` | `#F5F8FC` | `bg-background-light` | Contrast light sections (À propos, Stats, FAQ) |
| `surface-light` | `#FFFFFF` | `bg-surface-light` | Feature cards on light sections |
| `text-primary-dark` | `#101828` | `text-slate-900` | Headings and primary text on light backgrounds |
| `text-muted-dark` | `#475569` | `text-slate-600` | Body and descriptive text on light backgrounds |
| `text-primary-light` | `#FFFFFF` | `text-white` | Headings and primary text on dark backgrounds |
| `text-muted-light` | `#94A3B8` | `text-slate-400` | Secondary text on dark backgrounds |
| `border-dark` | `#22314E` | `border-border-dark` | Subtle borders and glass borders on dark elements |
| `border-light` | `#E2E8F0` | `border-border-light` | Card borders on light sections |

### Semantic Colors
| Token | HEX | Tailwind | Usage |
| :--- | :--- | :--- | :--- |
| `success` | `#10B981` | `bg-emerald-500`, `text-emerald-400` | Confirmed badges, active spots |
| `warning` | `#F59E0B` | `bg-amber-500`, `text-amber-400` | Countdown urgency, important notices |
| `danger` | `#EF4444` | `bg-rose-500`, `text-rose-400` | Form error states |
| `info` | `#25A6AC` | `bg-cyan-500`, `text-cyan-400` | Status highlights |

### Contrast Check (WCAG AA)
- Primary `#25A6AC` on Dark `#101828`: **6.1:1** (PASS AA / AAA for large text)
- White `#FFFFFF` on Primary `#25A6AC`: **3.5:1** (Large text / bold UI buttons)
- Dark `#101828` on Light Background `#F5F8FC`: **14.8:1** (PASS AAA)
- White `#FFFFFF` on Dark `#101828`: **16.5:1** (PASS AAA)

---

## Typography

- **Headings Font**: `Inter`, sans-serif (`font-heading`)
- **Body & Text Font**: `Manrope`, sans-serif (`font-sans`)
- **Google Fonts Import**:
  `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Manrope:wght@400;500;600;700&display=swap`

### Scale
| Level | Font Size | Line Height | Weight | Tailwind Classes |
| :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | `3rem` to `4.5rem` (48px - 72px) | `1.1` | 800 / 900 | `font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight` |
| **Section H2**| `2rem` to `2.75rem` (32px - 44px) | `1.2` | 700 / 800 | `font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight` |
| **Subhead H3**| `1.25rem` to `1.5rem` (20px - 24px) | `1.3` | 600 / 700 | `font-heading text-xl sm:text-2xl font-semibold` |
| **H4 / Card** | `1.125rem` (18px) | `1.4` | 600 | `font-heading text-lg font-semibold` |
| **Body Lead** | `1.125rem` (18px) | `1.6` | 400 / 500 | `font-sans text-lg font-normal leading-relaxed` |
| **Body Base** | `1rem` (16px) | `1.6` | 400 | `font-sans text-base font-normal leading-relaxed` |
| **Small / Badges**| `0.875rem` (14px) | `1.4` | 600 | `font-sans text-sm font-semibold tracking-wider uppercase` |

---

## Design Tokens: Spacing, Radius & Shadows

### Spacing Scale
Built on 4px base (`p-2`, `p-4`, `p-6`, `p-8`, `p-12`, `p-16`, `p-20`, `p-24`).

### Radius
- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-xl` (12px)
- Badges & Pills: `rounded-full` (9999px)
- Containers: `rounded-3xl` (24px)

### Shadows & Glows
- `shadow-glow-cyan`: `0 0 25px -5px rgba(37, 166, 172, 0.4)`
- `shadow-glow-purple`: `0 0 25px -5px rgba(101, 84, 184, 0.4)`
- `shadow-card-dark`: `0 10px 30px -10px rgba(0, 0, 0, 0.5)`
- `shadow-card-light`: `0 10px 25px -5px rgba(16, 24, 40, 0.05)`

### Motion & Transitions
- Standard duration: `duration-200` to `duration-300`
- Easing: `ease-out` / `cubic-bezier(0.16, 1, 0.3, 1)`
