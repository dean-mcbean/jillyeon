# Force deploy of specific task definition

aws ecs update-service \
 --cluster ecs-axe-cluster \
 --service ecs-axe-service \
 --task-definition ui-axe-task:<id> \
 --force-new-deployment

# Push new image manually

```
aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin <awsid>.dkr.ecr.ap-southeast-2.amazonaws.com/development-axe-ecr
docker tag access-explorer <awsid>.dkr.ecr.ap-southeast-2.amazonaws.com/development-axe-ecr:latest
docker push <awsid>.dkr.ecr.ap-southeast-2.amazonaws.com/development-axe-ecr:latest
```

If you're getting an unauthenticated message, use `docker logout <url>`

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
