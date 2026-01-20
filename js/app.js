$(document).ready(function() {
    console.log("¡Todo listo en La Tribu! El código está corriendo. 🚀");

// ==========================================
    // 1. BREADCRUMBS AUTOMÁTICOS 🧭
    // ==========================================
    /* 
       Aquí busco el nombre de la lección en el menú lateral.
       Busco específicamente el link que tiene la clase 'text-primary' 
       porque ese es el que yo dejé marcado como "activo".
    */
    // Intento pillar el texto del link azul en el menú lateral
    const leccionActiva = $('.tree-menu .text-primary').first().text().trim();

    // Si lo pillo y no está vacío, lo pongo en el Breadcrumb
    if (leccionActiva && leccionActiva !== "") {
        $('#breadcrumb-lesson').text(leccionActiva);
        console.log("Pillé la lección: " + leccionActiva); // Esto es para que yo vea en la consola si funcionó
    } else {
        // Si por alguna razón no lo pilla, le pongo un nombre por defecto para que no se vea el "..."
        $('#breadcrumb-lesson').text("Educación Financiera");
    }

    // ==========================================
    // 2. REPRODUCTOR DE AUDIO Y VIDEO 🎬🎧
    // ==========================================
    const miAudio = document.getElementById('audioPodcast');
    const barraVerde = $('#v-progressFill');
    const tiempoActual = $('#v-currentTime');
    const tiempoTotal = $('#v-duration');
    const contenedorBarra = $('#v-progressBar');
    const overlayNegro = $('#mainPlayOverlay');

    if (miAudio) {
        
        // Cargo la duración total del audio apenas esté listo
        miAudio.onloadedmetadata = function() {
            tiempoTotal.text(formatearTiempo(miAudio.duration));
        };

        // Actualizo la barrita y el segundero mientras suena
        miAudio.ontimeupdate = function() {
            let porcentaje = (miAudio.currentTime / miAudio.duration) * 100;
            barraVerde.css('width', porcentaje + '%');
            tiempoActual.text(formatearTiempo(miAudio.currentTime));
        };

        // Poder saltar a cualquier parte haciendo click en la barra
        contenedorBarra.click(function(e) {
            const anchoTotal = $(this).width();
            const clickX = e.pageX - $(this).offset().left;
            const nuevoPorcentaje = clickX / anchoTotal;
            miAudio.currentTime = nuevoPorcentaje * miAudio.duration;
        });

        // Función para Play/Pausa unificada
        function togglePlay() {
            if (miAudio.paused) {
                miAudio.play();
                overlayNegro.addClass('video-player__overlay--playing');
                // Iconos del reproductor grande
                $('#v-iconPlay, #v-mainIconPlay').addClass('d-none');
                $('#v-iconPause, #v-mainIconPause').removeClass('d-none');
                // Iconos del reproductor móvil
                $('#m-iconPlay').addClass('d-none');
                $('#m-iconPause').removeClass('d-none');
            } else {
                miAudio.pause();
                overlayNegro.removeClass('video-player__overlay--playing');
                // Iconos grande
                $('#v-iconPlay, #v-mainIconPlay').removeClass('d-none');
                $('#v-iconPause, #v-mainIconPause').addClass('d-none');
                // Iconos móvil
                $('#m-iconPlay').removeClass('d-none');
                $('#m-iconPause').addClass('d-none');
            }
        }

        // Eventos de Play/Pausa
        $('#mainPlayOverlay, #btnVideoPlay, #btnMobilePlay').click(function() {
            togglePlay();
        });

        // Al terminar el audio, reseteo los íconos
        miAudio.onended = function() {
            overlayNegro.removeClass('video-player__overlay--playing');
            $('.bi-play-fill, #v-mainIconPlay, #m-iconPlay').removeClass('d-none');
            $('.bi-pause-fill, #v-mainIconPause, #m-iconPause').addClass('d-none');
            barraVerde.css('width', '0%');
        };

        // ==========================================
        // 3. CONTROLES ESPECÍFICOS MÓVIL 📱
        // ==========================================
        
        // Saltos de 15 segundos
        $('#btnBack15').click(function() {
            miAudio.currentTime = Math.max(0, miAudio.currentTime - 15);
        });

        $('#btnForward15').click(function() {
            miAudio.currentTime = Math.min(miAudio.duration, miAudio.currentTime + 15);
        });

        // Reiniciar
        $('#btnRestart').click(function() {
            miAudio.currentTime = 0;
            if (miAudio.paused) togglePlay(); // Que empiece a sonar si estaba pausado
        });

        // Velocidad (Ciclo: 1x -> 1.5x -> 2x)
        let velocidades = [1, 1.5, 2];
        let vIndex = 0;
        $('#btnSpeed').click(function() {
            vIndex = (vIndex + 1) % velocidades.length;
            miAudio.playbackRate = velocidades[vIndex];
            $(this).text(velocidades[vIndex] + 'x');
        });

        // Función para convertir segundos en 00:00
        function formatearTiempo(segundos) {
            let min = Math.floor(segundos / 60);
            let sec = Math.floor(segundos % 60);
            return (min < 10 ? '0' : '') + min + ":" + (sec < 10 ? '0' : '') + sec;
        }
    }
});