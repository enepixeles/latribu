// --- LÓGICA DEL PODCAST ---
    
    // Seleccionamos el botón y el audio
    const btnPodcast = $('#btnPlayPodcast');
    const audio = document.getElementById('audioPodcast'); // Usamos JS nativo para controlar el audio
    
    // Al hacer clic en el botón
    btnPodcast.click(function() {
        if (audio.paused) {
            // Si está pausado, le damos Play
            audio.play();
            // Cambiamos los iconos (Ocultar Play, Mostrar Pause)
            $('#iconPlay').addClass('d-none');
            $('#iconPause').removeClass('d-none');
        } else {
            // Si está sonando, le damos Pause
            audio.pause();
            // Cambiamos los iconos (Mostrar Play, Ocultar Pause)
            $('#iconPlay').removeClass('d-none');
            $('#iconPause').addClass('d-none');
        }
    });

    // Opcional: Cuando el audio termine solo, volver al icono de Play
    audio.onended = function() {
        $('#iconPlay').removeClass('d-none');
        $('#iconPause').addClass('d-none');
    };






    