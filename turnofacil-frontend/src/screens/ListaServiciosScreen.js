// Pantalla 1 — Lista de servicios
// GET /api/servicios → muestra los 6 servicios disponibles

import { useEffect, useState } from 'react'
import {
  View, Text, FlatList, TouchableOpacity,
  StyleSheet, ActivityIndicator, Alert,
} from 'react-native'
import { getAPIUrl } from '../config'

const API = getAPIUrl() // Configuración centralizada

export default function ListaServiciosScreen({ navigation }) {
  const [servicios, setServicios] = useState([])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    fetch(`${API}/api/servicios`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setServicios(data.data)
        else Alert.alert('Error', 'No se pudieron cargar los servicios')
      })
      .catch(() => Alert.alert('Error de conexión', 'Verifica que el servidor esté corriendo'))
      .finally(() => setLoading(false))
  }, [])

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, item.cupos === 0 && styles.cardSinCupos]}
      onPress={() => navigation.navigate('DetalleServicio', { servicio: item })}
      activeOpacity={0.8}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardNombre}>{item.nombre}</Text>
        <View style={[styles.badge, item.cupos === 0 ? styles.badgeSinCupos : styles.badgeConCupos]}>
          <Text style={styles.badgeText}>
            {item.cupos === 0 ? 'Sin cupos' : `${item.cupos} cupos`}
          </Text>
        </View>
      </View>
      <Text style={styles.cardHorario}>🕐 {item.horario}</Text>
      <Text style={styles.cardUbicacion}>📍 {item.ubicacion}</Text>
      <Text style={styles.verDetalle}>Ver detalle →</Text>
    </TouchableOpacity>
  )

  if (loading) return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color="#1D4ED8" />
      <Text style={styles.loadingText}>Cargando servicios…</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Selecciona un servicio para ver el detalle y solicitar tu turno</Text>
      <FlatList
        data={servicios}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: '#F1F5F9', padding: 16 },
  centered:      { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText:   { marginTop: 12, color: '#64748B', fontSize: 15 },
  subtitle:      { color: '#64748B', fontSize: 13, marginBottom: 14, lineHeight: 18 },

  card:          { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 6 },
  cardSinCupos:  { opacity: 0.6, borderLeftWidth: 4, borderLeftColor: '#EF4444' },

  cardHeader:    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardNombre:    { fontSize: 16, fontWeight: '700', color: '#1E293B', flex: 1, marginRight: 8 },

  badge:         { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3 },
  badgeConCupos: { backgroundColor: '#DCFCE7' },
  badgeSinCupos: { backgroundColor: '#FEE2E2' },
  badgeText:     { fontSize: 11, fontWeight: '700', color: '#1E293B' },

  cardHorario:   { fontSize: 13, color: '#475569', marginBottom: 3 },
  cardUbicacion: { fontSize: 13, color: '#475569', marginBottom: 8 },
  verDetalle:    { fontSize: 13, color: '#1D4ED8', fontWeight: '600', textAlign: 'right' },
})
