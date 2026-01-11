$(document).ready(function() {
    console.log("¡Todo listo! El sistema de La Tribu está operando. 🚀");

    // ==========================================
    // 1. AUTOMATIZACIÓN DE BREADCRUMBS 🧭
    // ==========================================
    /* 
       Con este bloque evito escribir el nombre de la clase dos veces.
       Busco cuál es el aprendizaje activo en el menú lateral y lo 
       copio arriba en el Breadcrumb automáticamente.
    */
    const leccionActiva = $('.tree-menu .text-primary').text().trim();
    if (leccionActiva) {
        $('#breadcrumb-lesson').text(leccionActiva);
    }


    // ==========================================
    // 2. REPRODUCTOR DE VIDEO-AUDIO DINÁMICO 🎬🎧
    // ==========================================
    /*
       Aquí manejo toda la magia del reproductor que parece video.
       Sincronizo el tiempo, la barra verde y los botones.
    */
    const miAudio = document.getElementById('audioPodcast');
    const barraVerde = $('#v-progressFill');
    const tiempoActual = $('#v-currentTime');
    const tiempoTotal = $('#v-duration');
    const contenedorBarra = $('#v-progressBar');
    const overlayNegro = $('#mainPlayOverlay');

    if (miAudio) {
        
        // Apenas carga el audio, calculo cuánto dura para mostrarlo
        miAudio.onloadedmetadata = function() {
            tiempoTotal.text(formatearTiempo(miAudio.duration));
        };

        // Mientras el audio suena, muevo la barrita y actualizo el segundero
        miAudio.ontimeupdate = function() {
            let porcentaje = (miAudio.currentTime / miAudio.duration) * 100;
            barraVerde.css('width', porcentaje + '%');
            tiempoActual.text(formatearTiempo(miAudio.currentTime));
        };

        // --- 🖱️ Lógica para saltar en el audio (Seeking) ---
        contenedorBarra.click(function(e) {
            const anchoTotal = $(this).width();
            const clickX = e.pageX - $(this).offset().left;
            const nuevoPorcentaje = clickX / anchoTotal;
            
            // Muevo el audio al punto donde el usuario hizo click
            miAudio.currentTime = nuevoPorcentaje * miAudio.duration;
        });

        // --- ⏯️ Control de Play y Pausa (Central y Pequeño) ---
        $('#mainPlayOverlay, #btnVideoPlay').click(function() {
            if (miAudio.paused) {
                miAudio.play();
                
                // Activo el efecto de "Fade" para que la imagen se aclare
                overlayNegro.addClass('video-player__overlay--playing');
                
                // Cambio los iconos de Play por los de Pausa (central y barra)
                $('#v-iconPlay, #v-mainIconPlay').addClass('d-none');
                $('#v-iconPause, #v-mainIconPause').removeClass('d-none');
            } else {
                miAudio.pause();
                
                // Saco el efecto de "Fade" para que vuelva la sombra negra
                overlayNegro.removeClass('video-player__overlay--playing');
                
                // Vuelvo a poner los iconos de Play
                $('#v-iconPlay, #v-mainIconPlay').removeClass('d-none');
                $('#v-iconPause, #v-mainIconPause').addClass('d-none');
            }
        });

        // Si el audio llega al final, reseteo todo para que el usuario pueda darle Play de nuevo
        miAudio.onended = function() {
            overlayNegro.removeClass('video-player__overlay--playing');
            $('#v-iconPlay, #v-mainIconPlay').removeClass('d-none');
            $('#v-iconPause, #v-mainIconPause').addClass('d-none');
            barraVerde.css('width', '0%');
        };

        // Función auxiliar para que los segundos se vean como reloj (00:00)
        function formatearTiempo(segundos) {
            let min = Math.floor(segundos / 60);
            let sec = Math.floor(segundos % 60);
            return (min < 10 ? '0' : '') + min + ":" + (sec < 10 ? '0' : '') + sec;
        }
    }
});