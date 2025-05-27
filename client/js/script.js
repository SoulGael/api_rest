const apiUrl = 'http://localhost:3001/api';

if (!localStorage.getItem('token')) {
  alert('Usuario no autenticado');
  window.location.href = 'index.html';
}

const token = localStorage.getItem('token');
const titleEl = document.getElementById('title');
const listEl = document.getElementById('dataList');

async function fetchAndRender(endpoint, label) {
  console.log('🚀 ~ fetchAndRender ~ endpoint, label:', endpoint, label);
  titleEl.textContent = `Listado de ${label}`;
  listEl.innerHTML = '<li>Cargando...</li>';

  try {
    const res = await fetch(`${apiUrl}/${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const json = await res.json();
    const responseData = json.response || json;

    listEl.innerHTML = '';

    if (!responseData.success) {
      listEl.innerHTML = `<li>${!responseData.message}</li>`;
      return;
    }

    if(responseData.data.length === 0){
      listEl.innerHTML = '<li>No hay registros</li>';
      return;
    }

    responseData.data.forEach(item => {
      listEl.innerHTML += `<li><strong>${item.name || item.completeName}</strong> - ${item.email || item.job || ''}</li>`;
    });
  } catch (err) {
    listEl.innerHTML = `<li>Error al cargar datos: ${err.message}</li>`;
  }
}

function loadUsers() {
  fetchAndRender('users', 'Usuarios');
}

function loadParents() {
  fetchAndRender('parents', 'Parents');
}

function closeSession() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}