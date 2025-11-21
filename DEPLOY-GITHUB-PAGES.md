# Como Fazer Deploy no GitHub Pages

## Problema: Página em Branco

Se sua página está em branco em `https://juuhdovale-git.github.io/VidaPlus_Uninter_SHSS/`, é porque o base path não está configurado corretamente.

## ✅ Solução Aplicada

Já foram feitas as seguintes correções:

1. **`vite.config.ts`** - Adicionado `base: '/VidaPlus_Uninter_SHSS/'`
2. **`src/App.tsx`** - Adicionado `basename="/VidaPlus_Uninter_SHSS"` no BrowserRouter
3. **Scripts de build** - Criado `build:github` e `deploy`

## 🚀 Como Fazer Deploy

### Método 1: Script Automático (Recomendado)

```powershell
npm run deploy
```

Este comando:
1. Faz o build com o base path correto
2. Adiciona os arquivos ao Git
3. Faz commit
4. Faz push para o GitHub

### Método 2: Manual Passo a Passo

#### 1. Fazer o Build

```powershell
npm run build:github
```

Isso cria a pasta `dist/` com os arquivos otimizados e o base path correto.

#### 2. Verificar se o build foi criado

```powershell
# Verificar se a pasta dist existe e tem arquivos
Get-ChildItem dist
```

Você deve ver:
- `index.html`
- `assets/` (com os arquivos JS e CSS)

#### 3. Adicionar ao Git

```powershell
git add dist
git commit -m "Deploy: atualizar build para GitHub Pages"
```

#### 4. Enviar para GitHub

```powershell
git push origin main
```

## ⚙️ Configuração do GitHub Pages

No repositório GitHub:

1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione:
   - **Branch**: `main`
   - **Folder**: `/ (root)` ou `/dist` (dependendo da configuração)
3. Salve

**Nota**: Se você configurou para usar a pasta `dist`, você precisa fazer o deploy da pasta `dist` para a branch `gh-pages` ou usar GitHub Actions.

## 🔧 Configuração Alternativa: Usar GitHub Actions

Se preferir automatizar completamente, crie `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build:github
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🐛 Verificar se Está Funcionando

1. **Acesse**: https://juuhdovale-git.github.io/VidaPlus_Uninter_SHSS/
2. **Abra o Console do Navegador** (F12)
3. **Verifique se há erros**:
   - Se houver erros 404, o base path está errado
   - Se houver erros de JavaScript, verifique o build

## 📝 Checklist

- [ ] `vite.config.ts` tem `base: '/VidaPlus_Uninter_SHSS/'`
- [ ] `src/App.tsx` tem `basename="/VidaPlus_Uninter_SHSS"`
- [ ] Build foi feito com `npm run build:github`
- [ ] Pasta `dist/` foi adicionada ao Git
- [ ] Commit foi feito
- [ ] Push foi feito para `main`
- [ ] GitHub Pages está configurado corretamente

## 🔍 Troubleshooting

### Página ainda em branco?

1. **Limpe o cache do navegador**: Ctrl + Shift + R
2. **Verifique o Console**: Pressione F12 e veja se há erros
3. **Verifique os arquivos**: Acesse diretamente:
   - https://juuhdovale-git.github.io/VidaPlus_Uninter_SHSS/index.html
   - https://juuhdovale-git.github.io/VidaPlus_Uninter_SHSS/assets/index-*.js

### Erro 404 nos assets?

O base path não está correto. Verifique:
- `vite.config.ts` tem o base correto
- Refaça o build: `npm run build:github`

### Build não funciona?

```powershell
# Limpar e reinstalar
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run build:github
```

## 📚 Referências

- [Vite - Base Public Path](https://vitejs.dev/config/shared-options.html#base)
- [React Router - Basename](https://reactrouter.com/en/main/router-components/browser-router#basename)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

