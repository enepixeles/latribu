$(document).ready(function() {
    // Verificamos si el módulo existe antes de arrancar
    if ($('#quizModule').length === 0) return;

    // ==========================================
    // 1. BANCO DE PREGUNTAS (DATA)
    // ==========================================
    const quizData1 = [
        { question: "¿Qué se sugiere para registrar gastos?", options: ["Libreta o App", "No anotar nada", "Pedirle a otro"], correctAnswer: 0, hint: "Anotar en el momento es la clave." },
        { question: "¿Beneficio de anotar cada peso?", options: ["Gastar más", "Conciencia financiera", "Perder tiempo"], correctAnswer: 1, hint: "Tu cerebro procesa el gasto distinto." }
    ];

    const quizData2 = [
        { question: "El pago del arriendo es un gasto:", options: ["Ajustable", "Esencial", "Innecesario"], correctAnswer: 1, hint: "Es fundamental para vivir." },
        { question: "Un antojo por impulso es un:", options: ["Gasto Esencial", "Gasto Ajustable", "Gasto Innecesario"], correctAnswer: 2, hint: "Podemos sobrevivir sin ello." }
    ];

    const quizData3 = [
        { question: "Luz prendida sin haber nadie es un gasto:", options: ["Hormiga", "Vampiro", "Fantasma"], correctAnswer: 1, hint: "Chupa energía en silencio." },
        { question: "Un chocolate por impulso es un:", options: ["Gasto Hormiga", "Gasto Esencial", "Gasto Fantasma"], correctAnswer: 0, hint: "Gasto pequeño que parece inofensivo." }
    ];

    const quizData4 = [
        { question: "Si vendí una torta y me pagaron $10.000, ¿eso es un ingreso?", options: ["No, porque no es mi sueldo mensual", "Sí, es dinero que entró a mi bolsillo"], correctAnswer: 1, hint: "Todo lo que entra a tu 'balde' cuenta." },
        { question: "Si tengo un negocio, ¿qué es lo más recomendable?", options: ["Tener cajas separadas", "Usar toda la plata junta"], correctAnswer: 0, hint: "Así sabes si tu negocio deja ganancia real." }
    ];

    // ==========================================
    // 2. DETECCIÓN DE PÁGINA
    // ==========================================
    let activeQuizData = [];
    const path = window.location.pathname;

    if (path.includes('academia-enfoco-4.html')) activeQuizData = quizData4;
    else if (path.includes('academia-enfoco-3.html')) activeQuizData = quizData3;
    else if (path.includes('academia-enfoco-2.html')) activeQuizData = quizData2;
    else if (path.includes('academia-enfoco.html')) activeQuizData = quizData1;
    else return;

    // ==========================================
    // 3. LÓGICA DEL CUESTIONARIO
    // ==========================================
    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestion() {
        if (currentQuestionIndex >= activeQuizData.length) {
            // --- 🏁 PANTALLA FINAL CON EL NUEVO TEXTO EMPÁTICO ---
            $('#quizModule').html(`
                <div class="text-center py-4">
                    <h4 class="fw-bold mb-3">¡Gracias por darte el tiempo!</h4>
                    <p class="fs-3 mb-4">Tu puntaje: ${score} de ${activeQuizData.length}</p>
                    <button onClick="window.location.reload()" class="btn btn-nav rounded-pill px-5 py-2">
                        ¿Lo vemos otra vez con calma?
                    </button>
                </div>
            `);
            return;
        }

        const currentQuestion = activeQuizData[currentQuestionIndex];

        // Barra de progreso dinámica
        let progressPercent = ((currentQuestionIndex + 1) / activeQuizData.length) * 100;
        $('#progressBar').css('width', progressPercent + '%');
        
        $('#quizQuestion').text(currentQuestion.question);
        $('#hintText').text(currentQuestion.hint);
        
        $('#quizOptions').empty(); 
        currentQuestion.options.forEach((option, index) => {
            $('#quizOptions').append(
                `<button class="quiz-option" data-index="${index}">${String.fromCharCode(65 + index)}. ${option}</button>`
            );
        });

        $('#btnNextQuestion').prop('disabled', true);
    }

    // Elegir opción
    $('#quizOptions').on('click', '.quiz-option', function() {
        $('.quiz-option').removeClass('selected');
        $(this).addClass('selected');
        $('#btnNextQuestion').prop('disabled', false);
    });

    // Validar y Siguiente
    $('#btnNextQuestion').on('click', function() {
        const selectedOption = $('.quiz-option.selected');
        if (selectedOption.length === 0) return;

        const answerIndex = parseInt(selectedOption.data('index'));
        const correctIndex = activeQuizData[currentQuestionIndex].correctAnswer;

        selectedOption.removeClass('selected');

        if (answerIndex === correctIndex) {
            score++;
            selectedOption.addClass('correct');
        } else {
            selectedOption.addClass('incorrect');
            $(`.quiz-option[data-index="${correctIndex}"]`).addClass('correct');
        }

        $('.quiz-option').prop('disabled', true);
        
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 1500);
    });

    loadQuestion();
});