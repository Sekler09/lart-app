# LART APP starter

This is a self-made boilerplate for starting full-stack application development
Key techonologies: Turborepo, NextJS, NestJS, TypeScript, Prisma
Frontend: NextJS, Tanstack Query, Axios, Shadcn/ui, TailwindCSS, Zod, React-Hook-Form
Backend: NestJS, nestjs-zod, Passport JS, Bcrypt
## Using this example

Run the following command:

```bash
npx create-lart-app
```

## What's inside?

This repo includes the following packages/apps:

### Apps and Packages

    .
    ├── apps
    │   ├── api                       # NestJS app (https://nestjs.com).
    │   └── web                       # Next.js app (https://nextjs.org).
    └── packages
        ├── @repo/api                 # Shared types and schemas.
        ├── @repo/databse             # Prisma package.
        ├── @repo/eslint-config       # `eslint` configurations (includes `prettier`)
        ├── @repo/typescript-config   # `tsconfig.json`s used throughout the monorepo

Each package and application are 100% [TypeScript](https://www.typescriptlang.org/) safe.

### Utilities

This `repo` has some additional tools already set for you:

- [TypeScript](https://www.typescriptlang.org/) for static type-safety
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Commands

This `repo` already configured useful commands for all your apps and packages.

#### Build

```bash
# Will build all the app & packages with the supported `build` script.
npm run build

# ℹ️ If you plan to only build apps individually,
# Please make sure you've built the packages first.
```

#### Develop

```bash
# Will run the development server for all the app & packages with the supported `dev` script.
npm run dev
```

#### Lint

```bash
# Will lint all the app & packages with the supported `lint` script.
# See `@repo/eslint-config` to customize the behavior.
npm run lint
```

#### Format

```bash
# Will format all the supported `.ts,.js,json,.tsx,.jsx` files.
# See `@repo/eslint-config/prettier-base.js` to customize the behavior.
npm format
```

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
