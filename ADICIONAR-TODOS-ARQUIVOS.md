# Como Adicionar TODAS as Pastas e Arquivos ao Git

## Problema
Apenas a pasta `src/` foi enviada, mas você precisa adicionar todas as pastas do projeto.

## Solução Rápida

Execute no PowerShell, **no diretório do projeto**:

```powershell
.\git-add-all.ps1
```

## Solução Manual Passo a Passo

### 1. Certifique-se de estar no diretório correto

O diretório deve conter `package.json`, `src/`, `public/`, etc.

```powershell
# Verificar se está no diretório correto
Test-Path "package.json"
# Deve retornar: True
```

### 2. Verificar o que será adicionado

```powershell
# Ver arquivos que serão adicionados (não ignorados)
git status
```

### 3. Adicionar TODOS os arquivos

```powershell
# Adiciona todos os arquivos (respeitando .gitignore)
git add .

# OU adicionar pastas específicas:
git add src/
git add public/
git add package.json
git add package-lock.json
git add README.md
git add *.json
git add *.js
git add *.ts
git add *.config.js
git add index.html
```

### 4. Verificar o que foi adicionado

```powershell
# Ver status após adicionar
git status --short
```

Você deve ver:
- `src/` (todos os arquivos)
- `public/` (se houver arquivos)
- `package.json`
- `package-lock.json`
- `README.md`
- `vite.config.ts`
- `tsconfig.json`
- `tailwind.config.js`
- `postcss.config.js`
- `index.html`
- E outros arquivos de configuração

### 5. Fazer commit

```powershell
git commit -m "Adicionar todos os arquivos do projeto: src, public, configurações e documentação"
```

### 6. Sincronizar e enviar

```powershell
# Sincronizar com remoto
git pull origin main --rebase

# Enviar para GitHub
git push -u origin main
```

## Arquivos que DEVEM ser adicionados

✅ **Devem ser adicionados:**
- `src/` (toda a pasta)
- `public/` (toda a pasta, se existir)
- `package.json`
- `package-lock.json`
- `README.md`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`
- `tailwind.config.js`
- `postcss.config.js`
- `index.html`
- `.gitignore`
- Arquivos de configuração do projeto

❌ **NÃO devem ser adicionados (já no .gitignore):**
- `node_modules/`
- `dist/`
- Arquivos de log
- Arquivos do editor (.vscode, .idea)

## Verificar se tudo foi adicionado

```powershell
# Ver todos os arquivos que serão commitados
git ls-files

# Verificar se as pastas principais estão incluídas
git ls-files | Select-String -Pattern "^src/|^public/|package.json|README.md"
```

## Se ainda não funcionar

1. **Verificar se o .gitignore está correto:**
```powershell
Get-Content .gitignore
```

2. **Forçar adição de arquivos específicos (mesmo se ignorados):**
```powershell
git add -f public/
git add -f src/
```

3. **Verificar se há um repositório git no diretório correto:**
```powershell
Test-Path ".git"
# Deve retornar: True
```

## Comandos Úteis

```powershell
# Ver o que está sendo rastreado
git ls-files

# Ver o que está no staging
git diff --cached --name-only

# Ver tamanho do repositório
git count-objects -vH
```

