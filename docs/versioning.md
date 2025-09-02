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

- **develop**: Development branch where versions are automatically incremented (beta releases like 1.2.0-beta.1)
- **master**: Stable releases that promote existing versions from develop (no new version creation)

## How It Works

1. Commit with conventional commit format to any branch
2. **Push to `develop`** → GitHub Actions automatically:

   - Analyzes commit messages
   - Determines version bump and creates beta release (e.g., 1.2.0-beta.1)
   - Updates package.json
   - Creates git tag
   - Generates changelog
   - Builds and pushes Docker images with beta version tags

3. **Push to `master`** → GitHub Actions:
   - Builds and pushes Docker images with stable tags
   - No version changes (promotes existing version from develop)

## Setup for Contributors

The project enforces conventional commits via git hooks. When you first clone:

1. Run `npm install`
2. Husky will automatically setup commit-msg validation
3. Your commits will be validated against conventional commit format
