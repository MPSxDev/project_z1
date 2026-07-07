# YieldEdge - Claude Code Context

## Project Overview

YieldEdge is a modern web application built with Next.js 15, React 19, and Tailwind CSS 4. The project uses the App Router architecture with Server Components by default.

## Tech Stack

- **Framework:** Next.js 15.5 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript 5
- **i18n:** next-intl
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Project Structure

```
app/
  [locale]/           # Internationalized routes
    layout.tsx        # Root layout with providers
    page.tsx          # Home page
components/           # Reusable components
lib/                  # Utilities and helpers
public/               # Static assets
messages/             # i18n translation files
```

---

# REGLAS OBLIGATORIAS

## Build - Verificación Antes de Cambios

**SIEMPRE ejecuta `npm run build` ANTES de crear o modificar archivos.**

Esto garantiza:
1. El estado actual del proyecto es válido
2. Si hay errores después de tus cambios, sabes que los causaste tú
3. Puedes corregir inmediatamente antes de continuar

```bash
# Antes de crear/modificar archivos
npm run build
```

## Git - Sistema de Commits Seguros

**NUNCA ejecutes estos comandos directamente:**
- `git commit`
- `git push`

**SIEMPRE usa el script seguro:**
```bash
.claude/scripts/safe-commit.sh
```

Este script:
1. Muestra diff completo antes de commitear
2. Detecta archivos sensibles (.env, passwords, keys)
3. Requiere confirmación explícita del usuario
4. Pregunta antes de hacer push

---

# LEARNED RULES

## Restricciones Absolutas (NUNCA violar)

### TypeScript
- **NO `any`**: Nunca usar `any` como tipo. Usar tipos específicos o `unknown`.
- **NO `@ts-ignore`**: Usar `@ts-expect-error` con comentario si es necesario.

### React / Next.js
- **NO `console.log`**: Eliminar antes de commit o usar logger configurado.
- **NO estilos inline**: Usar Tailwind CSS classes exclusivamente.
- **NO `<img>`**: Siempre usar `next/image` para optimización.
- **NO `<a>` para links internos**: Usar `next/link`.
- **NO `dangerouslySetInnerHTML`**: Riesgo de XSS, evitar siempre.

### Código
```typescript
// MAL
const data: any = await fetch(...)
<div style={{color: 'red'}}>
<img src="/foto.jpg" />

// BIEN
const data: UserResponse = await fetch(...)
<div className="text-red-500">
<Image src="/foto.jpg" alt="..." width={100} height={100} />
```

## Preferencias de Arquitectura

### Server vs Client Components
- **Preferir Server Components** por defecto
- Solo usar `'use client'` cuando necesites:
  - `useState`, `useEffect`, otros hooks
  - Event handlers (`onClick`, `onChange`, etc.)
  - Browser APIs (`window`, `localStorage`)

### Data Fetching
```typescript
// PREFERIDO: Fetch en Server Component
async function Page() {
  const data = await fetch('https://api.example.com/data')
  return <ClientComponent data={data} />
}

// EVITAR: useEffect para fetch
'use client'
function Component() {
  useEffect(() => {
    fetch(...) // No recomendado
  }, [])
}
```

### Estilos
- Usar Tailwind CSS utilities exclusivamente
- Para clases condicionales, usar `cn()` helper:
```typescript
import { cn } from '@/lib/utils'
<div className={cn('base-class', isActive && 'active-class')} />
```

## Convenciones de Naming

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| Componentes | PascalCase | `UserCard.tsx` |
| Funciones | camelCase | `getUserById()` |
| Constantes | SCREAMING_SNAKE | `MAX_ITEMS` |
| Archivos de página | lowercase | `page.tsx` |
| Hooks | usePrefix | `useAuth.ts` |

### Idioma
- **Código** (variables, funciones, componentes): INGLÉS
- **Contenido UI** (texto visible al usuario): ESPAÑOL (via next-intl)
- **Comentarios**: INGLÉS
- **Commits**: INGLÉS

---

# ERRORES COMUNES Y SOLUCIONES

## Hydration Mismatch
**Síntoma:** "Hydration failed because the server rendered HTML didn't match"

**Causa:** Contenido diferente entre server y client render.

**Solución:**
```typescript
// Mover lógica dinámica a useEffect
const [date, setDate] = useState<string>('')
useEffect(() => {
  setDate(new Date().toLocaleDateString())
}, [])
```

## Missing 'use client'
**Síntoma:** "You're importing a component that needs useState"

**Solución:** Añadir `'use client'` al inicio del archivo.

## useEffect Missing Dependencies
**Síntoma:** "React Hook useEffect has a missing dependency"

**Solución:**
```typescript
useEffect(() => {
  fetchData(userId)
}, [userId]) // Incluir TODAS las dependencias
```

## Tailwind Class Not Working
**Causa:** Clases generadas dinámicamente no se incluyen en build.

```typescript
// MAL (no funciona)
<div className={`text-${color}-500`} />

// BIEN (funciona)
const colorClasses = { red: 'text-red-500', blue: 'text-blue-500' }
<div className={colorClasses[color]} />
```

---

# DECISIONES ARQUITECTÓNICAS

## ADR-001: Next.js 15 App Router
- Server Components por defecto
- Streaming y Suspense nativo
- File-based routing

## ADR-003: Tailwind CSS 4
- Utilities exclusivamente, sin CSS custom
- Excepción: Framer Motion para animaciones complejas

## ADR-006: next-intl para i18n
- Traducciones en `messages/es.json`, `messages/en.json`
- Usar `useTranslations('namespace')` en componentes

## ADR-010: Commits Seguros
- Usar `.claude/scripts/safe-commit.sh` obligatoriamente
- Nunca push automático
- Siempre mostrar diff y pedir confirmación

---

# COMANDOS ÚTILES

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo en puerto 3000

# Build y validación
npm run build        # Build de producción
npm run lint         # ESLint

# Git (OBLIGATORIO usar script seguro)
.claude/scripts/safe-commit.sh

# Si el puerto 3000 está ocupado
npm run kill         # Mata proceso en puerto 3000
```

---

# ARCHIVOS DE REFERENCIA

Para información detallada, consulta:
- `.claude/learned-rules/rules.yaml` - Reglas completas
- `.claude/learned-rules/errors.yaml` - Errores documentados
- `.claude/learned-rules/decisions.yaml` - ADRs completos
- `.claude/skills/` - Skills especializados disponibles
