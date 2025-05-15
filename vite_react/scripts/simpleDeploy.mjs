import { build } from 'vite'
import { execSync } from 'child_process'
import { chdir } from 'process'
import { resolve } from 'path'

// I set this as a NPM script, in [package.json]. So I can just call "npm run simpleDeploy"
async function performSimpleDeploy() {
    try {
        console.log('🔧 Initializing simple deploy...')
        await build()

        // first I have to change the directory to make git commands, wtf?
        const repoRoot = resolve(process.cwd(), '..')
        chdir(repoRoot)
        console.log(`📂 Current folder: ${process.cwd()}`)

        console.log('executing >>> git add .')
        execSync('git add .', { stdio: 'inherit' })

        console.log('executing >>> git commit -m "simple deploy command"')
        execSync('git commit -m "simple deploy command"', { stdio: 'inherit' })

        console.log('executing >>> git push')
        execSync('git push', { stdio: 'inherit' })

        console.log('🚀 Simple deploy finished.')
    } catch (e) {
        console.error('❌ Error on deploy:', e.message)
        process.exit(1)
    }
}

performSimpleDeploy() // just call the function!