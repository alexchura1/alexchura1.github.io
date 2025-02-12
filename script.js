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
    "La comida está deliciosa.",
    "El libro es muy interesante.",
    "Las flores son coloridas.",
    "El agua es transparente.",
    "El viento mueve las hojas.",
    "La música suena muy bien.",
    "El café está caliente.",
    "El gato duerme en el sofá.",
    "La luna ilumina la noche.",
    "El avión vuela muy alto.",
    "La película es emocionante.",
    "El teléfono suena constantemente.",
    "El reloj marca las doce.",
    "La puerta está abierta.",
    "El coche es muy rápido.",
    "La casa es muy grande.",
    "El árbol da sombra en verano."
  ],
  medio: [
    "La vida es una aventura llena de sorpresas.",
    "El conocimiento es la llave del éxito.",
    "La perseverancia es la clave del triunfo.",
    "Cada día es una nueva oportunidad.",
    "La felicidad se encuentra en las pequeñas cosas.",
    "El tiempo es el recurso más valioso.",
    "La amistad es un tesoro invaluable.",
    "La creatividad no tiene límites.",
    "El aprendizaje es un viaje sin fin.",
    "La paciencia es una virtud poderosa.",
    "El esfuerzo siempre tiene su recompensa.",
    "La confianza en uno mismo es fundamental.",
    "La naturaleza es fuente de inspiración.",
    "La honestidad es la base de toda relación.",
    "El respeto es esencial para la convivencia.",
    "La disciplina es el camino al éxito.",
    "La imaginación es más importante que el conocimiento.",
    "La gratitud transforma nuestra perspectiva.",
    "La resiliencia nos hace más fuertes.",
    "La simplicidad es la máxima sofisticación."
  ],
  dificil: [
    "En un lugar de la Mancha, de cuyo nombre no quiero acordarme...",
    "La libertad es el derecho a hacer lo que no perjudica a los demás.",
    "El hombre es dueño de su silencio y esclavo de sus palabras.",
    "La verdadera sabiduría está en reconocer la propia ignorancia.",
    "El arte es la expresión de los más profundos pensamientos.",
    "La historia es el testimonio de los tiempos, luz de la verdad.",
    "La filosofía es la ciencia que trata de la esencia de las cosas.",
    "La literatura es el reflejo del alma humana.",
    "La ciencia no tiene patria, porque el conocimiento pertenece a la humanidad.",
    "La música es el arte más directo, entra por el oído y va al corazón.",
    "La poesía es el sentimiento que le sobra al corazón y te sale por la mano.",
    "La belleza está en los ojos del que mira.",
    "La justicia es la reina de las virtudes republicanas.",
    "La duda es el principio de la sabiduría.",
    "La esperanza es el sueño del hombre despierto.",
    "La bondad es el lenguaje que los sordos pueden oír y los ciegos pueden ver.",
    "La humildad es la base de todas las virtudes.",
    "La valentía no es la ausencia de miedo, sino el triunfo sobre él.",
    "La educación es el arma más poderosa para cambiar el mundo.",
    "La paz no es la ausencia de conflicto, sino la capacidad de manejarlo."
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