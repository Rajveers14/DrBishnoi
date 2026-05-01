# Dr. Bishnoi Child Wellness Center — Website

A clean, fully static website for **Dr. Rajkumar Bishnoi — Pediatrician & Child Specialist**, Udaipur.  
Rebuilt from the Lovable app prototype into a portable, GitHub-hostable codebase.

Live demo: <https://dr-bishnoi-childwellness.lovable.app/>

---

## Features

- **Splash screen** — premium name-reveal animation (lines → letters → shimmer → tagline)  
- **Animated canvas background** — floating bokeh orbs, rising particles, drifting medical crosses  
- **Responsive** — mobile-first, works on all screen sizes  
- **Booking form** → opens WhatsApp with a pre-filled appointment message  
- **Scroll animations** — elements reveal as they enter the viewport  
- **Active nav link** highlighting on scroll  
- **Mobile hamburger menu**  
- **No frameworks, no build step** — pure HTML / CSS / JS, zero dependencies

---

## Project Structure

```
dr-bishnoi-website/
├── index.html          ← entry point
├── css/
│   └── style.css       ← all styles + animations
├── js/
│   └── app.js          ← splash, canvas, navbar, form logic
└── README.md
```

---

## Deploy to GitHub Pages

1. **Create a new repository** on GitHub (e.g. `dr-bishnoi-website`).

2. **Push this folder** to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/dr-bishnoi-website.git
   git push -u origin main
   ```

3. In the repository → **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: `main` / `/ (root)`
   - Click **Save**

4. Your site will be live at:
   ```
   https://YOUR_USERNAME.github.io/dr-bishnoi-website/
   ```

> **Custom domain** — add a `CNAME` file containing your domain name (e.g. `drbishnoichildwellness.in`) and point your DNS to GitHub's servers.

---

## Clinic Info (embedded in site)

| Detail | Value |
|--------|-------|
| Doctor | Dr. Rajkumar Bishnoi |
| Specialty | Pediatrician · Neonatologist · NICU Specialist |
| Phone / WhatsApp | +91 86195 01881 |
| Address | 100 Feet Road, Sardina Niwas, Udaipur, Rajasthan |
| Consultation Fee | ₹500 |
| Opens | 5:30 PM Daily |
| Google Rating | ⭐ 5.0 (22 reviews) |

---

## Customisation

All content lives directly in `index.html`.  
Colours are CSS variables in `css/style.css` under `:root`:

```css
--blue:  #0EA5E9;   /* primary sky blue  */
--cyan:  #06B6D4;   /* secondary cyan    */
--green: #10B981;   /* accent green      */
--navy:  #0C1A2E;   /* background navy   */
```

---

© 2025 Dr Bishnoi Child Wellness Center
