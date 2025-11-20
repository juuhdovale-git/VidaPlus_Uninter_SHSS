# Solução para o Erro de Git Push

## Problema
```
error: failed to push some refs to 'https://github.com/juuhdovale-git/VidaPlus_Uninter_SHSS.git'
hint: Updates were rejected because the remote contains work that you do not have locally.
```

## Solução

O repositório remoto tem mudanças que não estão no seu repositório local. Você precisa sincronizar primeiro.

### Opção 1: Usar o Script Automático

Execute no PowerShell (no diretório do projeto):
```powershell
.\git-sync.ps1
```

### Opção 2: Comandos Manuais

Execute os seguintes comandos no terminal, **no diretório do projeto**:

1. **Adicionar todos os arquivos modificados:**
```powershell
git add .
```

2. **Fazer commit das mudanças:**
```powershell
git commit -m "Atualização: adicionados dados reais e informações da desenvolvedora"
```

3. **Sincronizar com o remoto (pull com rebase):**
```powershell
git pull origin main --rebase
```

4. **Se houver conflitos**, resolva-os e continue:
```powershell
git rebase --continue
```

5. **Enviar para o remoto:**
```powershell
git push -u origin main
```

### Opção 3: Pull e Merge (Alternativa)

Se preferir usar merge ao invés de rebase:

```powershell
git add .
git commit -m "Atualização: adicionados dados reais e informações da desenvolvedora"
git pull origin main
git push -u origin main
```

## Verificar Status

Para verificar o status do repositório:
```powershell
git status
```

Para verificar o remote configurado:
```powershell
git remote -v
```

## Nota Importante

Certifique-se de estar no diretório correto do projeto antes de executar os comandos. O diretório deve conter os arquivos `package.json`, `src/`, etc.

