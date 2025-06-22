import kaplay from "kaplay";
import initKaplay from "./kaplayCtx";
import { emit, on } from "./store";

export default function initGame() {
    const k = initKaplay();

    // --- Constantes globales ---
    const cardWidth = 125;
    const cardHeight = 190;
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
    let isSpawningCards = false;

    const levels = [
        {
            id: "aboutMe",
            cards: [
                { src: "./assets/images/cards/aboutMeCard.png", data: "aboutMe" },
            ],
            dialogs: [
                { text: "*Finding the perfect candidate... a quest as elusive as a shadow in the fog.*", speaker: "" },
                { text: "*Countless résumés with lifeless templates, countless GitHub pages, echoing the same tired lines—none held what you sought.*", speaker: "" },
                { text: "*But whispers reached your ears... of a seer who sees beyond the veil, who finds those hidden by fate itself.*", speaker: "" },
                { text: "*And so, with hope flickering like a dying flame, you knocked on her door.*", speaker: "" },
                { text: "*This is the day... your search ends.*", speaker: "" },
                { text: "Hi... I'm looking for someone.", speaker: "You:" },
                { text: "The threads of fate are many... but tell me, seeker what kind of person does your heart and company truly need?", speaker: "Seer:" },
                { text: "I’m looking for someone trustworthy and hard-working, a fast learner who works well with others.", speaker: "You:" },
                { text: "They should have solid programming skills, along with knowledge of networking, and experience in game design and development.", speaker: "You:" },
                { text: "Hmm... a rare combination indeed. But the cosmos may yet align in your favor...", speaker: "Seer:" },
                { text: "*The seer reaches for an old, weathered deck. With her eyes closed and a barely audible whisper, she throws two cards onto the table*" , speaker: "" },
                { text: "Go ahead.", speaker: "Seer:" },
            ]
        },
        {
            id: "studies",
            cards: [
                { src: "./assets/images/cards/redesCard.png", data: "IT" },
                { src: "./assets/images/cards/bachelorCard.png", data: "bachelor" },
                { src: "./assets/images/cards/masterCard.png", data: "master" },
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
                { src: "./assets/images/cards/iislafeCard.png", data: "iislafe" },
                { src: "./assets/images/cards/mindCard.png", data: "mindTrips" },
                { src: "./assets/images/cards/canteraCard.png", data: "cantera" },
                { src: "./assets/images/cards/ownCard.png", data: "OWN" },
                { src: "./assets/images/cards/aemeCard.png", data: "aeme" },
                { src: "./assets/images/cards/hechiceriaCard.png", data: "hechiceria" },
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
                { src: "./assets/images/cards/unityCard.png", data: "unity" },
                { src: "./assets/images/cards/unrealCard.png", data: "ue" },
                { src: "./assets/images/cards/reactCard.png", data: "react" },
                { src: "./assets/images/cards/springCard.png", data: "spring" },
                { src: "./assets/images/cards/laravelCard.png", data: "laravel" },
                {  src: "./assets/images/cards/azureCard.png", data: "azure" },
                { src: "./assets/images/cards/codeCard.png", data: "codeLanguages" },
            ],
            dialogs: [
                { text: "TO DO 1 Skills", speaker: "Sistema" },
                { text: "TO DO 2 Skills", speaker: "Guía" },
                { text: "TO DO 3 Skills", speaker: "Sistema" }
            ]
        },
        {
            id: "projects",
            cards: [
                { src: "./assets/images/cards/thumusCard.png", data: "thumus" },
                { src: "./assets/images/cards/candyCard.png", data: "candy" },
                { src: "./assets/images/cards/sh2Card.png", data: "sh2" },
                { src: "./assets/images/cards/tfgCard.png", data: "tfg" },
                { src: "./assets/images/cards/tfmCard.png", data: "tfm" },
            ],
            dialogs: [
                { text: "TO DO 1 Projects", speaker: "Sistema" },
                { text: "TO DO 2 Projects", speaker: "Guía" },
                { text: "TO DO 3 Projects", speaker: "Sistema" }
            ]
        },
        {
            id: "contact",
            cards: [
                { src: "./assets/images/cards/twitterCard.png", data: "twitter" },
                { src: "./assets/images/cards/githubCard.png", data: "github" },
                { src: "./assets/images/cards/linkedinCard.png", data: "linkedin" },
                { src: "./assets/images/cards/itchioCard.png", data: "itchio" },
            ],
            dialogs: [
                { text: "TO DO 1 Contact", speaker: "Sistema" },
                { text: "TO DO 2 Contact", speaker: "Guía" },
                { text: "TO DO 3 Contact", speaker: "Sistema" }
            ]
        }
    ];

    // --- Cargar recursos ---
    k.loadSprite("background", "/assets/images/background.png").then(() => {
        k.add([
            k.sprite("background"),
            k.pos(0, 0),
            k.layer("bg"),
            k.z(-10)
        ]);
    });
    k.loadSprite("cardBack", "./assets/images/cards/cardBack.png");


    k.loadSound("cardFlip1", "./assets/sounds/flipCard1.mp3");
    k.loadSound("cardFlip2", "./assets/sounds/flipCard2.mp3");
    k.loadSound("restoreCardFlip", "./assets/sounds/restoreCardFlip.mp3");
    k.loadSound("dealCard", "./assets/sounds/dealCard.mp3");
    k.loadSound("match", "./assets/sounds/match.mp3");

    const flipSounds = ["cardFlip1", "cardFlip2"];

    // k.add([
    //     k.sprite("background"),
    //     k.pos(0, 0),
    //     k.layer("bg")
    // ]);

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
            if (isDialogOpen || isSpawningCards) return;
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
                    lockBoard = true;

                    const data = firstCard.cardData.data;
                    if (data) {
                        setTimeout(() => emit(data), 1500);
                    }

                    setTimeout(() => {
                        k.play("match", {
                            volume: 0.35,
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
                        k.play("restoreCardFlip", {
                            volume: 0.5
                        });
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
            k.text("", { size: 30 }),
            k.pos(35, k.height() - 150),
            k.color(k.RED),
            k.fixed(),
            k.z(101),
        ]);

        const dialogText = k.add([
            k.text("", { size: 25 }),
            k.pos(30, k.height() - 100),
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
            speakerText.text = currentDialog.speaker;
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

        k.add([
            k.text("Prospectus", { size: 48 }),
            k.pos(k.width() / 2, k.height() / 2 - 110),
            k.anchor("center"),
            k.color(k.WHITE),
            "menuUI"
        ]);

                k.add([
            k.text("-- an interactive portfolio --", { size: 30 }),
            k.pos(k.width() / 2, k.height() / 2 - 60),
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
            k.text("Start", { size: 24 }),
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

    function EndScreen() {
        k.destroyAll();

        k.add([
            k.sprite("background"),
            k.pos(0, 0),
            k.layer("bg"),
            k.z(-10)
        ]);

        k.add([
            k.text("Thank you for playing!", { size: 42 }),
            k.pos(k.width() / 2, k.height() / 2 - 110),
            k.anchor("center"),
            k.color(k.WHITE),
            "endUI"
        ]);

        k.add([
            k.text("I hope you enjoyed this interactive portfolio.", { size: 24 }),
            k.pos(k.width() / 2, k.height() / 2 - 50),
            k.anchor("center"),
            k.color(k.WHITE),
            "endUI"
        ]);

        const restartButton = k.add([
            k.rect(220, 60, { radius: 12 }),
            k.pos(k.width() / 2, k.height() / 2 + 40),
            k.anchor("center"),
            k.color(k.BLUE),
            k.area(),
            k.z(10),
            "endUI"
        ]);

        k.add([
            k.text("Restart", { size: 26 }),
            k.pos(restartButton.pos.x, restartButton.pos.y),
            k.anchor("center"),
            k.color(k.WHITE),
            k.z(11),
            "endUI"
        ]);

        restartButton.onClick(() => {
            k.destroyAll("endUI");
            currentLevelIndex = 0;
            resetGame();
        });
    }

    function resetGame() {

        k.destroyAll();


        k.add([
            k.sprite("background"),
            k.pos(0, 0),
            k.layer("bg"),
            k.z(-10)
        ]);


        currentLevelIndex = 0;
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        matchedCount = 0;
        shuffledCards = [];
        levelComplete = false;
        isDialogOpen = false;
        isSpawningCards = false;

        MainMenu();
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
        isSpawningCards = true;

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
                const thisDelay = delay;

                setTimeout(() => {
                    k.play("dealCard", {
                        volume: 0.5
                    });
                    
                }, thisDelay * 1000);

                spawnCard(x, y, shuffledCards[index], delay);
                delay += 0.5;
                index++;
            }
        }

        const lastCardDelayMs = (delay + 0.5) * 1000; // Convertir a milisegundos
        setTimeout(() => {
            isSpawningCards = false;
        }, lastCardDelayMs);
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
                EndScreen();
            }
        }else{
            lockBoard = false;
        }
    });
}