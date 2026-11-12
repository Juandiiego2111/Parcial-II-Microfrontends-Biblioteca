# Parcial II - Biblioteca: Microfrontends + Microservicios

**Arquitectura de Software - UCEVA - Docente: Jesus David Mejia Vergara**

Sistema de biblioteca con arquitectura de **microfrontends** (Angular + Webpack Module Federation) integrada con **microservicios** (Node.js y Spring Boot). Cada microfrontend y cada microservicio aplica **Clean Architecture**.

## Integrantes

| Integrante | Vertical | Microfrontend | Microservicio |
|---|---|---|---|
| David Mora Duque (líder) | Libros + Host | `Microfrontend-Books-Angular` | `Microservice-Books-NodeJS` |
| Juan Diego Rodriguez | Socios | `Microfrontend-Members-Angular` | `Microservice-Members-SpringBoot` |
| Juan Pablo Devia | Préstamos | `Microfrontend-Loans-Angular` | `Microservice-Loans-SpringBoot` |

## Estructura del monorepo

```
/
├── Client-Host-Angular/               Host: navbar y carga de los microfrontends
├── Microfrontend-Books-Angular/       MF de libros
├── Microfrontend-Members-Angular/     MF de socios
├── Microfrontend-Loans-Angular/       MF de préstamos
├── Microservice-Books-NodeJS/         MS de libros (Node.js + Express)
├── Microservice-Members-SpringBoot/   MS de socios (Spring Boot)
└── Microservice-Loans-SpringBoot/     MS de préstamos (Spring Boot)
```

Cada carpeta tiene su propio `README.md` técnico con la arquitectura de capas y los detalles de ejecución.

## Puertos y conexiones

| Componente | Tecnología | Puerto | Consume / Expone |
|---|---|---|---|
| **Host** (`Client-Host-Angular`) | Angular 20 + Module Federation | **4200** | Carga los tres remotes (`/books`, `/members`, `/loans`) |
| **MF Libros** | Angular 20 | **4201** | Consume **MS Libros** (`http://localhost:3001/api/books`) |
| **MF Socios** | Angular 20 | **4202** | Consume **MS Socios** (`http://localhost:3002/api/members`) |
| **MF Préstamos** | Angular 20 | **4203** | Consume **MS Préstamos** (`http://localhost:3003/api/loans`) |
| **MS Libros** | Node.js + TypeScript + Express | **3001** | Swagger: http://localhost:3001/api/docs |
| **MS Socios** | Spring Boot (Java 25) | **3002** | Swagger: http://localhost:3002/api/docs |
| **MS Préstamos** | Spring Boot (Java 25) | **3003** | Swagger: http://localhost:3003/api/docs |

| Microfrontend | Nombre federado | Módulo expuesto | Archivo remoto |
|---|---|---|---|
| Libros | `mf-books` | `./BooksPage` | http://localhost:4201/remoteEntry.js |
| Socios | `mf-members` | `./MembersPage` | http://localhost:4202/remoteEntry.js |
| Préstamos | `mf-loans` | `./LoansPage` | http://localhost:4203/remoteEntry.js |

## Endpoints de los microservicios

Todos usan el prefijo `/api`, almacenan los datos en memoria (con datos semilla) y responden `200`, `201`, `400` o `404`.

| Microservicio | Método y ruta | Caso de uso |
|---|---|---|
| Libros (3001) | `GET /api/books` | Listar libros |
| | `GET /api/books/{id}` | Obtener libro por id |
| | `POST /api/books` | Crear libro |
| Socios (3002) | `GET /api/members` | Listar socios |
| | `GET /api/members/{id}` | Obtener socio por id |
| | `POST /api/members` | Registrar socio |
| Préstamos (3003) | `GET /api/loans` | Listar préstamos |
| | `GET /api/loans/{id}` | Obtener préstamo por id |
| | `POST /api/loans` | Registrar préstamo |

## Requisitos

