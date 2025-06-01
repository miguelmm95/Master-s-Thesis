import kaplay from "kaplay";
import initKaplay from "./kaplayCtx";
import { emit, on } from "./store";

export default function initGame() {
    const k = initKaplay();

    // --- Constantes globales ---
    const cardWidth = 64;
    const cardHeight = 64;
    const gapX = 30;
    const gapY = 30;

    let currentLevelIndex = 0;
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let matchedCount = 0;
    let shuffledCards = [];
    let levelComplete = false;

    const levels = [
        {
            id: "aboutMe",
            cards: [
                { src: "./assets/images/card1.png", data: "aboutMe" },
            ]
        },
        {
            id: "studies",
            cards: [
                { src: "./assets/images/card1.png", data: "ESO" },
                { src: "./assets/images/card2.png", data: "IT" },
                { src: "./assets/images/card3.png", data: "bachelor" },
                { src: "./assets/images/card4.png", data: "master" },
            ]
        },
        {
            id: "experience",
            cards: [
                { src: "./assets/images/card1.png", data: "iislafe" },
                { src: "./assets/images/card2.png", data: "mindTrips" },
                { src: "./assets/images/card3.png", data: "cantera" },
                { src: "./assets/images/card4.png", data: "OWN" },
                { src: "./assets/images/card5.png", data: "aeme" },
                { src: "./assets/images/card6.png", data: "hechiceria" },
            ]
        },
        {
            id: "skills",
            cards: [
                { src: "./assets/images/card1.png", data: "unity" },
                { src: "./assets/images/card2.png", data: "ue" },
                { src: "./assets/images/card3.png", data: "react" },
                { src: "./assets/images/card4.png", data: "spring" },
                { src: "./assets/images/card5.png", data: "laravel" },
                { src: "./assets/images/card6.png", data: "codeLanguages" },
            ]
        }
    ];

    // --- Cargar recursos ---
    k.loadSprite("background", "./logo192.png");
    k.loadSprite("cardBack", "./assets/images/cardback.png");
    k.add([k.sprite("background"), k.pos(0, 0), k.layer("bg")]);

    // --- Utilidades ---
    function getCurrentLevelCards() {
        return [...levels[currentLevelIndex].cards, ...levels[currentLevelIndex].cards]
            .sort(() => Math.random() - 0.5)
            .map(card => ({ ...card, id: Math.random() }));
    }

    function resetTurn() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
    }

    function flipCard(card, toFront) {
        const flipOut = () => card.tween(k.vec2(1, 1), k.vec2(0, 1), 0.2, v => card.scale = v, k.easings.linear);
        const flipIn = () => card.tween(k.vec2(0, 1), k.vec2(1, 1), 0.2, v => card.scale = v, k.easings.linear);

        flipOut();

        setTimeout(() => {
            card.use(k.sprite(toFront ? card.cardData.src : "cardBack"));
            flipIn();
        }, 200);
    }

    function spawnCard(x, y, cardData) {
        const card = k.add([
            k.sprite("cardBack"),
            k.pos(x, y),
            k.area(),
            k.scale(1),
            k.timer(),
            "card",
            {
                x, y,
                flipped: false,
                cardData,
            }
        ]);

        card.onClick(() => {
            if (lockBoard || card.flipped) return;

            flipCard(card, true);
            card.flipped = true;

            if (!firstCard) {
                firstCard = card;
            } else {
                secondCard = card;
                lockBoard = true;

                if (firstCard.cardData.src === secondCard.cardData.src) {

                    //Cartas coinciden

                    const data = firstCard.cardData.data;
                    if (data) {
                        setTimeout(() => emit(data), 1000);
                    }

                    if (matchedCount + 2 === shuffledCards.length) {
                        setTimeout(() => {
                            emit(data);
                            emit("levelComplete", levels[currentLevelIndex].id);
                        }, 1000);
                    }else{
                        matchedCount += 2;
                        resetTurn();
                    }

                } else {
                    //Cartas no coinciden

                    setTimeout(() => {
                        flipCard(firstCard, false);
                        flipCard(secondCard, false);
                        firstCard.flipped = false;
                        secondCard.flipped = false;
                        resetTurn();
                    }, 1000);
                }
            }
        });
    }

    function startLevel() {
        k.destroyAll("card");

        firstCard = null;
        secondCard = null;
        lockBoard = false;
        matchedCount = 0;

        shuffledCards = getCurrentLevelCards();

        // Cargar sprites únicos para este nivel
        for (const card of shuffledCards) {
            k.loadSprite(card.src, card.src);
        }

        const totalCardsInLevel = shuffledCards.length;
        const numCol = Math.ceil(Math.sqrt(totalCardsInLevel));
        const numRow = Math.ceil(totalCardsInLevel / numCol);

        const startX = (k.width() - (numCol * cardWidth + (numCol - 1) * gapX)) / 2;
        const startY = (k.height() - (numRow * cardHeight + (numRow - 1) * gapY)) / 2;

        let index = 0;
        for (let row = 0; row < numRow; row++) {
            for (let col = 0; col < numCol; col++) {
                if (index >= shuffledCards.length) break;

                const x = startX + col * (cardWidth + gapX);
                const y = startY + row * (cardHeight + gapY);
                spawnCard(x, y, shuffledCards[index]);
                index++;
            }
        }
    }

    // --- Iniciar nivel ---
    startLevel();
    
    on("levelComplete", () => {
        levelComplete = true;
    });

    on("modalClosed", () => {
        if(levelComplete){
            levelComplete = false;

            if(currentLevelIndex < levels.length - 1) {
                currentLevelIndex++;
                startLevel();
            }else {
                console.log("Juego completado");
            }
        }else{
            lockBoard = false;
        }
    });
}
