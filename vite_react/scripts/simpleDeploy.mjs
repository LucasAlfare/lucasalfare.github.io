import { build } from 'vite'
import { execSync } from 'child_process'
import { chdir } from 'process'
import { resolve } from 'path'

async function simpleDeploy() {
  try {
    console.log('🔧 Iniciando build...')
    await build()

    // Muda para a raiz do projeto (um nível acima da pasta vite/scripts)
    const repoRoot = resolve(process.cwd(), '..')
    chdir(repoRoot)
    console.log(`📂 Diretório atual: ${process.cwd()}`)

    // Apenas para debug: veja se o git reconhece algo
    console.log('🧪 git status:')
    console.log(execSync('git status', { encoding: 'utf8' }))

    // Agora os comandos Git funcionarão corretamente
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
}

simpleDeploy()