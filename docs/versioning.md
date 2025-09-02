# Version Management

This project uses automated versioning based on conventional commits. Here's how it works:

## Automated Versioning

The project uses **semantic-release** to automatically determine version bumps based on commit messages:

- `fix:` commits → **patch** version bump (1.1.1 → 1.1.2)
- `feat:` commits → **minor** version bump (1.1.1 → 1.2.0)
- `chore:` commits → **patch** version bump (1.1.1 → 1.1.2)
- `docs:` commits → **patch** version bump (1.1.1 → 1.1.2)
- `style:` commits → **patch** version bump (1.1.1 → 1.1.2)
- `refactor:` commits → **patch** version bump (1.1.1 → 1.1.2)
- `perf:` commits → **patch** version bump (1.1.1 → 1.1.2)
- `test:` commits → **patch** version bump (1.1.1 → 1.1.2)
- `BREAKING CHANGE:` in commit body → **major** version bump (1.1.1 → 2.0.0)

## Commit Message Format

Use conventional commits format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Examples:

```bash
# Patch version bump
git commit -m "fix: resolve topic loading issue"
git commit -m "chore: update dependencies"
git commit -m "docs: update README"

# Minor version bump
git commit -m "feat: add dark mode toggle"

# Major version bump
git commit -m "feat: redesign API structure

BREAKING CHANGE: API endpoints have changed"
```

## Manual Version Bumping

If you need to manually bump versions:

```bash
npm run version:patch  # 1.1.1 → 1.1.2
npm run version:minor  # 1.1.1 → 1.2.0
npm run version:major  # 1.1.1 → 2.0.0
```

## Branch Strategy

- **master**: Production releases (stable versions)
- **develop**: Beta releases (prerelease versions like 1.2.0-beta.1)

## How It Works

1. Commit with conventional commit format
2. Push to `develop` or `master` branch
3. GitHub Actions automatically:
   - Analyzes commit messages
   - Determines version bump
   - Updates package.json
   - Creates git tag
   - Generates changelog
   - Builds and pushes Docker images with version tags

## Setup for Contributors

The project enforces conventional commits via git hooks. When you first clone:

1. Run `npm install`
2. Husky will automatically setup commit-msg validation
3. Your commits will be validated against conventional commit format
