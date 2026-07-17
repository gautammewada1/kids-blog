import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

// Automatically scan public/audio recursively and generate src/audio-manifest.ts
function generateAudioManifest() {
  const publicAudioDir = path.resolve(__dirname, 'public/audio');
  const manifestPath = path.resolve(__dirname, 'src/audio-manifest.ts');

  function scan(dir: string, filesList: string[] = []): string[] {
    if (!fs.existsSync(dir)) return filesList;
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        scan(fullPath, filesList);
      } else if (item.toLowerCase().endsWith('.mp3')) {
        const relPath = path.relative(__dirname, fullPath).replace(/\\/g, '/');
        filesList.push(relPath);
      }
    }
    return filesList;
  }

  const mp3Files = scan(publicAudioDir);
  const content = `// This file is auto-generated during Vite config loading. Do not edit manually.
export const AUDIO_FILES: string[] = ${JSON.stringify(mp3Files, null, 2)};
`;
  fs.writeFileSync(manifestPath, content, 'utf-8');
  console.log(`[Audio Manifest] Detected ${mp3Files.length} MP3 files in public/audio/`);
}

generateAudioManifest();

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
