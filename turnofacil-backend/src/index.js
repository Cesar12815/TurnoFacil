// TurnoFácil — Backend API REST
// Taller Unidad 2 — Programación Móvil
// Node.js + Express

const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(cors());
app.use(express.json());

// ─── DATOS EN MEMORIA ─────────────────────────────────────────────────────────
// (Simula base de datos para el MVP del taller)

const servicios = [
  {
    id: 1,
    nombre: 'Asesoría Académica',
    descripcion: 'Orientación personalizada sobre plan de estudios, homologaciones y situación académica.',
    cupos: 15,
    horario: 'Lunes a Viernes 8:00 AM – 12:00 PM',
    ubicacion: 'Bloque A, Oficina 101',
  },
  {
    id: 2,
    nombre: 'Certificados',
    descripcion: 'Solicitud y entrega de certificados de estudio, notas y paz y salvo.',
    cupos: 20,
    horario: 'Lunes a Viernes 8:00 AM – 5:00 PM',
    ubicacion: 'Secretaría Académica, Bloque B',
  },
  {
    id: 3,
    nombre: 'Bienestar Universitario',
    descripcion: 'Atención psicológica, orientación socioeconómica y programas de bienestar estudiantil.',
    cupos: 10,
    horario: 'Lunes a Viernes 9:00 AM – 4:00 PM',
    ubicacion: 'Bloque C, Piso 2',
  },
  {
    id: 4,
    nombre: 'Financiera y Pagos',
    descripcion: 'Consulta de deudas, acuerdos de pago, becas y descuentos.',
    cupos: 0,
    horario: 'Lunes a Jueves 8:00 AM – 3:00 PM',
    ubicacion: 'Bloque Administrativo, Oficina 205',
  },
  {
    id: 5,
    nombre: 'Registro y Control',
    descripcion: 'Inscripción de materias, retiros, adiciones y gestión de horarios.',
    cupos: 12,
    horario: 'Lunes a Viernes 7:30 AM – 4:30 PM',
    ubicacion: 'Bloque A, Planta Baja',
  },
  {
    id: 6,
    nombre: 'Consultorio Médico',
    descripcion: 'Atención médica general, primeros auxilios y remisiones.',
    cupos: 8,
    horario: 'Lunes a Viernes 8:00 AM – 6:00 PM',
    ubicacion: 'Bloque Bienestar, Piso 1',
  },
];

// Turnos creados durante la sesión
const turnos = [];
let turnoCounter = 1;

// ─── ENDPOINT 1: GET /api/servicios ───────────────────────────────────────────
// Retorna la lista completa de servicios
app.get('/api/servicios', (req, res) => {
  res.json({
    success: true,
    count: servicios.length,
    data: servicios,
  });
});

// ─── ENDPOINT 2: GET /api/servicios/:id ───────────────────────────────────────
// Retorna el detalle de un servicio por ID
app.get('/api/servicios/:id', (req, res) => {
  const id      = parseInt(req.params.id);
  const servicio = servicios.find(s => s.id === id);

  // Si el servicio no existe → 404
  if (!servicio) {
    return res.status(404).json({
      success: false,
      message: `Servicio con id ${id} no encontrado.`,
    });
  }

  res.json({ success: true, data: servicio });
});

// ─── ENDPOINT 3: POST /api/turnos ─────────────────────────────────────────────
// Crea un turno para un servicio
app.post('/api/turnos', (req, res) => {
  const { nombre, documento, servicioId } = req.body;

  // Validar campos requeridos → 400
  if (!nombre || !documento || !servicioId) {
    return res.status(400).json({
      success: false,
      message: 'Faltan campos requeridos: nombre, documento, servicioId.',
    });
  }

  // Buscar el servicio → 404 si no existe
  const servicio = servicios.find(s => s.id === parseInt(servicioId));
  if (!servicio) {
    return res.status(404).json({
      success: false,
      message: `El servicio con id ${servicioId} no existe.`,
    });
  }

  // Validar cupos disponibles
  if (servicio.cupos === 0) {
    return res.status(400).json({
      success: false,
      message: 'Sin cupos disponibles para este servicio.',
    });
  }

  // Crear el turno y descontar cupo
  servicio.cupos -= 1;

  const turno = {
    id:          turnoCounter++,
    nombre:      nombre.trim(),
    documento:   documento.trim(),
    servicio:    servicio.nombre,
    servicioId:  servicio.id,
    hora:        new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }),
    fecha:       new Date().toLocaleDateString('es-CO'),
    numero:      turnoCounter - 1,
  };

  turnos.push(turno);

  res.status(201).json({
    success: true,
    message: '¡Turno solicitado exitosamente!',
    data: turno,
  });
});

// ─── SERVIDOR ─────────────────────────────────────────────────────────────────
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ TurnoFácil API corriendo en http://localhost:${PORT}`);
  console.log(`   GET  /api/servicios`);
  console.log(`   GET  /api/servicios/:id`);
  console.log(`   POST /api/turnos`);
});
