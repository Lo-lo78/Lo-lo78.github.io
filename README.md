# Lo-lo Audio Software website

Official GitHub Pages website for six Lo-lo78 audio projects:

- LJuno-116
- LB-303
- LR-608
- LSampler-24
- LReaParams
- Biscot1 Synth (`Biscot1-Synth`)

## Publishing

This site is plain HTML, CSS and JavaScript; no build dependencies required.

GitHub repository: `Lo-lo78/Lo-lo78.github.io`.

In **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/(root)**, and save.

Website: https://lo-lo78.github.io/

## Automatic release updates

The site reads `https://api.github.com/repos/Lo-lo78/REPOSITORY/releases/latest` for each product whenever a visitor opens the page. Version and publication date are shown; the download button selects the Windows VST3 ZIP for instruments (including Biscot1 Synth’s `Biscot1.Synth-*-Windows-x64.zip` naming), or the Windows x64 Setup ZIP for LReaParams, from that release’s assets and downloads it directly. If the expected asset is missing, the button opens the release page instead. No manual edits are needed when a new non-prerelease GitHub release is published. If GitHub API requests fail or are rate-limited, the button falls back to `/releases/latest`, which GitHub maintains automatically.

## Accessibility

Semantic HTML, explicit headings and landmarks, keyboard navigation, visible focus, skip link, language selection, live region for release statuses, reduced-motion support. English and Italian translations built in.

## Direct binary downloads

Asset detection uses the `assets` array in the GitHub Releases API. Four VST3 projects prefer `*.vst3.zip`; Biscot1 Synth uses `Biscot1.Synth-*-Windows-x64.zip`; LReaParams prefers `*Windows*x64*Setup*.zip`. Do not rename files unpredictably, or the site may revert to the release page for safety. The browser may display a download confirmation depending on its settings.
