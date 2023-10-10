module.exports = {
  branches: [
    'release',
  ],
  ci: false,
  plugins: [
    ['@semantic-release/commit-analyzer', {
      preset: 'angular',
      releaseRules: [
        { type: 'docs', scope: 'README', release: 'patch' },
        { type: 'refactor', release: 'patch' },
        { type: 'style', release: 'patch' },
        { type: 'fix', release: 'patch' },
      ],
    }],
    '@semantic-release/release-notes-generator',
    '@semantic-release/git',
    [
      '@semantic-release/changelog',
      {
        changelogTitle: '# Changelog',
      },
    ],
    [
      '@semantic-release/npm',
      {
        pkgRoot: './dist',
        npmPublish: true,
      },
    ],
    '@semantic-release/git',
  ],
}
