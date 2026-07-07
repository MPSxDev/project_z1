#!/bin/bash
# ============================================================================
# SAFE COMMIT - Sistema de commit seguro con confirmación obligatoria
# ============================================================================
# NUNCA ejecuta git commit/push sin confirmación explícita del usuario
# Uso: .claude/scripts/safe-commit.sh
# ============================================================================

set -e

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# Variable para bypass del pre-commit hook
export SAFE_COMMIT=1

# Función para imprimir header
print_header() {
    echo ""
    echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║${NC}  ${BOLD}SAFE COMMIT${NC} - Sistema de commit seguro                    ${BLUE}║${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Función para confirmar acción
confirm() {
    local prompt="$1"
    local response
    echo -ne "${CYAN}$prompt${NC} "
    read -r response
    [[ "$response" =~ ^[Yy]$ ]]
}

# Función para detectar archivos sensibles
check_sensitive_files() {
    local files="$1"
    local sensitive_patterns=(".env" "credentials" "secret" "password" "api_key" "apikey" ".pem" ".key" "token")
    local found=""

    for pattern in "${sensitive_patterns[@]}"; do
        local matches
        matches=$(echo "$files" | grep -i "$pattern" || true)
        if [ -n "$matches" ]; then
            found="${found}${matches}\n"
        fi
    done

    echo -e "$found"
}

# ============================================================================
# INICIO DEL SCRIPT
# ============================================================================

print_header

# 1. Verificar que estamos en un repositorio git
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo -e "${RED}❌ ERROR: No estás en un repositorio git${NC}"
    exit 1
fi

# 2. Verificar que hay cambios
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}⚠️  No hay cambios para commitear${NC}"
    echo ""
    exit 0
fi

# 3. Mostrar estado actual
echo -e "${GREEN}📋 ESTADO ACTUAL${NC}"
echo "────────────────────────────────────────────────────────────"
git status --short
echo ""

# 4. Mostrar estadísticas de cambios
echo -e "${GREEN}📊 RESUMEN DE CAMBIOS${NC}"
echo "────────────────────────────────────────────────────────────"
git diff --stat HEAD 2>/dev/null || git diff --stat
echo ""

# 5. Preguntar si quiere ver diff completo
if confirm "¿Ver diff completo? [y/N]:"; then
    echo ""
    echo -e "${GREEN}📝 DIFF COMPLETO${NC}"
    echo "────────────────────────────────────────────────────────────"
    git diff --color HEAD 2>/dev/null || git diff --color
    echo ""
fi

# 6. Ejecutar build para verificar errores
echo -e "${GREEN}🔨 VERIFICACIÓN DE BUILD${NC}"
echo "────────────────────────────────────────────────────────────"
echo -e "${CYAN}Ejecutando npm run build...${NC}"
echo ""

if ! npm run build > /dev/null 2>&1; then
    echo -e "${RED}❌ ERROR: El build falló. Corrige los errores antes de commitear.${NC}"
    echo ""
    echo -e "${YELLOW}Ejecuta 'npm run build' para ver los errores detallados.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Build exitoso - sin errores${NC}"
echo ""

# 7. Verificar archivos sensibles
echo -e "${GREEN}🔒 VERIFICACIÓN DE SEGURIDAD${NC}"
echo "────────────────────────────────────────────────────────────"

staged_files=$(git diff --cached --name-only 2>/dev/null || true)
unstaged_files=$(git diff --name-only 2>/dev/null || true)
all_changed_files="${staged_files}\n${unstaged_files}"

sensitive=$(check_sensitive_files "$all_changed_files")

if [ -n "$sensitive" ] && [ "$sensitive" != "\n" ]; then
    echo -e "${RED}⚠️  ALERTA: Archivos potencialmente sensibles detectados:${NC}"
    echo -e "$sensitive" | grep -v "^$" | sed 's/^/   /'
    echo ""
    if ! confirm "¿Estás SEGURO de que quieres incluir estos archivos? [y/N]:"; then
        echo -e "${YELLOW}❌ Commit cancelado. Revisa los archivos sensibles.${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓ No se detectaron archivos sensibles${NC}"
fi
echo ""

# 8. Mostrar commits recientes para contexto de estilo
echo -e "${GREEN}📜 COMMITS RECIENTES (para referencia de estilo)${NC}"
echo "────────────────────────────────────────────────────────────"
git log --oneline -5
echo ""

# 9. Solicitar mensaje de commit
echo -e "${GREEN}✏️  MENSAJE DE COMMIT${NC}"
echo "────────────────────────────────────────────────────────────"
echo "Escribe el mensaje de commit (Enter vacío para cancelar):"
echo ""
read -r -p "> " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    echo -e "${RED}❌ Mensaje de commit vacío. Cancelando.${NC}"
    exit 1
fi

# 10. Mostrar resumen final
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}                    RESUMEN FINAL DEL COMMIT                   ${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}Archivos a commitear:${NC}"
git status --short | sed 's/^/   /'
echo ""
echo -e "${CYAN}Mensaje:${NC}"
echo "   $COMMIT_MSG"
echo ""
echo -e "${CYAN}Co-Author:${NC}"
echo "   Claude Opus 4.5 <noreply@anthropic.com>"
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# 11. CONFIRMACIÓN FINAL OBLIGATORIA
if ! confirm "¿CONFIRMAR COMMIT? [y/N]:"; then
    echo -e "${YELLOW}❌ Commit cancelado por el usuario${NC}"
    exit 0
fi

# 12. Ejecutar commit
echo ""
echo -e "${GREEN}⏳ Ejecutando commit...${NC}"

# Stage todos los cambios
git add -A

# Crear commit con co-author
git commit -m "$(cat <<EOF
$COMMIT_MSG

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"

echo ""
echo -e "${GREEN}✅ Commit realizado exitosamente${NC}"
echo ""

# 13. Mostrar el commit creado
echo -e "${CYAN}Commit creado:${NC}"
git log --oneline -1
echo ""

# 14. Preguntar por push (NUNCA automático)
BRANCH=$(git branch --show-current)
echo -e "${GREEN}🚀 PUSH AL REMOTO${NC}"
echo "────────────────────────────────────────────────────────────"
echo -e "Rama actual: ${CYAN}$BRANCH${NC}"
echo ""

if confirm "¿Hacer push a origin/$BRANCH? [y/N]:"; then
    # Advertencia adicional para main/master
    if [[ "$BRANCH" == "main" || "$BRANCH" == "master" ]]; then
        echo ""
        echo -e "${RED}⚠️  ADVERTENCIA: Estás en la rama ${BOLD}$BRANCH${NC}"
        if ! confirm "¿REALMENTE quieres hacer push a $BRANCH? [y/N]:"; then
            echo -e "${YELLOW}Push cancelado${NC}"
            exit 0
        fi
    fi

    echo ""
    echo -e "${GREEN}⏳ Ejecutando push...${NC}"
    git push origin "$BRANCH"
    echo ""
    echo -e "${GREEN}✅ Push completado exitosamente${NC}"
else
    echo -e "${YELLOW}ℹ️  Push omitido. Ejecuta 'git push' cuando estés listo.${NC}"
fi

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}                    ✅ OPERACIÓN COMPLETADA                     ${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════════${NC}"
echo ""
