// Script para fazer deploy no GitHub Pages
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando deploy para GitHub Pages...\n');

// Verificar se o build foi feito
if (!fs.existsSync('dist')) {
  console.error('❌ Erro: Pasta dist não encontrada!');
  console.log('Execute: npm run build:github');
  process.exit(1);
}

try {
  // Verificar se estamos em um repositório git
  execSync('git status', { stdio: 'ignore' });
  
  console.log('✅ Repositório Git encontrado');
  
  // Adicionar dist ao git
  console.log('📦 Adicionando arquivos de build...');
  execSync('git add dist', { stdio: 'inherit' });
  
  // Fazer commit
  console.log('💾 Fazendo commit...');
  execSync('git commit -m "Deploy: atualizar build para GitHub Pages"', { stdio: 'inherit' });
  
  // Fazer push
  console.log('📤 Enviando para GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });
  
  console.log('\n✅ Deploy concluído com sucesso!');
  console.log('🌐 Acesse: https://juuhdovale-git.github.io/VidaPlus_Uninter_SHSS/');
  console.log('\n⚠️  Nota: Pode levar alguns minutos para o GitHub Pages atualizar.');
  
} catch (error) {
  console.error('❌ Erro durante o deploy:', error.message);
  console.log('\n📝 Instruções manuais:');
  console.log('1. git add dist');
  console.log('2. git commit -m "Deploy: atualizar build"');
  console.log('3. git push origin main');
  process.exit(1);
}

