/**
 * Builds the demo preview into `out/`: `next build` already exports the site
 * (`output: "export"` in `next.config.ts`), and this forces the demo flag on
 * so every service answers from `src/services/demo-data` — plain HTML/CSS/JS
 * with no server and no API calls.
 *
 * Sets the variable here rather than inline in `package.json`, because
 * `VAR=value command` is POSIX-only and fails on Windows.
 */
import { spawnSync } from "node:child_process";

const { status } = spawnSync("next", ["build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, NEXT_PUBLIC_DEMO_MODE: "true" },
});

process.exit(status ?? 1);