- **Node.js** 20.19 o superior (o 22.12+) y npm
- **Java 25** (JDK) para los microservicios Spring Boot; se usa el wrapper de Gradle incluido, no hace falta instalar Gradle
- Puertos libres: 3001, 3002, 3003, 4200, 4201, 4202 y 4203

## Cómo ejecutar

Se necesitan **siete terminales** (una por aplicación). Desde la raíz del repositorio:

### 1. Microservicios

```bash
# Libros (Node.js) - puerto 3001
cd Microservice-Books-NodeJS
npm install
npm run start

# Socios (Spring Boot) - puerto 3002
cd Microservice-Members-SpringBoot
./gradlew bootRun          # en Windows: .\gradlew.bat bootRun

# Préstamos (Spring Boot) - puerto 3003
cd Microservice-Loans-SpringBoot
./gradlew bootRun          # en Windows: .\gradlew.bat bootRun
```

### 2. Microfrontends

```bash
# Libros - puerto 4201
cd Microfrontend-Books-Angular
npm install
npm start

# Socios - puerto 4202
cd Microfrontend-Members-Angular
npm install
npm start

# Préstamos - puerto 4203
cd Microfrontend-Loans-Angular
npm install
npm start
```

### 3. Host

```bash
# Host - puerto 4200
cd Client-Host-Angular
npm install
npm start
```

Abrir **http://localhost:4200**. El navbar permite navegar entre **Libros**, **Socios** y **Préstamos**; cada sección es un microfrontend cargado en tiempo de ejecución desde su `remoteEntry.js`.

> Para ver un microfrontend integrado, deben estar corriendo el host (4200), ese microfrontend y su microservicio.

## Verificar la conexión entre microfrontends y microservicios

1. Abrir http://localhost:4200 y navegar a una sección (por ejemplo, **Libros**).
2. Abrir las herramientas del navegador (`F12`) y la pestaña **Network** (filtro Fetch/XHR).
3. Se observa la petición `GET http://localhost:3001/api/books` (Libros), `http://localhost:3002/api/members` (Socios) o `http://localhost:3003/api/loans` (Préstamos).
4. Al crear un registro desde el formulario se observa el `POST` correspondiente y la recarga de la lista.

También se puede abrir la documentación **Swagger** de cada microservicio (URLs en la tabla de puertos) y probar los endpoints directamente.

## Pruebas

- **Microfrontends:** Jest con umbral de cobertura del **90 %** configurado (la ejecución falla si baja). En cada carpeta: `npm test`.
- **Microservicios Spring Boot:** `./gradlew test`.

## Arquitectura

Aplicamos **Clean Architecture** en todas las aplicaciones: las dependencias apuntan hacia adentro y el dominio no depende de ningún framework.

| Capa | Microfrontend (Angular) | Microservicio (Node.js / Spring Boot) |
|---|---|---|
| Dominio | Entidades y repositorio abstracto (puerto) | Entidades, interfaz del repositorio y excepciones de dominio |
| Aplicación | 3 casos de uso (clases puras con `execute`) | 3 casos de uso |
| Infraestructura | API Gateway (`HttpClient`), DTOs y mappers | Repositorio sobre datasource en memoria, controladores REST, Swagger, CORS |
| Presentación | Página (expuesta por Module Federation) y componentes | Controladores que solo invocan casos de uso |

En total hay **9 casos de uso en el frontend** (3 por microfrontend) y **9 en el backend** (3 por microservicio). Los casos de uso del frontend se corresponden con los endpoints de su microservicio.

## Estándar de commits

Conventional Commits en español, con alcance: `tipo(alcance): descripción`.

- **Tipos:** `feat`, `fix`, `test`, `docs`, `refactor`, `style`, `chore`, `build`.
- **Alcances:** `host`, `mf-books`, `mf-members`, `mf-loans`, `ms-books`, `ms-members`, `ms-loans`, `repo`, `docs`.

Ejemplo: `feat(ms-books): agrega caso de uso listar libros`.

## Despliegue en GitHub Pages

