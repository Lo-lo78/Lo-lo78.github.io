# Lo-lo Audio Software website — 7 projects

Official website: https://lo-lo78.github.io/  
Website repository: https://github.com/Lo-lo78/Lo-lo78.github.io

## Projects

- LJuno-116
- LB-303
- LR-608
- LSampler-24
- LReaParams
- Biscot1 Synth (`Biscot1-Synth`)
- LSpectrum 4.5dB Analyzer (`LSpectrum`)

## Publishing this website

This is a static HTML/CSS/JavaScript website. Keep all the files in the **root** of the website repository (including `.nojekyll`). Do not introduce an enclosing directory when extracting the ZIP.

In **Settings → Pages → Build and deployment**, use **Deploy from a branch**, branch `main`, root folder `/(root)`, as with the existing website.

## Automatic release updates and download counts

The site now uses the public GitHub REST endpoint `GET /repos/Lo-lo78/REPOSITORY/releases?per_page=100&page=N` when a visitor opens the site. This single source gives both:

1. The newest **published, non-prerelease** GitHub release and the matching Windows download button (direct binary ZIP, or the release page as a fallback).
2. **Cumulative Windows package downloads** across all published non-prerelease GitHub releases, using the `download_count` field of the preferred Windows binary asset for each release.

It fetches additional release pages only when a repository contains more than 100 releases. It never counts GitHub's auto-generated ZIP/tarballs of the source code and never invents a counter value. A repository with no releases shows 0; when the GitHub API fails or is rate-limited, the count is shown as unavailable.

**Important:** GitHub counts asset downloads from anywhere, not only from this website. A downloaded package is a download, not a distinct person. Releases created as GitHub **Actions artifacts** but not attached to a **GitHub Release** are not counted.

After a new stable release is published, refreshing the website fetches the new version and total again (subject to GitHub API availability and caching). No access token, extra job, database, analytics, or third-party tracking is necessary.

Recognized Windows archive naming:
- Most VST3 projects, including LSpectrum: `*.vst3.zip` or a `.zip` name containing `vst3`.
- Biscot1 Synth: `Biscot1.Synth-*-Windows-x64.zip`.
- LReaParams: Windows x64 Setup ZIP/EXE.

If you change the packaging conventions, update `chooseWindowsAsset()` in `script.js`.

## Accessibility

Italian and English localizations, keyboard navigation, visible focus, semantic headings, landmarks, and no additional live-region announcements for download totals. The site does not require external JavaScript frameworks.
