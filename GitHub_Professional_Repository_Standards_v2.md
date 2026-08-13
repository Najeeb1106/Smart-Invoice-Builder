# GitHub Professional Repository Standards

**Engineering Excellence Guide — Version 2.0**

---

## Purpose

This document defines the professional standards every engineer must meet before publishing or updating a GitHub repository. Every commit, every README, and every repository should reflect production-quality software engineering.

---

## 1. Repository Structure

A well-structured repository communicates professionalism before a single line of code is read. Apply these standards to every project.

### 1.1 Folder Organization

- Use a clean, logical folder hierarchy that separates concerns clearly.
- Separate frontend, backend, docs, assets, config, scripts, and tests into distinct directories.
- Maintain consistent naming conventions across the entire project (kebab-case for folders, camelCase or PascalCase for code, as appropriate to the language).
- Remove all unnecessary files: logs, temp folders, duplicate assets, editor artifacts (`.DS_Store`, `Thumbs.db`).

### 1.2 Essential Root Files

| File | Required? | Purpose |
|------|-----------|---------|
| `README.md` | Mandatory | Primary project documentation |
| `LICENSE` | Mandatory (public repos) | Legal usage rights — omitting means all rights reserved |
| `.gitignore` | Mandatory | Prevents secrets and build artifacts from being committed |
| `.env.example` | Mandatory (if env vars used) | Documents required env vars without exposing real values |
| `CONTRIBUTING.md` | Recommended | Contribution guidelines for collaborators |
| `CHANGELOG.md` | Recommended | Version history and release notes |
| `CODE_OF_CONDUCT.md` | Optional | Community behavior standards for open source projects |

---

## 2. README.md Requirements

The README is the front door of your repository. It must be clear, complete, and visually organized. Every public or portfolio repository requires a professional README.

### 2.1 Required Sections

- Project title with a concise one-line description
- Badges (build status, coverage, license, version) where applicable
- Feature list highlighting key capabilities
- Full tech stack (languages, frameworks, databases, external services)
- Installation and environment setup instructions
- Usage instructions with code examples or commands
- Screenshots or demo GIFs for any UI-facing project
- Live demo link (if deployed)
- Folder structure diagram or explanation
- API documentation summary or link to full docs
- Known limitations or future improvements
- License section

### 2.2 Optional but Recommended

- Architecture diagram or system design overview
- Challenges faced and engineering decisions made
- Contributing section with PR and issue guidelines
- Table of contents for longer READMEs

---

## 3. Code Quality Standards

Code pushed to the main branch must be readable, modular, and maintainable. These are non-negotiable for any repository intended to be seen by others.

### 3.1 Readability and Modularity

- Functions and components must do one thing clearly.
- Use descriptive, intention-revealing names for variables, functions, and classes.
- Keep files and functions small and focused. Refactor large files into modules.
- Apply consistent formatting — use a linter and formatter (ESLint + Prettier, Black, etc.) and commit the config.

### 3.2 What Must Be Removed Before Pushing

> **Remove all of the following before any push to main:**
> - Hardcoded secrets, API keys, passwords, or tokens
> - Commented-out dead code *(note: in-progress work on feature branches is acceptable)*
> - `console.log` / `print` / debug statements not serving a documented purpose
> - TODO comments that have been resolved
> - Unused imports, variables, or dependencies

---

## 4. Branching Strategy

A professional repository requires a defined branching model. Never commit directly to `main` for any non-trivial change.

### 4.1 Recommended Branch Model

| Branch | Purpose | Who Merges |
|--------|---------|------------|
| `main` | Production-ready code only. Always deployable. | Via PR from `develop` or `release` |
| `develop` | Active integration branch for features. Stable but not necessarily deployed. | Via PR from feature branches |
| `feature/name` | Individual feature or task. Branched from `develop`, merged back via PR. | Developer, reviewed by peer |
| `fix/name` | Bug fixes. Branched from `develop` or `main` depending on urgency. | Developer, reviewed by peer |
| `release/x.x` | Stabilization and final testing before merging to `main`. | Release engineer |

### 4.2 Pull Request Standards

- Every merge to `main` or `develop` must go through a Pull Request (PR).
- PRs must include a clear description of what changed and why.
- Link PRs to the relevant issue or ticket.
- Require at least one reviewer approval before merging on team projects.

---

## 5. Commit Message Standards

Use the **Conventional Commits** format. Every commit message must be meaningful, specific, and written in the imperative mood. Vague messages like "update", "fix", "done", or "final" are unacceptable.

### 5.1 Commit Message Format

```
<type>(<scope>): <short description>
```

- **type:** `feat` | `fix` | `refactor` | `docs` | `test` | `chore` | `style` | `perf` | `ci`
- **scope:** optional — the module or area affected (e.g. `auth`, `api`, `ui`)
- **description:** imperative, lowercase, max ~72 characters, no period at the end

### 5.2 Commit Examples

```
feat(auth): add JWT refresh token rotation
fix(api): resolve race condition in user profile endpoint
refactor(db): extract query builder into separate module
docs(readme): add installation steps for Windows
test(auth): add unit tests for token expiry logic
ci(github): add GitHub Actions workflow for automated testing
```

---

## 6. Testing and CI/CD Requirements

Relying solely on manual testing before pushing is unreliable and unprofessional. Automated testing and continuous integration are expected on any serious project.

### 6.1 Testing Standards

- Write unit tests for all business logic and utility functions.
- Write integration tests for API endpoints and database interactions.
- Write end-to-end tests for critical user flows on UI projects.
- Aim for meaningful coverage (80%+ on core logic), not just high numbers.
- Fix all TypeScript and linting errors. Zero-warning builds are the goal.
- Verify the project builds successfully from a clean clone before pushing.

