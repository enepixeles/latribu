// --- LÓGICA DEL CUESTIONARIO ---
    
    // 1. BASE DE DATOS DE PREGUNTAS
    // Es un array de objetos. Puedes agregar o quitar preguntas fácilmente aquí.
    const quizData = [
        {
            question: "Según la clasificación del texto, ¿en qué categoría se ubicaría el pago mensual de la cuenta del agua potable?",
            options: ["Esencial", "Innecesario", "Ocasional", "Ajustable"],
            correctAnswer: 0, // El índice de la respuesta correcta (A es 0)
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

    let currentQuestionIndex = 0;
    let score = 0;

    // 2. FUNCIÓN PARA CARGAR UNA PREGUNTA
    function loadQuestion() {
        // Si ya no hay más preguntas, muestra el resultado final
        if (currentQuestionIndex >= quizData.length) {
            $('#quizModule').html(`<h4 class="fw-bold text-center">¡Cuestionario completado!</h4><p class="text-center fs-3">Tu puntaje: ${score} de ${quizData.length}</p><div class="text-center"><a href="#" onClick="window.location.reload()" class="btn btn-primary rounded-pill">Volver a intentar</a></div>`);
            return;
        }

        const currentQuestion = quizData[currentQuestionIndex];
        $('#quizProgress').text(`${currentQuestionIndex + 1} / ${quizData.length}`);
        $('#quizQuestion').text(currentQuestion.question);
        $('#hintText').text(currentQuestion.hint);
        $('#quizOptions').empty(); // Limpia opciones anteriores

        // Crea los botones de opción
        currentQuestion.options.forEach((option, index) => {
            $('#quizOptions').append(
                `<button class="quiz-option p-3" data-index="${index}">${String.fromCharCode(65 + index)}. ${option}</button>`
            );
        });

        $('#btnNextQuestion').prop('disabled', true); // Deshabilita el botón "Siguiente"
    }

    // 3. EVENTOS DE CLICK
    
    // Al hacer clic en una opción
    $('#quizOptions').on('click', '.quiz-option', function() {
        $('.quiz-option').removeClass('selected'); // Deselecciona otras
        $(this).addClass('selected'); // Selecciona la actual
        $('#btnNextQuestion').prop('disabled', false); // Habilita "Siguiente"
    });

    // Al hacer clic en "Siguiente"
    $('#btnNextQuestion').on('click', function() {
        const selectedOption = $('.quiz-option.selected');
        if (selectedOption.length === 0) return; // No hacer nada si no hay selección

        const answerIndex = parseInt(selectedOption.data('index'));
        const correctIndex = quizData[currentQuestionIndex].correctAnswer;

        // Comprueba si la respuesta es correcta
        if (answerIndex === correctIndex) {
            score++;
            selectedOption.addClass('correct');
        } else {
            selectedOption.addClass('incorrect');
            // Muestra la correcta
            $(`.quiz-option[data-index="${correctIndex}"]`).addClass('correct');
        }

        // Deshabilita las opciones y pasa a la siguiente pregunta después de 1.5 segundos
        $('.quiz-option').prop('disabled', true);
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1500);
    });

    // 4. CARGA LA PRIMERA PREGUNTA AL INICIAR
    if ($('#quizModule').length) { // Solo ejecuta si el módulo de quiz existe en la página
      loadQuestion();
    }