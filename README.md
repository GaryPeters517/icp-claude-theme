# ICP Modern Sports Search theme for Claude

`icp-brand` themes Claude in the ICP Modern Sports Search brand, following the ICP design system:

- **Colours, light and dark.** Light mode uses white and a faint mint ground with pitch (`#132d25`) and slate text. Dark mode uses a pitch ground with white text. ICP Green (`#17a95e`) is the accent and Floodlight (`#80ef80`) marks success.
- **Logo.** A slim pitch strip above the message box carries the official reverse ICP lockup (white mark, ICP Green star). In a terminal it shows a plain "ICP · MODERN SPORTS SEARCH" line instead.
- **Matchday Amber (`#ffb43c`), used rarely.** A small amber dot with "Live" appears on the pitch strip only while Claude is working. Amber is never used as a background.
- **Tagline.** "Trusted Search for Modern Sport" sits in the status line.

The colour theme and logo strip draw in the Claude desktop and mobile apps. Fonts are not changed: mods can't set the app's typeface, so Nudista and Archivo aren't applied.

## Install

This repository is private. To install, you need read access to it on GitHub, and your computer needs a git credential for github.com (an SSH key, or `gh auth login` then `gh auth setup-git`).

At the prompt of a Claude Code terminal session:

```
/plugin install icp-brand --marketplace GaryPeters517/icp-claude-theme
```

Answer `y` to add the marketplace, then pick a scope (user scope loads it in every session).

From a shell:

```bash
claude plugin install icp-brand --marketplace GaryPeters517/icp-claude-theme
```

In the desktop app, where `/plugin` doesn't run: click + next to the prompt box, then Plugins, Add marketplace with `GaryPeters517/icp-claude-theme`, then Add plugin.
