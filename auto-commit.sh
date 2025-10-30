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
