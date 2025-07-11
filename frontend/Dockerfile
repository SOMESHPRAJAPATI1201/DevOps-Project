# Stage 1: Build the React app
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile || npm install

COPY . .

RUN yarn build || npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Clean default nginx web files
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config (for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from React (CRA)
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
