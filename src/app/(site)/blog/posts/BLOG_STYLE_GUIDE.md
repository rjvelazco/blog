# Blog Style Guide — rjvelazco.com

Referencia de tono, voz y formato para mantener consistencia entre posts.

---

## Tono y voz

- **Técnico pero accesible.** El lector ideal es un developer de Angular con algo de experiencia — no principiante absoluto, pero tampoco senior avanzado.
- **Directo y opinionado.** Se toman posturas claras sobre buenas y malas prácticas, sin rodeos.
- **Guía, no cátedra.** El tono es de colega que explica, no de experto que imparte clase. Frases como _"miremos un ejemplo"_, _"entendamos desde el error"_, _"y listo"_.
- **Español con términos técnicos en inglés.** La prosa va en español, pero los términos del ecosistema Angular/TypeScript se mantienen en inglés: `computed`, `state`, `store`, `effect`, `signal`, etc.
- **Sin jerga innecesaria.** Si un concepto necesita definición, se define brevemente antes de usarlo.

---

## Estructura general

Hay dos templates según el tipo de post:

### Template A — Tutorial paso a paso

Usado cuando el objetivo es que el lector replique algo de forma práctica.

```
1. Intro breve (qué vamos a hacer y por qué vale la pena)
2. Prerequisitos (tools, versiones, links al repo si aplica)
3. Paso 1: [Título descriptivo]
4. Paso 2: [Título descriptivo]
5. Paso N: ...
6. Verificación / Resultado final
```

Ejemplos: _Configurar ESLint + Prettier + Husky_, _Angular Router State_.

### Template B — Conceptos y best practices

Usado cuando el objetivo es enseñar un patrón, corregir un anti-pattern o presentar una API.

```
1. Intro con analogía o definición simple del concepto
2. Contexto/API básico (cómo se usa en pocas palabras)
3. ❌ Mala práctica → Código de ejemplo → Problemas listados
4. ✅ Buena práctica → Código de ejemplo → Beneficios
5. (Repetir secciones 3-4 para cada caso relevante)
6. Conclusión
7. TL;DR (opcional, para posts largos)
```

Ejemplos: _Linked Signals_, _NgRx Signal Store best practices_.

### Template C — Reflexión personal / conceptual

Usado cuando el objetivo es compartir una experiencia propia o un cambio de mentalidad, sin código. El lector no viene a aprender una API específica sino a reflexionar sobre su forma de trabajar.

```
1. El problema (experiencia personal que el lector reconoce como suya)
2. ¿Qué beneficios obtienes? (lo concreto de la herramienta o concepto)
3. La objeción principal del lector — y tu respuesta (cierre del argumento)
```

Características de este template:

- Sin bloques de código. El ancla visual puede ser una imagen de banner o capturas de pantalla.
- La analogía es el centro del argumento, no el código.
- El tono es más narrativo que el Template A o B, pero sin caer en el estilo LinkedIn.
- La objeción del lector se anticipa y se responde explícitamente en la última sección.
- Termina con una idea fuerte, no con una lista de conclusiones.

Ejemplos: _De developer a Product Owner: cómo el Plan Mode cambia tu forma de trabajar con AI_.

---

## Elementos de formato recurrentes

### Emojis como marcadores visuales (funcionales, no decorativos)

| Emoji | Uso                                    |
| ----- | -------------------------------------- |
| ❌    | Mala práctica o error                  |
| ✅    | Buena práctica o solución              |
| ⚠️    | Advertencia o caso edge                |
| 👉    | Señalar algo importante                |
| 💡    | Tip o insight adicional                |
| ⚛️ 🎯 | Títulos de sección con contexto visual |

### Código

- Los bloques de código son el **centro** del post, no un accesorio.
- Se usa TypeScript casi siempre. Bash para comandos de terminal.
- Se incluyen comentarios inline (`// ❌`, `// ✅`, `// 👇🏻`) para guiar al lector dentro del código.
- Los ejemplos siempre tienen contexto suficiente para entenderse solos.

### Callouts

- **Blockquotes** (`>`) para definiciones rápidas o reglas de negocio.
- **`<aside>`** para tips o aclaraciones secundarias que no cortan el flujo principal.
- **Negrita** para enfatizar términos técnicos clave la primera vez que aparecen.

### Links

- Se linkea a documentación oficial (angular.dev, ngrx.io) como respaldo de los argumentos.
- Los links van inline en el texto, no como notas al pie.

### Párrafos

- Cortos. Máximo 3-4 líneas por párrafo.
- Mucho espacio visual entre secciones.

---

## Metadata (formato MDX)

Cada post incluye un objeto `metadata` con:

```js
export const metadata = {
  title: '',           // Título del post
  description: '',     // Descripción corta para SEO
  date: '',            // YYYY-MM-DD
  category: '',        // Ej: 'Angular', 'NgRx'
  publishDate: '',     // Igual que date
  openGraph: { ... },  // title, description, type, locale, url, siteName, images
  twitter: { ... },    // card, title, description, creator, images
  alternates: {
    canonical: '',     // URL canónica del post
  },
};
```

---

## Patrones de lenguaje frecuentes

- _"Miremos un ejemplo"_ — para introducir código
- _"Entendamos este concepto desde el error"_ — para empezar con el anti-pattern
- _"¿Pudiste notar el error?"_ — para involucrar al lector
- _"Y listo"_ — cierre de un paso o sección
- _"En pocas palabras"_ — para resumir antes de profundizar
- _"Lo importante es que..."_ — para resaltar el takeaway principal

---

## Puntuación

- **No usar em dash (—).** En su lugar, usar la puntuación que mejor encaje según el contexto: coma (,) para pausas cortas, punto y coma (;) para separar ideas relacionadas, punto (.) para separar ideas que merecen su propio espacio.
- Si una frase necesita un em dash para sostenerse, es señal de que probablemente debería dividirse en dos.

## Lo que NO se hace

- No se explica desde cero qué es Angular o TypeScript (el lector ya lo sabe).
- No se usan listas de bullets donde un párrafo fluye mejor.
- No se sobreexplica el código — si el ejemplo es claro, no se repite en prosa.
- No se usa un tono impersonal o académico.
