# Game Feel vs Web Layout

Scenes must feel like HUD over a game world (diegetic / non-diegetic / meta), not web landing pages.

## Principles

- **Playfield first**: `game-world` sits behind all UI; the player should sense a space, not a document.
- **Edge anchors**: Use `hud-anchor-tl/tr/bl/br/bc/tc` — avoid `max-width` centered columns and vertical blog stacks.
- **Anti-web chrome**: Prefer brackets, vignette, letterbox over Material card stacks and SaaS spacing.
- **Damage feedback**: Meta vignette flash (`#vignette.on` for ~400ms) on player damage where applicable.

## Implementation

Shared layer: `demo/lib/game-feel.css` — import after `components.css` in every scene.

Structure:

```html
<div class="game-root letterbox">
  <div class="game-world has-grid"></div> <!-- omit has-grid when grid fights style -->
  <div class="meta-vignette" id="vignette"></div>
  <div class="game-hud">…</div>
</div>
```

Refs: Fagerholt & Lorentzon 2009 (diegetic UI); Gamasutra diegesis articles; Unity immersion UI guidance.
