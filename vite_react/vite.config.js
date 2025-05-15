import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import fs from 'fs-extra'
import { existsSync, rmSync } from 'node:fs';

// Emulate __dirname in ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    {
      name: 'clean-root-assets-and-index',
      apply: 'build',
      buildStart() {
        try {
          if (existsSync('../assets')) {
            rmSync('../assets', { recursive: true, force: true });
            console.log('Deleted assets folder.');
          } else {
            console.log('No assets folder found, skipping delete.');
          }

          if (existsSync('../index.html')) {
            rmSync('../index.html', { force: true });
            console.log('Deleted index.html file.');
          } else {
            console.log('No index.html file found, skipping delete.');
          }
        } catch (e) {
          console.warn('Error cleaning files:', e);
        }
      },
    },
    {
      name: 'move-dist-to-parent',
      apply: 'build',
      closeBundle: async () => {
        const distPath = resolve(__dirname, 'dist')
        const targetPath = resolve(__dirname, '..')

        if (await fs.pathExists(distPath)) {
          console.log('[move-dist-to-parent] Moving build output to parent directory...')
          await fs.copy(distPath, targetPath, { overwrite: true })
          await fs.remove(distPath)
          console.log('[move-dist-to-parent] Done.')
        } else {
          console.warn('[move-dist-to-parent] dist folder not found.')
        }
      }
    }
  ],
})
