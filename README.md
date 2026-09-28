# sajaldevx — portfolio

Personal site of [Sajal Kumar Jana](https://github.com/SajalDevX): Android & backend engineer, founding engineer at PrepAiro, benchmark task author for AfterQuery and Handshake.

Built with React 19, TypeScript, Vite and Tailwind 4 on a Catppuccin palette.

## Content lives in `src/config/`

| File | What it holds |
|---|---|
| `common.ts` | name, handle, outbound links (GitHub, LinkedIn, email, resume, Play Store) |
| `pages.ts` | experience timeline |
| `projects.ts` | projects — description, highlights, links; cover images come from GitHub's OpenGraph service |
| `posts.ts` | blog posts (empty until something is written) |
| `navItems.ts` | header / sidebar navigation |

Live widgets on the home page (recent commits, language mix, upstream pull-request counts, repo stars) read the public GitHub API unauthenticated via `src/lib/github.ts`, cache in `sessionStorage` for ten minutes, and degrade quietly on rate limits.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle in dist/
```