### 6.2 GitHub Actions (CI/CD)

Every non-trivial repository should have at least a basic CI pipeline via GitHub Actions. Recommended workflow triggers:

- On `pull_request` to `main`/`develop`: run lint, tests, and build.
- On `push` to `main`: run full test suite and deploy to production (if applicable).
- Consider adding automated dependency security checks (Dependabot).

---

## 7. Deployment Requirements

Deploying major projects demonstrates they work in a real environment. However, deployment should not be treated as mandatory for all project types.

| Project Type | Deployment Expectation | Recommended Platforms |
|-------------|----------------------|----------------------|
| Frontend web app | Required for portfolio projects | Vercel, Netlify, GitHub Pages |
| Full-stack application | Required for portfolio projects | Vercel/Netlify (FE) + Render/Railway (BE) |
| Backend API / service | Strongly recommended | Render, Railway, Fly.io, AWS, GCP |
| CLI tool / library / package | Not applicable — publish to npm/PyPI instead | npm, PyPI, crates.io |
| Internal / private tooling | Optional, based on team needs | Internal infra, Docker |

> **Always verify live demo URLs are working before linking them in your README. A broken demo link is worse than no link.**

---

## 8. Documentation Standards

- Add inline code comments for non-obvious logic — not for obvious operations.
- Include API documentation (routes, parameters, response formats) either in the README or a dedicated `/docs` folder.
- Add architecture diagrams or ER diagrams for complex systems using tools like draw.io, Mermaid, or Excalidraw.
- Document all environment variables in `.env.example` with descriptions.
- Maintain a `CHANGELOG.md` for projects that are versioned or publicly released.

---

## 9. Security Requirements

> **Zero Tolerance: These violations must never occur in any push.**
> - Committing real API keys, tokens, passwords, or secrets of any kind
> - Pushing `.env` files containing real credentials (only `.env.example` is acceptable)
> - Misconfigured `.gitignore` that allows secrets into version history
> - Hardcoded credentials in source code, config files, or tests

### 9.1 Security Checklist

- `.gitignore` covers: `.env`, `node_modules`, `build/`, `dist/`, `*.log`, OS files
- `.env.example` exists with placeholder values and comments for each variable
- Authentication and authorization flows have been manually verified
- Dependencies have been checked for known vulnerabilities (`npm audit`, `pip-audit`)
- No sensitive data is exposed in client-side code or API responses

---

## 10. Versioning and Releases

Professional repositories use semantic versioning to communicate change impact clearly.

### 10.1 Semantic Versioning (SemVer)

| Version Part | When to Increment | Example |
|-------------|-------------------|---------|
| `MAJOR` (x.0.0) | Breaking changes to public API or behavior | `1.0.0 → 2.0.0` |
| `MINOR` (0.x.0) | New backwards-compatible features added | `1.2.0 → 1.3.0` |
| `PATCH` (0.0.x) | Bug fixes, no new features | `1.2.3 → 1.2.4` |

- Tag releases in Git: `git tag -a v1.0.0 -m "Initial release"`
- Create GitHub Releases with release notes derived from `CHANGELOG.md`
- For libraries and packages, publish to the appropriate registry (npm, PyPI, etc.)

---

## 11. Repository Presentation

Your GitHub profile is a professional portfolio. Apply the same care to how it looks as you would to a resume.

- Use clear, professional repository names in kebab-case (e.g., `task-management-api`, not `project2_FINAL`).
- Write a concise, informative repository description (shown on GitHub — treat it like a tagline).
- Add relevant topic tags (e.g., `react`, `nodejs`, `rest-api`, `open-source`) to improve discoverability.
- Pin only your 6 best and most complete repositories on your profile.
- Prefer quality over quantity: a profile with 5 polished, deployed projects is stronger than 20 incomplete ones.

---

## 12. Final Verification Checklist

Complete every item before pushing to `main` or publishing a repository. Do not skip items because they seem minor.

### Repository & Files

- [ ] `README.md` is complete with all required sections
- [ ] `LICENSE` file is present (for public/open-source repos)
- [ ] `.gitignore` is correctly configured
- [ ] `.env.example` is present and documents all required variables
- [ ] No secrets, tokens, or real credentials anywhere in the repo
- [ ] Folder structure is clean and organized

### Code Quality

- [ ] No commented-out dead code in the final branch
- [ ] No debug/`console.log` statements left in production code
- [ ] Linter and formatter have been run with zero errors
- [ ] All TypeScript errors resolved
- [ ] No unused imports or dependencies

### Testing & Build

- [ ] All tests pass locally
- [ ] Project builds successfully from a clean clone
- [ ] API endpoints and key features have been manually verified
- [ ] CI/CD pipeline passes (if configured)

### Commits & Branching

- [ ] Commit history uses Conventional Commits format
- [ ] No vague commit messages (`update`, `fix`, `done`, `final`)
- [ ] Changes merged via Pull Request (for team projects)

### Deployment & Documentation

- [ ] Live demo URL is working (if applicable)
- [ ] Screenshots or GIFs added to README (for UI projects)
- [ ] API documentation is present and accurate
- [ ] Architecture diagram included (for complex systems)
- [ ] `CHANGELOG.md` updated (for versioned projects)

### Repository Presentation

- [ ] Repository name is professional and descriptive
- [ ] Repository description is concise and informative
- [ ] Relevant topic tags added on GitHub

---

> **The Standard Is Simple**
> Every repository you publish is a statement about your engineering judgment. If you would not show it to a senior engineer in a job interview, it is not ready to push.

---

*Confidential — Internal Engineering Standards*
