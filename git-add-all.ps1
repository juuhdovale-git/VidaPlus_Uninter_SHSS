# Script para adicionar TODOS os arquivos do projeto ao Git
# Garante que estamos no diretório correto e adiciona todas as pastas

Write-Host "=== Adicionando TODOS os arquivos do projeto ao Git ===" -ForegroundColor Cyan

# Verificar se estamos no diretório correto
if (-not (Test-Path "package.json")) {
    Write-Host "ERRO: Não encontrado package.json!" -ForegroundColor Red
    Write-Host "Execute este script no diretório do projeto SGHSS - VidaPlus" -ForegroundColor Yellow
    Write-Host "Diretório atual: $(Get-Location)" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Diretório correto encontrado!" -ForegroundColor Green
Write-Host "Diretório: $(Get-Location)" -ForegroundColor Gray

# Verificar se é um repositório git
if (-not (Test-Path ".git")) {
    Write-Host "`nInicializando repositório Git..." -ForegroundColor Yellow
    git init
}

# Verificar remote
$remote = git remote -v
if (-not $remote) {
    Write-Host "`nConfigurando remote 'origin'..." -ForegroundColor Yellow
    git remote add origin https://github.com/juuhdovale-git/VidaPlus_Uninter_SHSS.git
} else {
    Write-Host "`nRemote configurado:" -ForegroundColor Cyan
    git remote -v
}

# Mostrar arquivos que serão adicionados
Write-Host "`n=== Arquivos do projeto que serão adicionados ===" -ForegroundColor Cyan
Write-Host "`nArquivos de configuração:" -ForegroundColor Yellow
Get-ChildItem -File -Filter "*.json","*.js","*.ts","*.md","*.html","*.css" -Exclude "package-lock.json" | Select-Object Name

Write-Host "`nPastas principais:" -ForegroundColor Yellow
Get-ChildItem -Directory -Exclude "node_modules","dist",".git" | Select-Object Name

# Adicionar TODOS os arquivos (exceto os ignorados pelo .gitignore)
Write-Host "`n=== Adicionando arquivos ao Git ===" -ForegroundColor Cyan

# Adicionar pastas e arquivos específicos
Write-Host "Adicionando src/..." -ForegroundColor Gray
git add src/

Write-Host "Adicionando public/..." -ForegroundColor Gray
if (Test-Path "public") { git add public/ }

Write-Host "Adicionando arquivos de configuração..." -ForegroundColor Gray
git add package.json
git add package-lock.json
git add README.md
git add .gitignore
git add *.json
git add *.js
git add *.ts
git add *.config.js
git add index.html
git add vite.config.ts
git add tsconfig.json
git add tsconfig.node.json
git add tailwind.config.js
git add postcss.config.js

# Adicionar outros arquivos importantes
if (Test-Path "GIT-SOLUCAO.md") { git add GIT-SOLUCAO.md }
if (Test-Path "ADICIONAR-TODOS-ARQUIVOS.md") { git add ADICIONAR-TODOS-ARQUIVOS.md }
if (Test-Path "git-sync.ps1") { git add git-sync.ps1 }
if (Test-Path "git-add-all.ps1") { git add git-add-all.ps1 }

# Adicionar qualquer outro arquivo restante
Write-Host "Adicionando outros arquivos..." -ForegroundColor Gray
git add .

# Mostrar status
Write-Host "`n=== Status após adicionar ===" -ForegroundColor Cyan
git status --short | Select-Object -First 30

# Contar arquivos adicionados
$stagedFiles = (git diff --cached --name-only).Count
Write-Host "`n✅ $stagedFiles arquivos adicionados ao staging" -ForegroundColor Green

# Listar principais arquivos adicionados
Write-Host "`n=== Principais arquivos/pastas adicionados ===" -ForegroundColor Cyan
git diff --cached --name-only | Select-Object -First 20

# Fazer commit
Write-Host "`n=== Fazendo commit ===" -ForegroundColor Cyan
$commitMessage = "Adicionar todos os arquivos do projeto: src, public, configurações e documentação"
git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit realizado com sucesso!" -ForegroundColor Green
    Write-Host "`nPróximos passos:" -ForegroundColor Yellow
    Write-Host "1. git pull origin main --rebase  (sincronizar com remoto)" -ForegroundColor White
    Write-Host "2. git push -u origin main        (enviar para GitHub)" -ForegroundColor White
} else {
    Write-Host "⚠️  Nenhuma mudança para commitar ou erro no commit" -ForegroundColor Yellow
}

