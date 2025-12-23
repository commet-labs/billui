# Contributing

Thanks for your interest in contributing to billui. We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to open an issue.

## About this repository

This is a Next.js application that serves as both the documentation site and the component registry.

We use pnpm for package management.
We use Biome for linting and formatting.
We use the shadcn registry system for component distribution.

## Structure

This repository is structured as follows:

```
billui/
├── content/
│   └── docs/
├── public/
│   └── r/
├── scripts/
└── src/
    ├── app/
    ├── components/
    ├── lib/
    └── registry/
        ├── ui/
        └── animated/
```

| Path | Description |
|------|-------------|
| `src/app/` | The Next.js application for the website. |
| `src/components/` | The React components for the website. |
| `src/registry/ui/` | The registry for the billing components. |
| `src/registry/animated/` | The registry for animated components. |
| `content/docs/` | The documentation content in MDX. |
| `public/r/` | The generated registry JSON files. |

## Development

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/your-username/billui.git
```

### Navigate to project directory

```bash
cd billui
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
pnpm install
```

### Run the dev server

```bash
pnpm dev
```

## Documentation

The documentation for this project is located in the `content/docs` directory. You can run the documentation locally by running the following command:

```bash
pnpm dev
```

Documentation is written using MDX. You can find the documentation files in the `content/docs` directory.

## Components

We use a registry system for developing components. You can find the source code for the components under `src/registry`. The components are organized by type.

```
src/registry/
├── ui/
│   ├── invoice-card.tsx
│   ├── payment-method.tsx
│   ├── plan-card.tsx
│   ├── plan-group.tsx
│   ├── pricing-table.tsx
│   └── usage-card.tsx
└── animated/
    └── animated-usage-card.tsx
```

When adding or modifying components, please ensure that:

1. You update the `registry.json` file with the component entry.
2. You update the documentation in `content/docs/components/`.
3. You run `pnpm build:registry` to update the registry.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention `category(scope or module): message` in your commit message while using one of the following categories:

- `feat / feature`: all changes that introduce completely new code or new features
- `fix`: changes that fix a bug (ideally you will additionally reference an issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e. github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above categories

e.g. `feat(components): add new prop to the plan-card component`

If you are interested in the detailed specification you can visit [Conventional Commits](https://www.conventionalcommits.org/) or check out the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Requests for new components

If you have a request for a new component, please open a discussion on GitHub. We'll be happy to help you out.

## Linting

We use Biome for linting and formatting. You can run the linter with:

```bash
pnpm lint
```

And format your code with:

```bash
pnpm format
```

Please ensure that the linting passes when submitting a pull request.
