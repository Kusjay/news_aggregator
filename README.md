# News Aggregator

A modern news aggregator built with Next.js, TypeScript, Tailwind CSS, and Shadcn UI that pulls articles from various sources and displays them in a clean, responsive format.

## Features

- **Multiple Data Sources**: Fetches news from NewsAPI, The Guardian, and New York Times APIs
- **Article Search and Filtering**: Search by keyword and filter by date, category, and source
- **Personalized News Feed**: Users can customize their feed by selecting preferred sources and categories
- **Mobile-Responsive Design**: Optimized for all device sizes
- **Modern UI**: Clean interface using Tailwind CSS and Shadcn UI components
- **Containerized**: Includes Docker configuration for easy deployment

## Tech Stack

- **Frontend Framework**: Next.js with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **State Management**: Zustand
- **API Handling**: Axios
- **Date Handling**: Day.js
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- API keys for NewsAPI, The Guardian, and New York Times

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/news-aggregator.git
cd news-aggregator
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with your API keys:

```
NEXT_PUBLIC_NEWSAPI_KEY=your_newsapi_key_here
NEXT_PUBLIC_GUARDIAN_API_KEY=your_guardian_api_key_here
NEXT_PUBLIC_NYTIMES_API_KEY=your_nytimes_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running with Docker

1. Build and run using Docker Compose:

```bash
docker-compose up --build
```

2. Or using Docker directly:

```bash
# Build the Docker image
docker build -t news-aggregator \
  --build-arg NEXT_PUBLIC_NEWSAPI_KEY=your_newsapi_key_here \
  --build-arg NEXT_PUBLIC_GUARDIAN_API_KEY=your_guardian_api_key_here \
  --build-arg NEXT_PUBLIC_NYTIMES_API_KEY=your_nytimes_api_key_here .

# Run the container
docker run -p 3000:3000 news-aggregator
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
news-aggregator/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main homepage
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── ui/                # UI components
│   │   ├── news-grid.tsx      # News article grid
│   │   ├── pagination.tsx     # Pagination component
│   │   ├── search-filters.tsx # Search and filter UI
│   │   └── user-preferences.tsx # User preferences UI
│   ├── lib/
│       ├── api/               # API service functions
│       ├── store/             # Zustand state management
│       └── utils.ts           # Utility functions
├── public/                    # Static files
├── .env.local                 # Environment variables (gitignored)
├── Dockerfile                 # Docker configuration
├── docker-compose.yml         # Docker Compose configuration
└── next.config.js             # Next.js configuration
```

## Software Design Principles

This project follows several software design principles:

- **DRY (Don't Repeat Yourself)**: Reusable components and utility functions minimize code duplication
- **KISS (Keep It Simple, Stupid)**: Clear, straightforward implementations focus on solving the specific requirements
- **SOLID Principles**:
  - **Single Responsibility**: Each component and function has a well-defined purpose
  - **Open-Closed**: Components are designed to be extended without modification
  - **Liskov Substitution**: Component interfaces are consistent and interchangeable
  - **Interface Segregation**: APIs and components have focused, specific interfaces
  - **Dependency Inversion**: High-level modules don't depend on low-level details

## API Reference

This project uses the following news APIs:

- [NewsAPI](https://newsapi.org/)
- [The Guardian API](https://open-platform.theguardian.com/)
- [New York Times API](https://developer.nytimes.com/)

You'll need to obtain API keys from each service and add them to your `.env.local` file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
