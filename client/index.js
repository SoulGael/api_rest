const apiUrl = 'http://localhost:3001/api/login'; // ajusta según tu ruta

async function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const messageEl = document.getElementById('message');

  messageEl.textContent = 'Validando...';

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const json = await res.json();

    if (res.ok && json.response?.token) {
      localStorage.setItem('token', json.response.token);
      messageEl.textContent = '✅ Sesión iniciada correctamente';

      // redirigir después de un pequeño delay
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    } else {
      messageEl.textContent = '❌ Usuario o contraseña inválidos';
    }
  } catch (err) {
    console.error('Error:', err);
    messageEl.textContent = '❌ Error de conexión con el servidor';
  }
}