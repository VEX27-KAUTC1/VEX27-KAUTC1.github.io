# VEX27 Engineering Hub

Astro Starlight documentation for two robots, team journals, research, project management, and resources. Technical pages are scaffolds until the team supplies reviewed facts. No member identities, robot data, or competition strategy have been invented.

## Start locally

Install Node.js 22 or newer and pnpm 11.25.0, then:

```sh
pnpm install
pnpm dev
```

Build and validate:

```sh
pnpm check:structure
pnpm check:source-links
pnpm build
pnpm check:links
```

The repository owner is derived from `GITHUB_REPOSITORY` in GitHub Actions. For local production URL testing, set it to the **verified** `organization/organization.github.io`. The site builds without it for local preview, but repository edit links appear only with a verified owner.

## Organization setup and publication

1. Confirm the actual GitHub organization and that you have organization Owner rights. Inspect existing repositories before creating one. Do not overwrite an existing Pages repository.
2. Create an **organization-owned public** repository exactly named `<organization>.github.io` if it does not already exist. Public GitHub Pages is appropriate only after every page and linked file passes the team's publication review. For private competition material, keep a separate restricted repository or storage location.
3. Push this project to `main` in that repository. In **Settings → Pages**, select **GitHub Actions** as the build and deployment source. The workflow in `.github/workflows/pages.yml` builds pull requests and deploys merges to `main`.
4. Give a GitHub organization team **Write** access to the repository for authorized contributors. Do not grant access based on guessed usernames. Set a branch ruleset on `main` that requires pull requests, one review, passing build checks, and no force pushes, where plan permissions allow. Grant maintainers appropriate review permissions.
5. Create an organization GitHub Project and link its URL on `src/content/docs/management/tasks.md`. Use Issues as the single task source. Update the resources and season references after verification.
6. Confirm the Actions run and the actual URL in Settings → Pages. An organization root Pages repository typically resolves at `https://<organization>.github.io/`; deployment must be verified before sharing.

## Add a member

1. Get their correct name, GitHub handle, responsibilities, robot assignment, and consent to publish a profile.
2. In GitHub, copy `templates/member-profile.md` to `src/content/docs/team/members/<handle>.md`. Fill real details and remove placeholders.
3. Add a link in `src/content/docs/team/members/index.md`; create a branch and a pull request. After review and merge, the profile appears in the directory.

## Publish a daily report

1. Open the repository on GitHub, copy `templates/daily-report.md` to `src/content/docs/team/journal/YYYY-MM-DD-<handle>-<topic>.md`.
2. Fill `title`, `date` (ISO `YYYY-MM-DD`), `member`, robot, department, work, evidence, issues, and next steps. Use relative links for site pages. Add only approved images to `src/assets/` or `public/`.
3. Submit a pull request. The homepage activity feed reads all journal pages at build time, sorts by date, and shows the six newest after merge and deployment. Add a link in the member profile as well.

## Update robot documentation

Open the subsystem Markdown page under `src/content/docs/robots/robot-1/` or `robot-2/`. Use `templates/subsystem.md` for new mechanisms. Explain assumptions and units, add lightweight preview images with alt text, link native CAD in versioned external storage, cite test evidence, and update the design history or ADR when choices change. Review the public visibility checklist in the pull request template.

## File and privacy conventions

- Store Markdown and optimized preview images in this repository. Store large native CAD assemblies, videos, and sensitive code in separate appropriately permissioned repositories or storage. Link only public-approved exports.
- Git history preserves changes, but public deletion does not reliably erase previously published secrets. Review before merging.
- Keep one season's historical pages when the next season begins; add a new season namespace or archive index without rewriting old decisions.
- Search, themes, mobile navigation, code blocks, tables, and GitHub edit links use Starlight. For equations use Starlight-supported Markdown/LaTeX syntax and check the rendered result.
