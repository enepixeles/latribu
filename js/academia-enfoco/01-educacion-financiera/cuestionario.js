$(document).ready(function() {

    // Verificamos si existe el contenedor del cuestionario antes de ejecutar
    if ($('#quizModule').length === 0) return;

    // ==========================================
    // 1. BANCO DE PREGUNTAS (DATA)
    // ==========================================

    // --- SET 1: Aprendizaje 1 (El poder de anotar) ---
    const quizData1 = [
        {
            question: "Según la clasificación del texto, ¿en qué categoría se ubicaría el pago mensual de la cuenta del agua potable?",
            options: ["Esencial", "Innecesario", "Ocasional", "Ajustable"],
            correctAnswer: 0, 
            hint: "Piensa si puedes vivir cómodamente sin este servicio."
        },
        {
            question: "Una suscripción a una plataforma de streaming que no usas mucho sería un gasto...",
            options: ["Esencial", "Ajustable", "Innecesario", "Fijo"],
            correctAnswer: 2,
            hint: "Si lo puedes cortar sin afectar tu vida básica, ¿qué tipo de gasto es?"
        },
        {
            question: "El costo de la bencina para ir al trabajo es un gasto:",
            options: ["Ocasional", "Esencial", "Innecesario", "De Lujo"],
            correctAnswer: 1,
            hint: "Si no puedes llegar a tu trabajo sin este gasto, es fundamental."
        },
        {
            question: "Comprar ropa de marca en lugar de una opción más económica es un ejemplo de gasto:",
            options: ["Esencial", "Ajustable", "Fijo", "Imprevisto"],
            correctAnswer: 1,
            hint: "Necesitas ropa (esencial), pero la cantidad que gastas puede variar (ajustable)."
        }
    ];

    // --- SET 2: Aprendizaje 2 (Tipos de Gastos) ---
    const quizData2 = [
        {
            question: "El pago del arriendo o dividendo de tu casa, ¿a qué categoría pertenece?",
            options: ["Gasto Ajustable", "Gasto Esencial", "Gasto Innecesario"],
            correctAnswer: 1, // Esencial
            hint: "Es fundamental para vivir. Si no lo pagas, las consecuencias son inmediatas."
        },
        {
            question: "Decidir comprar una marca de arroz más económica para ahorrar esta semana es un ejemplo de:",
            options: ["Ajustar un gasto", "Eliminar un gasto esencial", "Un gasto hormiga"],
            correctAnswer: 0, // Ajustar
            hint: "Es un gasto importante (alimentación) pero flexible en su monto."
        },
        {
            question: "Un antojo o compra por impulso que no estaba planificado se considera:",
            options: ["Gasto Esencial", "Gasto Ajustable", "Gasto Innecesario/Gustito"],
            correctAnswer: 2, // Innecesario
            hint: "Podemos sobrevivir sin ello y no estaba en la planificación."
        }
    ];

    // --- SET 3: Aprendizaje 3 (El Trío del Terror) ---
    const quizData3 = [
        {
            question: "Si dejas la luz de la pieza prendida todo el día sin haber nadie, ¿qué gasto es?",
            options: ["Hormiga", "Vampiro", "Fantasma"],
            correctAnswer: 1, // Vampiro
            hint: "Chupa energía y sube tu cuenta mensual en silencio."
        },
        {
            question: "Ese chocolate que compraste de camino a casa por impulso es un:",
            options: ["Gasto Hormiga", "Gasto Esencial", "Gasto Fantasma"],
            correctAnswer: 0, // Hormiga
            hint: "Es un gasto pequeño que parece inofensivo."
        },
        {
            question: "¿Qué debes hacer con un Gasto Fantasma (como un seguro que no usas)?",
            options: ["Dejarlo pasar porque es poco", "Llamar y cancelarlo de inmediato", "Esperar un año"],
            correctAnswer: 1, // Cancelar
            hint: "Si no lo usas, es dinero perdido. ¡Actúa!"
        }
    ];

    // --- SET 4: Aprendizaje 4 (Ingresos) ---
    const quizData4 = [
        {
            question: "Si vendí una torta y me pagaron $10.000, ¿eso es un ingreso?",
            options: ["No, porque no es mi sueldo mensual", "Sí, es dinero que entró a mi bolsillo"],
            correctAnswer: 1, // Sí
            hint: "Todo lo que entra a tu 'balde' cuenta, sea fijo o variable."
        },
        {
            question: "Si tengo un negocio de costura, ¿qué es lo más recomendable?",
            options: ["Tener una caja para la casa y otra para el negocio", "Usar toda la plata junta"],
            correctAnswer: 0, // Cajas separadas
            hint: "Así no te confundes y sabes si tu negocio deja ganancia real."
        }
    ];

    // ==========================================
    // 2. DETECCIÓN INTELIGENTE DE PÁGINA
    // ==========================================
    
    let activeQuizData = [];
    const path = window.location.pathname;

    // El orden importa: busca las más específicas primero (-4, -3, -2)
    if (path.includes('academia-enfoco-4.html')) {
        console.log("Cargando Cuestionario: Clase 4 (Ingresos)");
        activeQuizData = quizData4;
    } 
    else if (path.includes('academia-enfoco-3.html')) {
        console.log("Cargando Cuestionario: Clase 3 (Monstruos)");
        activeQuizData = quizData3;
    } 
    else if (path.includes('academia-enfoco-2.html')) {
        console.log("Cargando Cuestionario: Clase 2 (Tipos de Gastos)");
        activeQuizData = quizData2;
    } 
    else if (path.includes('academia-enfoco.html')) {
        console.log("Cargando Cuestionario: Clase 1 (Introducción)");
        activeQuizData = quizData1;
    } 
    else {
        // Si no coincide con ninguna, salimos para no dar errores
        return; 
    }

    // ==========================================
    // 3. LÓGICA DEL CUESTIONARIO (GENÉRICA)
    // ==========================================

    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestion() {
        // Pantalla Final (Resultados)
        if (currentQuestionIndex >= activeQuizData.length) {
            $('#quizModule').html(`
                <div class="text-center py-4">
                    <h4 class="fw-bold text-center">¡Cuestionario completado! 🎉</h4>
                    <p class="text-center fs-3">Tu puntaje: ${score} de ${activeQuizData.length}</p>
                    <div class="text-center mt-3">
                        <a href="#" onClick="window.location.reload()" class="btn btn-primary rounded-pill px-4">Volver a intentar</a>
                    </div>
                </div>
            `);
            return;
        }

        const currentQuestion = activeQuizData[currentQuestionIndex];
        
        // Renderizado de textos
        $('#quizProgress').text(`${currentQuestionIndex + 1} / ${activeQuizData.length}`);
        $('#quizQuestion').text(currentQuestion.question);
        $('#hintText').text(currentQuestion.hint);
        $('#quizOptions').empty(); 

        // Generar botones de opciones
        currentQuestion.options.forEach((option, index) => {
            $('#quizOptions').append(
                `<button class="quiz-option p-3" data-index="${index}">${String.fromCharCode(65 + index)}. ${option}</button>`
            );
        });

        $('#btnNextQuestion').prop('disabled', true);
        
        // Estilos CSS Inline (Para asegurar diseño si falla el SASS)
        $('.quiz-option').css({
            'display': 'block', 
            'width': '100%', 
            'text-align': 'left',
            'background-color': '#f8f9fa', 
            'border': '1px solid #dee2e6',
            'border-radius': '0.75rem', 
            'margin-bottom': '10px', 
            'transition': 'all 0.2s'
        });
    }

    // Evento: Click en una Opción
    $('#quizOptions').on('click', '.quiz-option', function() {
        // Resetear estilos de todas
        $('.quiz-option').css({'background-color': '#f8f9fa', 'color': 'black', 'border-color': '#dee2e6'}).removeClass('selected');
        
        // Pintar la seleccionada de azul
        $(this).css({'background-color': '#0d6efd', 'color': 'white'}).addClass('selected');
        
        $('#btnNextQuestion').prop('disabled', false); // Activar botón Siguiente
    });

    // Evento: Click en Siguiente
    $('#btnNextQuestion').on('click', function() {
        const selectedOption = $('.quiz-option.selected');
        if (selectedOption.length === 0) return;

        const answerIndex = parseInt(selectedOption.data('index'));
        const correctIndex = activeQuizData[currentQuestionIndex].correctAnswer;

        // Validar respuesta
        if (answerIndex === correctIndex) {
            score++;
            selectedOption.css({'background-color': '#198754', 'border-color': '#198754'}); // Verde (Correcto)
        } else {
            selectedOption.css({'background-color': '#dc3545', 'border-color': '#dc3545'}); // Rojo (Incorrecto)
            // Mostrar cuál era la correcta
            $(`.quiz-option[data-index="${correctIndex}"]`).css({'background-color': '#198754', 'color': 'white'});
        }

        // Bloquear opciones para evitar cambios
        $('.quiz-option').prop('disabled', true);
        
        // Esperar 1.5 seg y pasar a la siguiente
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1500);
    });

    // Iniciar el cuestionario al cargar la página
    loadQuestion();

});