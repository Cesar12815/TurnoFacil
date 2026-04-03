// ─── CONFIGURACIÓN DE API ─────────────────────────────────────────────────────
// Ajusta según tu ambiente de desarrollo

export const API_CONFIG = {
  // Para emulador de Android
  ANDROID_EMULATOR: 'http://10.0.2.2:3001',
  
  // Para dispositivo físico (reemplaza X con tu IP local)
  // Obtén tu IP con: ipconfig (Windows) o ifconfig (Mac/Linux)
  PHYSICAL_DEVICE: 'http://192.168.1.100:3001',  // ← CAMBIAR POR TU IP
  
  // Para iOS
  IOS: 'http://localhost:3001',
};

// Detecta automáticamente el ambiente (OPCIONAL)
export const getAPIUrl = () => {
  // Cambia manualmente según tu ambiente
  return API_CONFIG.ANDROID_EMULATOR;
  
  // O descomenta para usar dispositivo físico:
  // return API_CONFIG.PHYSICAL_DEVICE;
};
