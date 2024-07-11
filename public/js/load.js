export function LoadPages() {
  const tokenData = localStorage.getItem('gapi_token');
  const currentPath = window.location.pathname;

  if (!tokenData && currentPath !== '/') {
    window.location.href = '/'; // Redirige a la página de inicio si no se encuentra el token
  } else if (tokenData) {
    try {
      const parsedData = JSON.parse(tokenData);
      const currentTime = Date.now();
      const tokenAge = (currentTime - parsedData.received_at) / 1000; // Convertimos a segundos

      if (tokenAge > parsedData.expires_in) {
        console.log('Token ha expirado');
        window.location.href = '/'; // Redirige a la página de inicio si el token ha expirado
      } else {
        console.log('Access token:', parsedData.access_token);
        // Aquí puedes agregar cualquier lógica adicional que necesites
      }
    } catch (e) {
      console.error('Error al parsear JSON del token', e);
      if (currentPath !== '/') {
        window.location.href = '/'; // Redirige a la página de inicio si hay un error
      }
    }
  }
}
