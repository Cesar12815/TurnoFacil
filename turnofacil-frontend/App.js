// App.js — TurnoFácil
// Navegación entre las 3 pantallas del MVP

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import ListaServiciosScreen  from './src/screens/ListaServiciosScreen'
import DetalleServicioScreen from './src/screens/DetalleServicioScreen'
import SolicitarTurnoScreen  from './src/screens/SolicitarTurnoScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ListaServicios"
        screenOptions={{
          headerStyle:     { backgroundColor: '#1D4ED8' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{ fontWeight: 'bold', fontSize: 18 },
        }}
      >
        <Stack.Screen
          name="ListaServicios"
          component={ListaServiciosScreen}
          options={{ title: '📋 TurnoFácil — Servicios' }}
        />
        <Stack.Screen
          name="DetalleServicio"
          component={DetalleServicioScreen}
          options={{ title: 'Detalle del Servicio' }}
        />
        <Stack.Screen
          name="SolicitarTurno"
          component={SolicitarTurnoScreen}
          options={{ title: 'Solicitar Turno' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
