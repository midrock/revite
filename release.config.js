module.exports = {
  branches: [
    'release',
  ],
  ci: false,
  plugins: [
    '@semantic-release/commit-analyzer',
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

        npmPublish: true,
      },
    ],
    '@semantic-release/git',
  ],
}