### URL del sitio

- **Producción:** <https://juandiiego2111.github.io/Parcial-II-Microfrontends-Biblioteca/>

### Estructura del sitio publicada

```
/
├── index.html                          -> Host (Client-Host-Angular)
├── main*.js / styles*.css ...          -> Chunks del Host
└── remotes/
    ├── books/
    │   ├── remoteEntry.js              -> Microfrontend de Libros (BooksPage)
    │   └── *.js                        -> Chunks del MF de Libros
    ├── members/
    │   ├── remoteEntry.js              -> Microfrontend de Socios (MembersPage)
    │   └── *.js                        -> Chunks del MF de Socios
    └── loans/
        ├── remoteEntry.js              -> Microfrontend de Préstamos (LoansPage)
        └── *.js                        -> Chunks del MF de Préstamos
```

### Modo demostración (datos de ejemplo)

El sitio publicado en GitHub Pages **no consume los microservicios** (que solo corren localmente con `ng serve`/backends reales). GitHub Pages solo sirve contenido **estático**, por lo que:

- Cada microfrontend expone un **repositorio en memoria** con datos de ejemplo realistas en español (con CRUD funcional en memoria durante la sesión).
- Los datos de préstamos son coherentes con los libros y socios de ejemplo.
- El Host muestra el aviso discreto: **"Modo demostración: datos de ejemplo"**.

Este comportamiento se activa **únicamente** con la configuración de build `ghpages` (`ng build --configuration ghpages`), que selecciona los environments mediante `fileReplacements` (`src/environments/environment.ts` → `src/environments/environment.ghpages.ts`).

### Pipeline de despliegue

El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) se dispara con `push` a `main` y con `workflow_dispatch` y ejecuta:

1. **build:** instala dependencias (`npm ci`), ejecuta las pruebas de las 4 apps, build `ghpages` de las 4 apps, ensambla el sitio (`scripts/assemble-ghpages.mjs`) y sube el artefacto a Pages.
2. **deploy:** publica el artefacto con `actions/deploy-pages`.
3. **verify:** con reintentos de `curl`, comprueba que la URL publicada responde `200`, que el `index.html` del host contiene el texto del host y que los tres `/remotes/*/remoteEntry.js` responden `200`.

### Ejecutar localmente el build de GitHub Pages y el ensamblado

```bash
# Desde la raíz del repositorio

# 1. Build ghpages de cada app (requiere Node 22)
cd Client-Host-Angular && npm run build:ghpages
cd ../Microfrontend-Books-Angular && npm run build:ghpages
cd ../Microfrontend-Members-Angular && npm run build:ghpages
cd ../Microfrontend-Loans-Angular && npm run build:ghpages

# 2. Ensamblar la carpeta site/
node scripts/assemble-ghpages.mjs

# 3. Servir el sitio localmente (por ejemplo con cualquier servidor estático)
npx serve site
# o: python -m http.server 8080 --directory site
```

Para validar localmente que el sitio responde bajo el prefijo `/Parcial-II-Microfrontends-Biblioteca/`, levantar un servidor estático que monte `site/` en ese prefijo y comprobar:

- `GET /Parcial-II-Microfrontends-Biblioteca/` → `200` (Host).
- `GET /Parcial-II-Microfrontends-Biblioteca/remotes/books/remoteEntry.js` → `200`.
- `GET /Parcial-II-Microfrontends-Biblioteca/remotes/members/remoteEntry.js` → `200`.
- `GET /Parcial-II-Microfrontends-Biblioteca/remotes/loans/remoteEntry.js` → `200`.

### Aviso

GitHub Pages solo sirve contenido estático, por eso los backends (microservicios) no se despliegan ni se tocan en el pipeline.

### Créditos

- Proyecto original: **David Mora Duque (INGDavidMora2005)**, **Juan Diego Rodríguez** y **Juan Pablo Devia**.
- Despliegue en GitHub Pages por **Juan Diego Rodríguez Ortiz (Juandiiego2111)**.

