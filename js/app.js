$(document).ready(function() {
    console.log("El sistema está listo y operando. 🚀");

    // ==========================================
    // 1. LÓGICA GLOBAL DEL PODCAST 🎧
    // ==========================================
    /* 
       Funciona en cualquier página (1, 2 o 3) siempre que 
       los elementos tengan los IDs: #btnPlayPodcast y #audioPodcast
    */
    
    const btnPodcast = $('#btnPlayPodcast');
    const audio = document.getElementById('audioPodcast'); 

    // Verificamos si existe el audio en esta página antes de ejecutar
    if (audio) {
        btnPodcast.click(function() {
            if (audio.paused) {
                // Si está pausado, le damos Play
                audio.play();
                // Ocultar Play, Mostrar Pause
                $('#iconPlay').addClass('d-none');
                $('#iconPause').removeClass('d-none');
            } else {
                // Si está sonando, le damos Pause
                audio.pause();
                // Mostrar Play, Ocultar Pause
                $('#iconPlay').removeClass('d-none');
                $('#iconPause').addClass('d-none');
            }
        });

        // Cuando el audio termina solo, volver al icono de Play
        audio.onended = function() {
            $('#iconPlay').removeClass('d-none');
            $('#iconPause').addClass('d-none');
        };
    }


});