# TurnoFácil — Backend API REST

API REST para gestión de turnos universitarios.  
Taller Unidad 2 — Programación Móvil.

---

## Cómo instalar

```bash
npm install
```

## Cómo ejecutar

```bash
# Desarrollo
npm run dev

# Producción
npm start
```

El servidor corre en → `http://localhost:3001`

---

## Lista de rutas

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/servicios` | Lista todos los servicios disponibles |
| GET | `/api/servicios/:id` | Detalle de un servicio por ID |
| POST | `/api/turnos` | Solicitar un turno |

---

## Ejemplos de uso

### GET /api/servicios
```
http://localhost:3001/api/servicios
```

### GET /api/servicios/:id
```
http://localhost:3001/api/servicios/1
```

### POST /api/turnos
**Body (JSON):**
```json
{
  "nombre": "Juan Pérez",
  "documento": "1075234567",
  "servicioId": 1
}
```

---

## Validaciones

- Campos faltantes → `400 Bad Request`
- Servicio no existe → `404 Not Found`  
- Sin cupos disponibles → `400 Bad Request`
