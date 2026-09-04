# snoomleng — Personal Portfolio

My personal developer portfolio and technical blog, built to showcase my projects, experience, and writing.

🌐 **Live:** [snoomleng.com](https://snoomleng.com)

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query
- GSAP
- Storybook

### Backend

- Next.js Server Actions & API Routes
- Node.js
- PostgreSQL
- Neon
- Drizzle ORM
- better-auth
- Sanity CMS
- React Email

### Testing & Tooling

- Vitest
- Playwright
- pnpm
- ESLint

### DevOps & Infrastructure

- Docker
- GitHub Actions
- Nginx
- Linux
- Git & GitHub
- AWS EC2
- AWS ECR
- AWS SES
- AWS Secrets Manager
- AWS Security Groups
- Certbot

## Features

- Responsive personal portfolio
- Project showcase
- Technical blog
- Sanity-powered content management
- Admin dashboard
- Authentication
- Contact form
- REST API endpoints
- PostgreSQL database
- Transactional email
- Dockerized production deployment
- Automated CI/CD with GitHub Actions
- HTTPS with Nginx and Certbot

## Architecture

The project is built as a **monolithic Next.js application**.

The frontend, backend logic, authentication, API endpoints, and application UI live within a single codebase. PostgreSQL is used for structured application data, while Sanity CMS manages editorial content such as blog posts and portfolio content.

Server Actions and API routes handle backend operations, while Drizzle ORM provides type-safe database access.

The contact system stores submissions in PostgreSQL and uses Amazon SES for transactional email delivery.

The application is containerized with Docker and deployed to an AWS EC2 instance. Nginx acts as the reverse proxy and handles HTTPS traffic, with TLS certificates managed through Certbot.

GitHub Actions automates the CI/CD workflow, including validation, building, and deployment.

## Development

### Requirements

- Node.js
- pnpm
- Docker

### Installation

```bash
git clone https://github.com/saisaynoomleng/snoomleng_mono.git

cd snoomleng

pnpm install
```

### Environment Variables

Create the required environment variables using the provided `.env.example` files.

Never commit production secrets or credentials to the repository.

```bash
pnpm dev
```

The application will start in development mode.

### Build

```bash
pnpm build
```

### Production

The application can be built and run using Docker.

```bash
docker build -t snoomleng .
docker run -p 3000:3000 snoomleng
```

## CI/CD

GitHub Actions automates the production workflow.

Changes pushed to the repository are validated through automated checks such as:

- Linting
- Type checking
- Tests
- Production builds

Successful builds can then be deployed to the production EC2 environment.

## Deployment Architecture

```text
                    ┌─────────────────────┐
                    │       Browser       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Nginx         │
                    │   Reverse Proxy     │
                    │       HTTPS         │
                    └──────────┬──────────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │        Next.js Monolith        │
              │                                │
              │  Portfolio                     │
              │  Blog                          │
              │  Admin                         │
              │  Server Actions                │
              │  API Routes                    │
              │  Authentication                │
              │  Application Logic             │
              └───────────────┬────────────────┘
                              │
                 ┌────────────┴─────────────┐
                 │                          │
                 ▼                          ▼
        ┌─────────────────┐       ┌─────────────────┐
        │   PostgreSQL    │       │   Sanity CMS    │
        │      Neon       │       │   Blog/Content  │
        └─────────────────┘       └─────────────────┘
                 │
                 │
                 ▼
        ┌─────────────────┐
        │   Amazon SES    │
        │  Transactional  │
        │      Email      │
        └─────────────────┘

        Deployment / Infrastructure

        GitHub Actions
              │
              ▼
        Docker → ECR → EC2
```

## Author

### saisaynoomleng

Developer focused on full-stack development, backend engineering, and cloud infrastructure.

[Portfolio](https://snoomleng.com)
