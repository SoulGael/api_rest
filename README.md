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
├── __tests__/        # Pruebas con Jest
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

## 🧪 Ejecutar pruebas

```bash
npm test
```

Esto correrá los tests de `src/__tests__/` usando Jest y Supertest.

---

## 🧪 GitHub Actions (CI)

Este proyecto incluye un workflow que:

- Instala dependencias
- Corre pruebas automáticas
- Verifica que el servidor funcione

Puedes ver el archivo en `.github/workflows/nodejs.yml`.

---

## 📬 API Endpoints

| Método | Ruta           | Descripción               |
|--------|----------------|---------------------------|
| GET    | /api/users     | Listar usuarios           |
| POST   | /api/users     | Crear nuevo usuario       |

### Ejemplo `POST /api/users`

```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
```

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.
