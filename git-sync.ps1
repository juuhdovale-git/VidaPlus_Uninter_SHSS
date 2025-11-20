# Script para sincronizar com o repositório remoto
# Resolve o erro: Updates were rejected because the remote contains work that you do not have locally

Write-Host "=== Sincronização Git ===" -ForegroundColor Cyan

# Verificar se estamos em um repositório git
if (-not (Test-Path ".git")) {
    Write-Host "ERRO: Não é um repositório Git!" -ForegroundColor Red
    Write-Host "Execute este script no diretório do projeto." -ForegroundColor Yellow
    exit 1
}

# Verificar se há remote configurado
$remote = git remote -v
if (-not $remote) {
    Write-Host "Configurando remote 'origin'..." -ForegroundColor Yellow
    git remote add origin https://github.com/juuhdovale-git/VidaPlus_Uninter_SHSS.git
}

# Verificar status
Write-Host "`nVerificando status..." -ForegroundColor Cyan
git status --short

# Adicionar todos os arquivos modificados
Write-Host "`nAdicionando arquivos ao staging..." -ForegroundColor Cyan
git add .

# Fazer commit se houver mudanças
$status = git status --porcelain
if ($status) {
    Write-Host "`nFazendo commit das mudanças..." -ForegroundColor Cyan
    git commit -m "Atualização: adicionados dados reais e informações da desenvolvedora"
}

# Fazer pull com rebase para integrar mudanças remotas
Write-Host "`nSincronizando com o repositório remoto (pull)..." -ForegroundColor Cyan
git pull origin main --rebase

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nAVISO: Pode haver conflitos. Verifique e resolva antes de continuar." -ForegroundColor Yellow
    Write-Host "Após resolver conflitos, execute: git rebase --continue" -ForegroundColor Yellow
    exit 1
}

# Fazer push
Write-Host "`nEnviando mudanças para o repositório remoto (push)..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Sincronização concluída com sucesso!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Erro ao fazer push. Verifique as mensagens acima." -ForegroundColor Red
}

