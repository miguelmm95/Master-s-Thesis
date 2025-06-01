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
    let isDialogOpen = false;

    const levels = [
        {
            id: "aboutMe",
            cards: [
                { src: "./assets/images/card1.png", data: "aboutMe" },
            ],
            dialogs: [
                { text: "TO DO 1 About Me", speaker: "Sistema" },
                { text: "TO DO 2 About Me", speaker: "Guía" },
                { text: "TO DO 3 About Me", speaker: "Sistema" }
            ]
        },
        {
            id: "studies",
            cards: [
                { src: "./assets/images/card1.png", data: "ESO" },
                { src: "./assets/images/card2.png", data: "IT" },
                { src: "./assets/images/card3.png", data: "bachelor" },
                { src: "./assets/images/card4.png", data: "master" },
            ],
            dialogs: [
                { text: "TO DO 1 Studies", speaker: "Sistema" },
                { text: "TO DO 2 Studies", speaker: "Guía" },
                { text: "TO DO 3 Studies", speaker: "Sistema" }
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
            ],
            dialogs: [
                { text: "TO DO 1 Experience", speaker: "Sistema" },
                { text: "TO DO 2 Experience", speaker: "Guía" },
                { text: "TO DO 3 Experience", speaker: "Sistema" }
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
            ],
            dialogs: [
                { text: "TO DO 1 Skills", speaker: "Sistema" },
                { text: "TO DO 2 Skills", speaker: "Guía" },
                { text: "TO DO 3 Skills", speaker: "Sistema" }
            ]
        }
    ];

    // --- Cargar recursos ---
    k.loadSprite("background", "./logo192.png");
    k.loadSprite("cardBack", "./assets/images/cardback.png");
    k.add([k.sprite("background"), k.pos(0, 0), k.layer("bg")]);

    k.loadSound("cardFlip1", "./assets/sounds/flipCard1.mp3");
    k.loadSound("cardFlip2", "./assets/sounds/flipCard2.mp3");
    k.loadSound("shuffleCards1", "./assets/sounds/shuffleCards1.mp3");
    k.loadSound("shuffleCards2", "./assets/sounds/shuffleCards2.mp3");
    k.loadSound("match", "./assets/sounds/match.mp3");

    const flipSounds = ["cardFlip1", "cardFlip2"];
    const shuffleSounds = ["shuffleCards1", "shuffleCards2"];

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
        const flipOut = () => card.tween(
            k.vec2(1, 1), 
            k.vec2(0, 1), 
            0.2, 
            v => card.scale = v, 
            k.easings.linear
        );

        const flipIn = () => card.tween(
            k.vec2(0, 1), 
            k.vec2(1, 1), 
            0.2, 
            v => card.scale = v, 
            k.easings.linear
        );

        flipOut();

        setTimeout(() => {
            card.use(k.sprite(toFront ? card.cardData.src : "cardBack"));
            flipIn();
        }, 200);
    }

    function spawnCard(x, y, cardData, delay = 0) {
        const card = k.add([
            k.sprite("cardBack"),
            k.pos(x, y + 300),
            k.area(),
            k.scale(0),
            k.timer(),
            "card",
            {
                x, y,
                flipped: false,
                cardData,
            }
        ]);

        card.wait(delay). then(() => {
            // Tween de posición
            const fromPos = k.vec2(card.pos.x, card.pos.y); // posición actual (desplazada abajo)
            const toPos = k.vec2(x, y); // posición destino
            card.tween(fromPos, toPos, 0.4, (v) => card.pos = v, k.easings.easeOutBack);

            // Tween de escala
            card.tween(k.vec2(0, 0), k.vec2(1, 1), 0.4, (v) => card.scale = v, k.easings.easeOutBack);
        });

        card.onHover(() => {
            if(card.flipped || lockBoard || isDialogOpen) return;
            card.tween(card.scale, k.vec2(1.1, 1.1), 0.2, v => card.scale = v, k.easings.linear);
        });

        card.onHoverEnd(() => {
            if(card.flipped || lockBoard || isDialogOpen) return;
            card.tween(card.scale, k.vec2(1, 1), 0.2, v => card.scale = v, k.easings.linear);
        });

        card.onClick(() => {
            if (isDialogOpen) return;
            if (lockBoard || card.flipped) return;


            k.play(flipSounds[Math.floor(Math.random() * flipSounds.length)],{
                volume: 0.5
            });

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
                        setTimeout(() => emit(data), 1500);
                    }

                    setTimeout(() => {
                        k.play("match", {
                            volume: 0.5,
                            speed: 1.2,
                            detune: -150
                        });
                    }, 500);


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

    function createDialogBox(dialogs, onComplete = () => {}) {
        let currentDialogIndex = 0;
        isDialogOpen = true;
        let animationTimer = null;
        let isAnimating = false;

        const dialogBox = k.add([
            k.rect(k.width() - 40, 150),
            k.pos(20, k.height() - 170),
            k.color(0, 0, 0),
            k.outline(4, k.WHITE),
            k.fixed(),
            k.z(100),
            k.area(),
            "dialogBox"
        ]);

        const speakerText = k.add([
            k.text("", { size: 24 }),
            k.pos(30, k.height() - 150),
            k.color(k.RED),
            k.fixed(),
            k.z(101),
        ]);

        const dialogText = k.add([
            k.text("", { size: 20 }),
            k.pos(30, k.height() - 120),
            k.color(k.WHITE),
            k.fixed(),
            k.z(101),
        ]);

        function cleanup() {
            if (animationTimer) {
                clearInterval(animationTimer);
                animationTimer = null;
            }
        }

        function showCurrentDialog() {
            cleanup();

            if (currentDialogIndex >= dialogs.length) {
                closeDialog();
                onComplete();
                return;
            }

            const currentDialog = dialogs[currentDialogIndex];
            speakerText.text = currentDialog.speaker + ":";
            dialogText.text = "";

            let i = 0;
            const speed = 30;
            isAnimating = true;

            animationTimer = setInterval(() => {
                if (i < currentDialog.text.length) {
                    dialogText.text += currentDialog.text.charAt(i);
                    i++;
                } else {
                    clearInterval(animationTimer);
                    animationTimer = null;
                    isAnimating = false;
                }
            }, speed);
        }

        function closeDialog() {
            cleanup();
            dialogBox.destroy();
            speakerText.destroy();
            dialogText.destroy();
            isDialogOpen = false;
        }

        dialogBox.onClick(() => {
            if (isAnimating) {
                cleanup();
                dialogText.text = dialogs[currentDialogIndex].text;
                isAnimating = false;
            } else {
                currentDialogIndex++;
                showCurrentDialog();
            }
        });

        showCurrentDialog();
    }

    function MainMenu() {
        k.destroyAll();

        k.add([
            k.text("Titulo del Juego", { size: 48 }),
            k.pos(k.width() / 2, k.height() / 2 - 100),
            k.anchor("center"),
            k.color(k.WHITE),
            "menuUI"
        ]);

        const startButton = k.add([
            k.rect(200, 60, { radius: 12 }),
            k.pos(k.width() / 2, k.height() / 2),
            k.anchor("center"),
            k.color(k.GREEN),
            k.area(),
            k.z(10),
            "menuUI"
        ]);
        k.add([
            k.text("Jugar", { size: 24 }),
            k.pos(startButton.pos.x, startButton.pos.y),
            k.anchor("center"),
            k.color(k.WHITE),
            k.z(11),
            "menuUI"
        ]);

        startButton.onClick(() => {
            k.destroyAll("menuUI");
            startLevel();
        });
    }


    function startLevel() {
        k.destroyAll("card");

        const currentLevel = levels[currentLevelIndex];

        if (currentLevel.dialogs && currentLevel.dialogs.length > 0) {
            createDialogBox(currentLevel.dialogs, () => {
                spawnAllCardsForLevel();
            });
        }else{
            spawnAllCardsForLevel();
        }

        firstCard = null;
        secondCard = null;
        lockBoard = false;
        matchedCount = 0;
    }

    function spawnAllCardsForLevel(){

        k.play(shuffleSounds[Math.floor(Math.random() * shuffleSounds.length)],{
            volume: 0.5
        });

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
        let delay = 0;
        for (let row = 0; row < numRow; row++) {
            for (let col = 0; col < numCol; col++) {
                if (index >= shuffledCards.length) break;

                const x = startX + col * (cardWidth + gapX);
                const y = startY + row * (cardHeight + gapY);
                spawnCard(x, y, shuffledCards[index], delay);
                delay += 0.05;
                index++;
            }
        }
    }

    // --- Iniciar nivel ---
    //startLevel();
    MainMenu();
    
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