import { execSync } from 'child_process'

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function deploy() {
    try {
        console.log('🔧 Iniciando build...')
        execSync('npm run build', { stdio: 'inherit' })

        // Espera 2 segundos para garantir que o sistema de arquivos tenha atualizado
        console.log('⏳ Esperando arquivos serem movidos...')
        await sleep(2000)

        console.log('executing >>> git add .')
        execSync('git add .', { stdio: 'inherit' })
        console.log('⏳ Esperando adicionar modificações no git...')
        await sleep(2000)

        console.log('executing >>> git commit -m "simple deploy command"')
        execSync('git commit -m "simple deploy command"', { stdio: 'inherit' })

        console.log('executing >>> git push')
        execSync('git push', { stdio: 'inherit' })

        console.log('🚀 Deploy simples concluído com sucesso.')
    } catch (e) {
        console.error('❌ Erro no processo de deploy:', e.message)
        process.exit(1)
    }
}

deploy()