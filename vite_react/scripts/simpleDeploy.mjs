import { build } from 'vite'
import { execSync } from 'child_process'

async function simpleDeploy() {
    try {
        console.log('🔧 Iniciando build via Vite API...')
        await build() // Aguarda corretamente TODOS os plugins e efeitos

        console.log('✅ Build finalizado. Enviando para o Git...')
        execSync('git add .', { stdio: 'inherit' })
        execSync('git commit -m "simple deploy command"', { stdio: 'inherit' })
        execSync('git push', { stdio: 'inherit' })

        console.log('🚀 Deploy simples concluído com sucesso.')
    } catch (e) {
        console.error('❌ Erro no processo de deploy:', e)
        process.exit(1)
    }
}

simpleDeploy()