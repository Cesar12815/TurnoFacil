// Pantalla 3 — Solicitar Turno
// Formulario con 3 campos mínimos: nombre, documento, servicio (prellenado)
// POST /api/turnos → muestra confirmación con número de turno

import { useState } from 'react'
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ScrollView, ActivityIndicator, Alert,
} from 'react-native'
import { getAPIUrl } from '../config'

const API = getAPIUrl() // Configuración centralizada

export default function SolicitarTurnoScreen({ route, navigation }) {
  const { servicio } = route.params

  const [nombre,    setNombre]    = useState('')
  const [documento, setDocumento] = useState('')
  const [loading,   setLoading]   = useState(false)
  const [turno,     setTurno]     = useState(null) // null = formulario | objeto = confirmación

  const solicitar = async () => {
    // Validación frontend
    if (!nombre.trim() || !documento.trim()) {
      Alert.alert('Campos requeridos', 'Por favor completa nombre y documento.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${API}/api/turnos`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ nombre, documento, servicioId: servicio.id }),
      })
      const data = await res.json()

      if (data.success) {
        setTurno(data.data) // Mostrar pantalla de confirmación
      } else {
        Alert.alert('Error', data.message)
      }
    } catch {
      Alert.alert('Error de conexión', 'Verifica que el servidor esté corriendo.')
    } finally {
      setLoading(false)
    }
  }

  // ── Pantalla de confirmación ─────────────────────────────────────────────
  if (turno) {
    return (
      <View style={styles.confirmContainer}>
        <Text style={styles.confirmIcon}>🎉</Text>
        <Text style={styles.confirmTitle}>¡Turno Confirmado!</Text>

        <View style={styles.turnoCard}>
          <Text style={styles.turnoNumeroLabel}>Tu número de turno</Text>
          <Text style={styles.turnoNumero}>#{turno.numero}</Text>

          <View style={styles.divider} />

          <Row label="Nombre"    value={turno.nombre}    />
          <Row label="Documento" value={turno.documento} />
          <Row label="Servicio"  value={turno.servicio}  />
          <Row label="Hora"      value={`${turno.hora} — ${turno.fecha}`} />
        </View>

        <TouchableOpacity
          style={styles.btnVolver}
          onPress={() => navigation.navigate('ListaServicios')}
        >
          <Text style={styles.btnVolverText}>← Volver a servicios</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // ── Formulario ────────────────────────────────────────────────────────────
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>

      <View style={styles.servicioInfo}>
        <Text style={styles.servicioLabel}>Servicio seleccionado</Text>
        <Text style={styles.servicioNombre}>{servicio.nombre}</Text>
        <Text style={styles.servicioCupos}>🎫 {servicio.cupos} cupos restantes</Text>
      </View>

      {/* Campo 1: Nombre */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Nombre completo *</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ej: Juan Carlos Pérez"
          placeholderTextColor="#94A3B8"
          autoCapitalize="words"
        />
      </View>

      {/* Campo 2: Documento */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Documento / Código estudiantil *</Text>
        <TextInput
          style={styles.input}
          value={documento}
          onChangeText={setDocumento}
          placeholder="Ej: 1075234567"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
        />
      </View>

      {/* Campo 3: Servicio (prellenado, no editable) */}
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Servicio *</Text>
        <View style={styles.inputReadonly}>
          <Text style={styles.inputReadonlyText}>{servicio.nombre}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.btnSolicitar, loading && { opacity: 0.6 }]}
        onPress={solicitar}
        disabled={loading}
        activeOpacity={0.85}
      >
        {loading
          ? <ActivityIndicator color="#FFFFFF" />
          : <Text style={styles.btnSolicitarText}>Solicitar Turno</Text>
        }
      </TouchableOpacity>

    </ScrollView>
  )
}

// Componente fila de confirmación
function Row({ label, value }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:          { flex: 1, backgroundColor: '#F1F5F9', padding: 16 },

  servicioInfo:       { backgroundColor: '#1D4ED8', borderRadius: 12, padding: 16, marginBottom: 20 },
  servicioLabel:      { color: '#93C5FD', fontSize: 12, fontWeight: '600', marginBottom: 4 },
  servicioNombre:     { color: '#FFFFFF', fontSize: 18, fontWeight: '800', marginBottom: 4 },
  servicioCupos:      { color: '#BFDBFE', fontSize: 13 },

  inputGroup:         { marginBottom: 16 },
  inputLabel:         { fontSize: 13, fontWeight: '700', color: '#475569', marginBottom: 6 },
  input:              { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 14, fontSize: 15, color: '#1E293B', borderWidth: 1.5, borderColor: '#E2E8F0' },
  inputReadonly:      { backgroundColor: '#F8FAFC', borderRadius: 10, padding: 14, borderWidth: 1.5, borderColor: '#E2E8F0' },
  inputReadonlyText:  { fontSize: 15, color: '#64748B' },

  btnSolicitar:       { backgroundColor: '#1D4ED8', borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 8 },
  btnSolicitarText:   { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },

  // Confirmación
  confirmContainer:   { flex: 1, backgroundColor: '#F1F5F9', padding: 24, alignItems: 'center', justifyContent: 'center' },
  confirmIcon:        { fontSize: 64, marginBottom: 12 },
  confirmTitle:       { fontSize: 26, fontWeight: '900', color: '#1E293B', marginBottom: 24 },

  turnoCard:          { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, width: '100%', elevation: 3, marginBottom: 24 },
  turnoNumeroLabel:   { fontSize: 13, color: '#64748B', textAlign: 'center', marginBottom: 4 },
  turnoNumero:        { fontSize: 52, fontWeight: '900', color: '#1D4ED8', textAlign: 'center', marginBottom: 16 },
  divider:            { height: 1, backgroundColor: '#E2E8F0', marginBottom: 16 },

  row:                { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  rowLabel:           { fontSize: 13, color: '#64748B', fontWeight: '600' },
  rowValue:           { fontSize: 13, color: '#1E293B', fontWeight: '700', maxWidth: '60%', textAlign: 'right' },

  btnVolver:          { backgroundColor: '#1D4ED8', borderRadius: 12, paddingHorizontal: 32, paddingVertical: 16 },
  btnVolverText:      { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
})
