#!/bin/bash
# === AUTO COMMIT E PUSH EM TEMPO REAL ===
# Monitora mudanças e envia automaticamente pro GitHub

REPO_DIR="$(git rev-parse --show-toplevel)"
cd "$REPO_DIR" || exit

BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "🚀 Monitorando alterações no diretório: $REPO_DIR"
echo "📦 Branch atual: $BRANCH"
echo "🔁 Iniciando auto commit + push..."

while true; do
    # Escuta qualquer alteração em arquivos
    inotifywait -r -e modify,create,delete,move --exclude '\.git' "$REPO_DIR" > /dev/null 2>&1

    # Adiciona, commita e envia pro GitHub
    git add .

    # Só commita se houver algo pra commitar
    if ! git diff --cached --quiet; then
        COMMIT_MSG="Auto commit: $(date '+%Y-%m-%d %H:%M:%S')"
        git commit -m "$COMMIT_MSG"
        git push origin "$BRANCH"
        echo "✅ $COMMIT_MSG — enviado para o GitHub!"
    else
        echo "ℹ️ Nenhuma mudança detectada."
    fi

    # Pequena pausa antes de continuar o loop
    sleep 2
done
#!/bin/bash

while true; do
    # Verifica se há mudanças
    if [[ -n $(git status --porcelain) ]]; then
        echo "🔄 Mudanças detectadas, enviando commit..."
        git add .
        git commit -m "Auto update $(date '+%Y-%m-%d %H:%M:%S')" >/dev/null 2>&1
        git push >/dev/null 2>&1
        echo "✅ Commit e push feitos!"
    fi
    # Verifica a cada 60 segundos (você pode mudar esse tempo)
    sleep 60
done
#!/bin/bash

while true; do
    # Verifica se há mudanças
    if [[ -n $(git status --porcelain) ]]; then
        echo "🔄 Mudanças detectadas, enviando commit..."
        git add .
        git commit -m "Auto update $(date '+%Y-%m-%d %H:%M:%S')" >/dev/null 2>&1
        git push >/dev/null 2>&1
        echo "✅ Commit e push feitos!"
    fi
    # Verifica a cada 60 segundos (você pode mudar esse tempo)
    sleep 60
done
#!/bin/bash

while true; do
    # Verifica se há mudanças
    if [[ -n $(git status --porcelain) ]]; then
        echo "🔄 Mudanças detectadas, enviando commit..."
        git add .
        git commit -m "Auto update $(date '+%Y-%m-%d %H:%M:%S')" >/dev/null 2>&1
        git push >/dev/null 2>&1
        echo "✅ Commit e push feitos!"
    fi
    # Verifica a cada 60 segundos (você pode mudar esse tempo)
    sleep 60
done
