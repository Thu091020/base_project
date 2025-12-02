import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const colorsJsonPath = path.resolve(
    __dirname,
    '../src/foundations/styles/colors.json',
  );
  const outputDir = path.resolve(__dirname, '../src/foundations/styles');
  const cssOutputPath = path.join(outputDir, 'generated-colors.css');
  const tailwindColorsPath = path.join(outputDir, 'tailwind-colors.mjs');

  const raw = await readFile(colorsJsonPath, 'utf-8');
  const data = JSON.parse(raw);

  const light = data.light ?? {};
  const dark = data.dark ?? {};

  const toCssVars = (obj) =>
    Object.entries(obj)
      .map(([key, value]) => `  --color-${key}: ${value};`)
      .join('\n');

  const css = `/* This file is generated. DO NOT EDIT.
 * Run "npm run generate:colors" or "yarn generate:colors" after changing colors.json.
 */

:root {
${toCssVars(light)}
}

.dark {
${toCssVars(dark)}
}
`;

  await mkdir(outputDir, { recursive: true });
  await writeFile(cssOutputPath, css, 'utf-8');

  const tailwindColors = `// This file is generated from "colors.json". DO NOT EDIT.
// Run "npm run generate:colors" after changing colors.json.

const colors = {
${Object.keys(light)
  .map((key) => `  '${key}': 'var(--color-${key})',`)
  .join('\n')}
};

export default colors;
`;

  await writeFile(tailwindColorsPath, tailwindColors, 'utf-8');

  // eslint-disable-next-line no-console
  console.log(`Generated ${cssOutputPath}`);
  // eslint-disable-next-line no-console
  console.log(`Generated ${tailwindColorsPath}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to generate colors CSS:', err);
  process.exitCode = 1;
});


