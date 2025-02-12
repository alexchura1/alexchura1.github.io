const inicioElement = document.getElementById('inicio');
const juegoElement = document.getElementById('juego');
const resultadosElement = document.getElementById('resultados');
const nombreInput = document.getElementById('nombre');
const dificultadSelect = document.getElementById('dificultad');
const comenzarButton = document.getElementById('comenzar');
const tituloJuegoElement = document.getElementById('titulo-juego');
const fraseElement = document.getElementById('frase');
const entradaElement = document.getElementById('entrada');
const resultadoElement = document.getElementById('resultado');
const tiempoRestanteElement = document.getElementById('tiempo-restante');
const precisionActualElement = document.getElementById('precision-actual');
const puntajeElement = document.getElementById('puntaje');
const resultadoFinalElement = document.getElementById('resultado-final');
const reiniciarButton = document.getElementById('reiniciar');
const dificultadJuegoElement = document.getElementById('dificultad-juego');
const dificultadResultadoElement = document.getElementById('dificultad-resultado');
const toggleModoOscuro = document.getElementById('toggleModoOscuro');

let jugadorNombre = '';
let dificultad = 'facil';
let tiempoRestante = 300; // 5 minutos en segundos
let intervalo;
let puntajeTotal = 0;
let oracionesCompletadas = 0;
let oracionesMezcladas = [];
let indiceOracionActual = 0;

// Textos de literatura por dificultad
const textos = {
  facil: [
    "El sol brilla en el cielo.",
    "Los niños juegan en el parque.",
    "El perro corre por el jardín.",
    // ... (añade todas las oraciones fáciles)
  ],
  medio: [
    "La vida es una aventura llena de sorpresas.",
    "El conocimiento es la llave del éxito.",
    "La perseverancia es la clave del triunfo.",
    // ... (añade todas las oraciones medias)
  ],
  dificil: [
    "En un lugar de la Mancha, de cuyo nombre no quiero acordarme...",
    "La libertad es el derecho a hacer lo que no perjudica a los demás.",
    "El hombre es dueño de su silencio y esclavo de sus palabras.",
    // ... (añade todas las oraciones difíciles)
  ]
};

// Función para mezclar un array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Selecciona una oración sin repetición
function seleccionarOracion() {
  if (indiceOracionActual >= oracionesMezcladas.length) {
    indiceOracionActual = 0; // Reinicia el índice si se acaban las oraciones
    oracionesMezcladas = shuffleArray([...oracionesMezcladas]); // Mezcla de nuevo
  }
  return oracionesMezcladas[indiceOracionActual++];
}

// Inicia el juego
function iniciarJuego() {
  jugadorNombre = nombreInput.value.trim();
  dificultad = dificultadSelect.value;

  if (!jugadorNombre) {
    alert("Por favor, ingresa tu nombre.");
    return;
  }

  // Mezcla las oraciones al inicio
  oracionesMezcladas = shuffleArray([...textos[dificultad]]);
  indiceOracionActual = 0;

  // Cambia a la pantalla del juego
  inicioElement.style.display = 'none';
  juegoElement.style.display = 'block';
  resultadosElement.style.display = 'none';
  tituloJuegoElement.textContent = `¡Bienvenido, ${jugadorNombre}!`;
  dificultadJuegoElement.textContent = `Dificultad: ${dificultad.toUpperCase()}`; // Muestra la dificultad

  // Configura el juego
  fraseElement.textContent = seleccionarOracion();
  entradaElement.value = '';
  resultadoElement.textContent = '';
  tiempoRestante = 300;
  puntajeTotal = 0;
  oracionesCompletadas = 0;
  actualizarTiempo();
  precisionActualElement.textContent = "Precisión actual: 0%";
  puntajeElement.textContent = "Puntaje acumulado: 0%";

  // Inicia el temporizador
  intervalo = setInterval(() => {
    tiempoRestante--;
    actualizarTiempo();

    if (tiempoRestante <= 0) {
      clearInterval(intervalo);
      finalizarJuego();
    }
  }, 1000);

  entradaElement.focus();
}

// Actualiza el tiempo restante
function actualizarTiempo() {
  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = tiempoRestante % 60;
  tiempoRestanteElement.textContent = `Tiempo restante: ${minutos}:${segundos.toString().padStart(2, '0')}`;
}

// Verifica la entrada del usuario
entradaElement.addEventListener('input', () => {
  const frase = fraseElement.textContent;
  const entrada = entradaElement.value;

  if (entrada === frase) {
    oracionesCompletadas++;
    const precision = calcularPrecision(frase, entrada);
    puntajeTotal += precision;
    precisionActualElement.textContent = `Precisión actual: ${precision.toFixed(2)}%`;
    puntajeElement.textContent = `Puntaje acumulado: ${puntajeTotal.toFixed(2)}%`;
    fraseElement.textContent = seleccionarOracion();
    entradaElement.value = '';
  }
});

// Calcula la precisión
function calcularPrecision(frase, entrada) {
  let correctas = 0;
  for (let i = 0; i < frase.length; i++) {
    if (frase[i] === entrada[i]) {
      correctas++;
    }
  }
  return (correctas / frase.length) * 100;
}

// Finaliza el juego
function finalizarJuego() {
  juegoElement.style.display = 'none';
  resultadosElement.style.display = 'block';
  const puntajeFinal = oracionesCompletadas > 0 ? (puntajeTotal / oracionesCompletadas).toFixed(2) : 0;
  resultadoFinalElement.textContent = `¡Fin del juego! Puntaje final: ${puntajeFinal}%`;
  dificultadResultadoElement.textContent = `Dificultad: ${dificultad.toUpperCase()}`; // Muestra la dificultad en los resultados
}

// Reinicia el juego
reiniciarButton.addEventListener('click', () => {
  inicioElement.style.display = 'block';
  resultadosElement.style.display = 'none';
});

// Comienza el juego al hacer clic en "Comenzar"
comenzarButton.addEventListener('click', iniciarJuego);

// Deshabilitar pegar en el campo de entrada
entradaElement.addEventListener('paste', (e) => {
  e.preventDefault();
  alert("¡No se permite pegar texto!");
});

// Deshabilitar selección de texto en el campo de entrada
entradaElement.addEventListener('select', (e) => {
  e.preventDefault();
});

// Cambiar entre modo claro y oscuro
toggleModoOscuro.addEventListener('change', () => {
  document.body.setAttribute('data-theme', toggleModoOscuro.checked ? 'dark' : 'light');
});