import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Set GITHUB_REPOSITORY=verified-org/verified-org.github.io for production.
const repository = process.env.GITHUB_REPOSITORY;
const [owner, repo] = repository?.split('/') ?? [];
const pagesHost = owner?.toLowerCase();
const isRootPagesRepo = repo?.toLowerCase() === `${pagesHost}.github.io`;

export default defineConfig({
  site: owner ? `https://${pagesHost}.github.io` : 'https://example.org',
  base: owner && !isRootPagesRepo ? `/${repo}` : '/',
  markdown: { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] },
  integrations: [
    starlight({
      title: 'VEX27 Engineering Hub',
      description: 'Engineering records, robot documentation, and team knowledge for VEX27.',
      logo: { src: './src/assets/mark.svg', alt: 'VEX27' },
      social: owner ? [{ icon: 'github', label: 'GitHub repository', href: `https://github.com/${repository}` }] : [],
      editLink: owner ? { baseUrl: `https://github.com/${repository}/edit/main/` } : undefined,
      customCss: ['katex/dist/katex.min.css', './src/styles/custom.css'],
      sidebar: [
        { label: 'Home / Dashboard', link: '/' },
        { label: 'Robot 1', autogenerate: { directory: 'robots/robot-1', collapsed: true } },
        { label: 'Robot 2', autogenerate: { directory: 'robots/robot-2', collapsed: true } },
        { label: 'Team Members', autogenerate: { directory: 'team', collapsed: true } },
        { label: 'Research & Ideas', autogenerate: { directory: 'research', collapsed: true } },
        { label: 'Project Management', autogenerate: { directory: 'management', collapsed: true } },
        { label: 'Resources', autogenerate: { directory: 'resources', collapsed: true } },
      ],
    }),
  ],
});
