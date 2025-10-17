#APP BUILDER

FROM node:20-alpine AS builder

WORKDIR /next-app

COPY ../frontend/nextjs-learn/next-app/package*.json /next-app/
COPY ../frontend/nextjs-learn/next-app/tsconfig.json /next-app/

RUN npm install

COPY ../frontend/nextjs-learn/next-app/ /next-app/

RUN npm run build

#APP RUNNER

FROM node:20-alpine AS runner

WORKDIR /next-app

COPY --from=builder /next-app/public ./public
COPY --from=builder /next-app/.next ./.next
COPY --from=builder /next-app/node_modules ./node_modules
COPY --from=builder /next-app/package.json ./package.json
COPY --from=builder /next-app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["npm", "start"]