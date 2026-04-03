// Pantalla 2 — Detalle del servicio
// Muestra los 4 datos mínimos: nombre, descripción, cupos, horario
// Si cupos = 0 → bloquea el botón de solicitar turno

import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

export default function DetalleServicioScreen({ route, navigation }) {
  const { servicio } = route.params
  const sinCupos = servicio.cupos === 0

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>

      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.nombre}>{servicio.nombre}</Text>
        <View style={[styles.badge, sinCupos ? styles.badgeSinCupos : styles.badgeConCupos]}>
          <Text style={styles.badgeText}>
            {sinCupos ? '❌ Sin cupos disponibles' : `✅ ${servicio.cupos} cupos disponibles`}
          </Text>
        </View>
      </View>

      {/* Los 4 datos mínimos que pide el taller */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📄 Descripción</Text>
        <Text style={styles.sectionText}>{servicio.descripcion}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🕐 Horario de atención</Text>
        <Text style={styles.sectionText}>{servicio.horario}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Ubicación</Text>
        <Text style={styles.sectionText}>{servicio.ubicacion}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎫 Cupos disponibles hoy</Text>
        <Text style={[styles.cuposNum, sinCupos && { color: '#EF4444' }]}>
          {servicio.cupos}
        </Text>
      </View>

      {/* Botón — bloqueado si no hay cupos */}
      {sinCupos ? (
        <View style={styles.btnBloqueado}>
          <Text style={styles.btnBloqueadoText}>Sin cupos — No es posible solicitar turno</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.btnSolicitar}
          onPress={() => navigation.navigate('SolicitarTurno', { servicio })}
          activeOpacity={0.85}
        >
          <Text style={styles.btnSolicitarText}>🎫 Solicitar Turno</Text>
        </TouchableOpacity>
      )}

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:          { flex: 1, backgroundColor: '#F1F5F9', padding: 16 },

  header:             { backgroundColor: '#1D4ED8', borderRadius: 14, padding: 20, marginBottom: 16 },
  nombre:             { fontSize: 22, fontWeight: '800', color: '#FFFFFF', marginBottom: 12 },

  badge:              { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5, alignSelf: 'flex-start' },
  badgeConCupos:      { backgroundColor: '#DCFCE7' },
  badgeSinCupos:      { backgroundColor: '#FEE2E2' },
  badgeText:          { fontSize: 13, fontWeight: '700', color: '#1E293B' },

  section:            { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 1 },
  sectionTitle:       { fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 6, letterSpacing: 0.3 },
  sectionText:        { fontSize: 15, color: '#1E293B', lineHeight: 22 },

  cuposNum:           { fontSize: 36, fontWeight: '900', color: '#1D4ED8' },

  btnSolicitar:       { backgroundColor: '#1D4ED8', borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 8 },
  btnSolicitarText:   { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },

  btnBloqueado:       { backgroundColor: '#E2E8F0', borderRadius: 12, padding: 18, alignItems: 'center', marginTop: 8 },
  btnBloqueadoText:   { color: '#94A3B8', fontSize: 14, fontWeight: '600', textAlign: 'center' },
})
