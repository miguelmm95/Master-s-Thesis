import kaplay from "kaplay";
import initKaplay from "./kaplayCtx";
import { emit } from "./store";

export default function initGame() {
    //Lógica del juego
    const k = initKaplay();

    const cardImages = [
        {src: "./assets/images/card1.png", data: "aboutMe"},
        {src: "./assets/images/card2.png", data: "unity"},
        {src: "./assets/images/card3.png"},
        {src: "./assets/images/card4.png"},
        {src: "./assets/images/card5.png"},
        {src: "./assets/images/card6.png"},
    ];

    const totalCards = cardImages.length * 2;   // Total de cartas (duplicadas)

    // Calcular el número de filas y columnas
    const numCol = Math.ceil(Math.sqrt(totalCards));
    const numRow = Math.ceil(totalCards / numCol);

    // Calcular el tamaño de las cartas y el espacio entre ellas
    const cardWidth = 64;
    const cardHeight = 64;
    const gapX = 30;
    const gapY = 30;

    const startX = (k.width() - (numCol * cardWidth + (numCol - 1) * gapX)) / 2; // Centrar las cartas en el eje X
    const startY = (k.height() - (numRow * cardHeight + (numRow - 1) * gapY)) / 2; // Centrar las cartas en el eje Y


    let firstCard = null; // Primera carta seleccionada
    let secondCard = null; // Segunda carta seleccionada
    let lockBoard = false; // Variable para bloquear el tablero mientras se comparan las cartas

    //CARGAR SPRITES
    k.loadSprite("background", "./logo192.png");
    k.loadSprite("cardBack", "./assets/images/cardback.png");

    //k.add([k.sprite("cardBack"), k.pos(0, 0), k.layer("ui")]); //Cargar la carta

    for (const card of cardImages) {
        k.loadSprite(card.src, card.src); //Cargar las cartas
    }

    k.add([k.sprite("background"), k.pos(0, 0), k.layer("bg")]); //Cargar el fondo

    function resetTurn(){
        //Reiniciar el turno
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    function ShuffleCards(){
        const shuffleCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5) // Mezclar las cartas
            .map((card) => ({...card, id: Math.random()})); // Asignar un id único a cada carta

            emit("syncCards", shuffleCards);
            return shuffleCards;
    }

    function flipCard(card, toFront) {

        if (toFront) {
            card.tween(
                k.vec2(1, 1), // Comienza en tamaño normal
                k.vec2(0, 1), // Escala X a 0 = invisible de lado
                0.2,
                (val) => card.scale = val,
                k.easings.linear,
            );
            setTimeout(() => {
                card.use(k.sprite(card.cardData.src)); // Cambiar la imagen de la carta al hacer clic
                card.tween(
                    k.vec2(0, 1), // Comienza en tamaño 0
                    k.vec2(1, 1), // Escala X a 1 = visible de lado
                    0.2,
                    (val) => card.scale = val,
                    k.easings.linear,
                );
            }, 200);
        }else {
            card.use(k.sprite(card.cardData.src));
            card.tween(
                k.vec2(1, 1), // Comienza en tamaño normal
                k.vec2(0, 1), // Escala X a 0 = invisible de lado
                0.2,
                (val) => card.scale = val,
                k.easings.linear,
            );
            setTimeout(() => {
                card.use(k.sprite("cardBack")); // Cambiar la imagen de la carta al hacer clic
                card.tween(
                    k.vec2(0, 1), // Comienza en tamaño 0
                    k.vec2(1, 1), // Escala X a 1 = visible de lado
                    0.2,
                    (val) => card.scale = val,
                    k.easings.linear,
                );
            }, 200);
        }
    }

    function spawnCard(x, y, cardData) {
        const card = k.add([k.sprite("cardBack"), k.pos(x, y), k.area(), k.scale(1), k.timer(), "card",{
            x: x,
            y: y,
            flipped: false,
            cardData: cardData,
        }]);

        card.onClick(() => {
            if (lockBoard) return; // Si el tablero está bloqueado, no hacer nada
            if (card.flipped) return; // Si la carta ya está volteada, no hacer nada

            // card.use(k.sprite(card.cardData.src)); // Cambiar la imagen de la carta al hacer clic

            // flipCard(card, true); // Voltear la carta
            flipCard(card, true); // Voltear la carta
            card.flipped = true;

            if (!firstCard) {
                // Almacenar la primera carta seleccionada
                firstCard = card; 
            } else {
                secondCard = card;
                lockBoard = true; // Bloquear el tablero para evitar más clics

                if (firstCard.cardData.src === secondCard.cardData.src){
                    // Las cartas coinciden
                    console.log("Coinciden: ", firstCard.cardData, secondCard.cardData);
                    // TODO -- Quitar el if cuando esten todas las cartas hechas
                    let data = firstCard.cardData.data;
                    if(data){
                        setTimeout(() => {
                            emit(data);
                        }, 1000);
                    }
                    resetTurn();
                }else{
                    // Las cartas no coinciden
                    console.log("No coinciden: ", firstCard.cardData, secondCard.cardData);
                    setTimeout(() => {

                        // Voltear las cartas
                        firstCard.use(k.sprite("cardBack")); 
                        secondCard.use(k.sprite("cardBack"));

                        // Marcar la cartas como volteadas
                        firstCard.flipped = false;
                        secondCard.flipped = false;
                        flipCard(firstCard, false);
                        flipCard(secondCard, false);



                        lockBoard = false; // Desbloquear el tablero
                        resetTurn();
                    }, 1000); // Esperar 1 segundo 
                }
            }
        });
    }

    let index = 0;
    const shuffledCards = ShuffleCards(); // Mezclar las cartas

    for (let row = 0; row < numRow; row++) {
        for (let col = 0; col < numCol; col++) {
            if (index >= shuffledCards.length) break;
            const x = startX + col * (cardWidth + gapX);
            const y = startY + row * (cardHeight + gapY);
            const cardData = shuffledCards[index];
            spawnCard(x, y, cardData);
            console.log(cardData); 
            index++;
        }
    }
};