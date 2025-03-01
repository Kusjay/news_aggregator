FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_NEWSAPI_KEY
ARG NEXT_PUBLIC_GUARDIAN_API_KEY
ARG NEXT_PUBLIC_NYTIMES_API_KEY

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENV NEXT_PUBLIC_NEWSAPI_KEY=${NEXT_PUBLIC_NEWSAPI_KEY}
ENV NEXT_PUBLIC_GUARDIAN_API_KEY=${NEXT_PUBLIC_GUARDIAN_API_KEY}
ENV NEXT_PUBLIC_NYTIMES_API_KEY=${NEXT_PUBLIC_NYTIMES_API_KEY}

CMD ["node", "server.js"]