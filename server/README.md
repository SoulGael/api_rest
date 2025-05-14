# 🧠 Clean API - Node.js + Express + MongoDB

Este proyecto es una API RESTful básica construida con Node.js, Express y MongoDB (Atlas), estructurada bajo buenas prácticas de Clean Code, modularidad y preparada para escalabilidad.

---

## 🚀 Características

- 🔗 Conexión a MongoDB Atlas
- ✅ Validaciones con Joi
- 🧪 Pruebas con Jest + Supertest
- 🔐 Manejo de errores centralizado
- 🧱 Estructura modular (routes, controllers, services, models, middlewares, utils)
- 🤖 Configurado con GitHub Actions para CI

---

## 📁 Estructura del proyecto

```
src/
├── config/           # Configuración DB
├── controllers/      # Lógica HTTP
├── models/           # Esquemas de Mongoose
├── routes/           # Endpoints
├── services/         # Lógica de negocio
├── middlewares/      # Validaciones y errores
├── utils/            # Funciones reutilizables
└── app.js            # Punto de entrada
```

---

## ⚙️ Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/nombre-repo.git
cd nombre-repo
```

2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo `.env`:

```env
PORT=3000
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/<basedatos>
```

---

## ▶️ Ejecutar el servidor

### En modo desarrollo:
```bash
npm run dev
```

### En modo producción:
```bash
npm start
```

---

## 🧪 Ejecutar seed

```bash
node src/modules/parents/parents-seed.js
node src/modules/users/users-seed.js
```

## 🧪 Ejecutar eslint para verificar errores

```bash
npm run lint
```

Esto creara datos de usuarios para pruebas.

---

## 📬 API Endpoints

| Método | Ruta           | Descripción               |
|--------|----------------|---------------------------|
| GET    | /api/users     | Listar usuarios           |

Ej: http://localhost:3000/api/users?search=yahoo.com&page=1&limit=5
---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
