document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('song');
    const loader = document.querySelector('.loader');
    const lyrics = document.querySelectorAll('.lyric-line');
  
    // Array con los tiempos en segundos para cada línea de la letra
    const lyricTimes = [
      0,      // "Quiero"
      2.5,    // "Parar un momento"
      6.5,    // "Soñar que estoy dentro"
      11.5,   // "De tus ojos"
      17.5,   // "Quiero"
      20.5,   // "Soñar que te beso"
      25.5,   // "Después darme cuenta"
      28.5,   // "Que sigo despierto"
      31,     // "Y no me la creo"
      34,     // "Que tú estás aquí"
      37.5,   // "Simulando que no dices nada"
      43,     // "Y yo siento así"
      48.5,   // "Diez mil palabras"
      51,     // "Yo no te pido que seas normal..."
      55,     // "Que seas intensa cuando amanezca"
      58,     // "Que estés tan loca como tú quieras"
      61,     // "Como tú sientas, como tú estés"
      65.5,     // "Como tú sepas que solo eres tú"
      68,     // "Que digas todo sin preguntar..."
      71,     // "Que tengas miedo cuando te asustes"
      75,     // "Que sueltes lágrimas si te lucen"
      78,     // "Que rompas todo si es necesario"
      81,     // "Los dos estamos para arreglarlo"
      85,     // "Que a mí me gustas tal como eres"
      88,     // "A mí me gustas tal como estás"
      91,     // "Es la verdad"
      95.5,   // "Así"
      99.5,   // "Sin maquillar"
      105,     // "Es la verdad"
      109.5,   // "Así"
      113.5,   // "Sin maquillar"
      117,     // "Feliz San Valentin Mi Niña :3"
      120 
    ];

    // Verifica que el audio y el loader existan
    if (!audio || !loader) return;

    const hideLoader = () => {
        loader.style.display = 'none';
        document.body.classList.remove("not-loaded");
    };

    audio.addEventListener('loadeddata', hideLoader); // Cuando los datos iniciales están cargados
    audio.addEventListener('canplay', hideLoader); // Cuando puede reproducirse
    audio.addEventListener('canplaythrough', hideLoader); // Cuando puede reproducirse sin interrupciones
    
    // 2. Timeout de respaldo por si falla la carga
    const backupTimeout = setTimeout(hideLoader, 5000); // 5 segundos máximo
    
    // 3. Manejar errores
    audio.addEventListener('error', () => {
        clearTimeout(backupTimeout);
        hideLoader();
    });

    let isPlaying = false;
    const handlePlayPause = () => {
        if (!isPlaying) {
            audio.play().catch(err => console.log("Esperando interacción..."));
            isPlaying = true;
        } else {
            audio.pause();
            isPlaying = false;
        }
    };
    
    // Agregar ambos tipos de eventos para móvil/desktop
    document.body.addEventListener('click', handlePlayPause);
    document.body.addEventListener('touchstart', handlePlayPause);

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        lyrics.forEach((lyric, index) => {
            if (currentTime >= lyricTimes[index] && currentTime < lyricTimes[index + 1]) {
                lyric.classList.add('active');
    
                if (index > 0) {
                    lyrics[index - 1].classList.remove('active');
                    lyrics[index - 1].classList.add('exit');
                }
            } else {
                lyric.classList.remove('active');
                lyric.classList.remove('exit');
            }
        });
    });
});

  
  
  
