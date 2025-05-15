import { execSync } from 'child_process'

try {
    console.log('🔧 Iniciando build...')
    execSync('npm run build', { stdio: 'inherit' })

    console.log('executing >>> git add .')
    execSync('git add .', { stdio: 'inherit' })

    console.log('executing >>> git commit -m "simple deploy command"')
    execSync('git commit -m "simple deploy command"', { stdio: 'inherit' })

    console.log('executing >>> git push')
    execSync('git push', { stdio: 'inherit' })

    console.log('🚀 Deploy simples concluído com sucesso.')
} catch (e) {
    console.error('❌ Erro no processo de deploy:', e.message)
    process.exit(1)
}