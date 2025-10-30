#!/bin/bash
# === AUTO COMMIT CONTÍNUO ===
# Observa alterações e faz commit+push automático

REPO_PATH="/workspaces/forms"
BRANCH="main"
LOG_FILE="$REPO_PATH/auto-commit.log"

cd "$REPO_PATH" || exit
echo "👀 Monitorando alterações em: $REPO_PATH (branch: $BRANCH)"
echo "📜 Logs em: $LOG_FILE"
echo "------------------------------------------" >> "$LOG_FILE"

while true; do
    # Espera mudanças em arquivos (ignora .git)
    inotifywait -r -e modify,create,delete,move --exclude '\.git/' "$REPO_PATH" >/dev/null 2>&1

    # Quando algo muda:
    echo "🔧 Alterações detectadas em $(date '+%H:%M:%S')" | tee -a "$LOG_FILE"

    git add .

    # Evita commit vazio
    if git diff --cached --quiet; then
        echo "⚠️ Nenhuma modificação para commit." | tee -a "$LOG_FILE"
        continue
    fi

    MESSAGE="🪄 Auto commit: $(date '+%Y-%m-%d %H:%M:%S')"
    git commit -m "$MESSAGE" >> "$LOG_FILE" 2>&1
    git push origin "$BRANCH" >> "$LOG_FILE" 2>&1

    echo "✅ Commit & push feitos com sucesso em $(date '+%H:%M:%S')" | tee -a "$LOG_FILE"
    echo "------------------------------------------" >> "$LOG_FILE"
done
#!/bin/bash
# === AUTO COMMIT E PUSH AVANÇADO ===
# Monitora alterações, faz commit + push automático e exibe notificações coloridas.

# 🟣 Diretório do repositório
REPO_DIR="$(git rev-parse --show-toplevel)"
cd "$REPO_DIR" || exit

# 🟡 Branch atual
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# 🔊 Função opcional de som (necessita 'paplay' ou 'afplay')
play_sound() {
  if command -v paplay >/dev/null 2>&1; then
    paplay /usr/share/sounds/freedesktop/stereo/complete.oga 2>/dev/null &
  elif command -v afplay >/dev/null 2>&1; then
    afplay /System/Library/Sounds/Glass.aiff 2>/dev/null &
  fi
}

# 🌈 Função de cores
green="\e[32m"
red="\e[31m"
yellow="\e[33m"
cyan="\e[36m"
reset="\e[0m"

clear
echo -e "${cyan}🚀 Iniciando monitoramento automático de commits...${reset}"
echo -e "📁 Diretório: ${yellow}$REPO_DIR${reset}"
echo -e "🌿 Branch: ${green}$BRANCH${reset}"
echo

# 🔁 Loop infinito para monitorar alterações
while true; do
    # Escuta alterações nos arquivos exceto .git
    inotifywait -r -e modify,create,delete,move --exclude '\.git' "$REPO_DIR" > /dev/null 2>&1

    # Verifica mudanças
    git add .

    if ! git diff --cached --quiet; then
        COMMIT_MSG="✨ Auto commit: $(date '+%Y-%m-%d %H:%M:%S')"
        git commit -m "$COMMIT_MSG" > /dev/null 2>&1

        # Mostra animação durante o push
        echo -ne "${yellow}🔄 Enviando alterações para o GitHub"
        for i in {1..3}; do
            echo -ne "."
            sleep 0.5
        done
        echo -e "${reset}"

        if git push origin "$BRANCH" > /dev/null 2>&1; then
            echo -e "${green}✅ [$COMMIT_MSG] enviado com sucesso!${reset}"
            play_sound
        else
            echo -e "${red}❌ Falha ao enviar. Verifique sua conexão ou autenticação.${reset}"
        fi
    else
        echo -e "${cyan}🕐 Nenhuma alteração detectada.${reset}"
    fi

    sleep 2
done
nano auto-commit.sh
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
