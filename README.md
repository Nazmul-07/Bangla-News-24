# 📰 Bangla News 24

A modern, responsive Bangla news portal built with **Next.js, TypeScript, and Tailwind CSS**. The platform displays news articles, latest headlines, popular stories, and category-based navigation through a news API.

## Live link: https://bangla-news-24-umber.vercel.app/

## 🌟 Project Overview

Bangla News 24 is a news portal project designed to provide a clean, user-friendly, and responsive reading experience across mobile, tablet, and desktop devices. It features a dynamic news ticker, featured stories, category navigation, and a most-read news section.

## ✨ Features

- **Responsive Design** — Optimized for mobile, tablet, and desktop screens.
- **Dynamic News Feed** — Fetches news articles from an external API.
- **Latest News Ticker** — Displays scrolling headlines with animation.
- **Featured News Section** — Highlights the main story and other important news.
- **Category Navigation** — Displays available news categories dynamically.
- **Most-Read News** — Shows popular stories in a ranked list.
- **Reusable Components** — Modular components for cards, navigation, headlines, and news sections.
- **Image Optimization** — Uses Next.js Image for optimized image rendering.
- **Loading and Error Handling** — Provides fallback messages when news cannot be loaded.
- **Data Revalidation** — Uses Next.js fetch caching and revalidation to refresh news data periodically.
- **Interactive UI** — Includes hover effects, smooth transitions, and animated headlines.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | React framework and server-side data fetching |
| React | Component-based user interface |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling and layout |
| DaisyUI | UI utility classes and components, where used |
| Lucide React | Icons, where needed |
| `react-marquee-text` | Animated scrolling headlines |
| News API | News articles, categories, and popular stories |

## 📡 API Integration

The project uses the following API endpoints:

| Endpoint | Purpose |
|---|---|
| `https://news-api-v2.vercel.app/api/categories` | Fetches news categories |
| `https://news-api-v2.vercel.app/api/news?limit=10` | Fetches news headlines |
| `https://news-api-v2.vercel.app/api/news/most-read` | Fetches most-read news |
| `https://news-api-v2.vercel.app/api/news/sections` | Fetches homepage news sections |

The API is used to populate the homepage and navigation dynamically.

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (LTS recommended)
- npm, yarn, pnpm, or bun
- Git

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd your-project-folder
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Visit:

```text
http://localhost:3000
```

## 📁 Project Structure

The following is a representative structure based on the components used in the project. Adjust it to match your actual folders.

```text
bangla-news-24/
├── public/
│   └── logo.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Header.tsx
│       ├── DateDisplay.tsx
│       ├── NavLinks.tsx
│       ├── Marquee.tsx
│       ├── MarqueeClient.tsx
│       ├── MainNews.tsx
│       ├── NewsCard.tsx
│       └── MostRead.tsx
├── package.json
├── tsconfig.json
└── README.md
```

> Note: Your actual folder structure may differ depending on where you keep your components.

## 📱 Responsive Layout

The interface adapts to different screen sizes:

- **Mobile:** Compact navigation, readable headlines, and single-column layouts.
- **Tablet:** Balanced spacing and multi-column news cards where appropriate.
- **Desktop:** Wider content area, featured news layout, and sidebar sections.

## ⚡ Performance

- Server Components are used for API-driven sections where appropriate.
- News API responses use Next.js revalidation to reduce unnecessary requests.
- Next.js Image helps optimize image delivery.
- Reusable components help keep the codebase organized and maintainable.

## 🔮