import initKaplay from "./kaplayCtx";
import { emit, on } from "./store";

import { levels } from "./Components/levels";
import { createDialogBox } from "./Components/dialogBox";

export default function initGame() {
    const k = initKaplay();
    // k.onUpdate(() => setCursor("default"));
    
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
    let isCredits = false;

    const credits = [
        {
            id: "credits",
            cards: [
                { src: "./assets/images/cards/aboutMeCard.png", data: "mmm" },
                { src: "./assets/images/cards/artistCard.png", data: "jmm" },
            ],
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
    k.loadSprite("cvSprite", "./assets/images/cvSprite.png");
    k.loadSprite("rrssSprite", "./assets/images/rrssSprite.png");


    k.loadSound("cardFlip1", "./assets/sounds/flipCard1.mp3");
    k.loadSound("cardFlip2", "./assets/sounds/flipCard2.mp3");
    k.loadSound("restoreCardFlip", "./assets/sounds/restoreCardFlip.mp3");
    k.loadSound("dealCard", "./assets/sounds/dealCard.mp3");
    k.loadSound("match", "./assets/sounds/match.mp3");

    const flipSounds = ["cardFlip1", "cardFlip2"];


    // --- Utilidades ---
    function getCurrentLevelCards(level) {
        return [...level[currentLevelIndex].cards, ...level[currentLevelIndex].cards]
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
            k.vec2(0, 1.35), 
            0.2, 
            v => card.scale = v, 
            k.easings.linear
        );

        const flipIn = () => card.tween(
            k.vec2(0, 1.35), 
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

    function centerCard(card, width, height) {
        card.pos.x += width / 2;
        card.pos.y += height / 2;
    }

    

    function spawnCard(x, y, cardData, delay = 0) {
        const randomAngle = (Math.random() * 20) - 10;

        const card = k.add([
            k.sprite("cardBack"),
            k.pos(x + cardWidth / 2, y + cardHeight / 2),
            k.area(),
            k.scale(0),
            k.rotate(randomAngle),
            k.timer(),
            "card",
            {
                x, y,
                flipped: false,
                matched: false,
                cardData,
            }
        ]);

        centerCard(card, cardWidth, cardHeight);

        card.wait(delay). then(() => {
            // Tween de posición
            const fromPos = k.vec2(card.pos.x, card.pos.y); // posición actual (desplazada abajo)
            const toPos = k.vec2(x, y); // posición destino
            card.tween(fromPos, toPos, 0.4, (v) => card.pos = v, k.easings.easeOutBack);

            // Tween de escala
            card.tween(k.vec2(0, 0), k.vec2(1, 1), 0.4, (v) => card.scale = v, k.easings.easeOutBack);
        });

        card.onHover(() => {
            if (card.flipped && firstCard == null){
                k.setCursor("pointer");
            }
            if(card.flipped || lockBoard || isDialogOpen) return;
            k.setCursor("pointer");
            card.tween(card.scale, k.vec2(1.1, 1.1), 0.2, v => card.scale = v, k.easings.linear);
        });

        card.onHoverEnd(() => {
            if (card.flipped && firstCard == null){
                k.setCursor("default");
            }
            if(card.flipped || lockBoard || isDialogOpen) return;
            k.setCursor("default");
            card.tween(card.scale, k.vec2(1, 1), 0.2, v => card.scale = v, k.easings.linear);
        });

        card.onClick(() => {
            k.setCursor("default");
            if (card.flipped) {
                if (firstCard && !secondCard) return;

                const isMatchedCard = card.matched || 
                    (firstCard && secondCard &&
                    firstCard.cardData.src === secondCard.cardData.src &&
                    (card === firstCard || card === secondCard));
                if (isMatchedCard) {
                    const cardData = card.cardData.data;
                    if (cardData) emit(cardData);
                    return;
                }
            }
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
                    firstCard.matched = true;
                    secondCard.matched = true;
                    const data = firstCard.cardData.data;
                    
                    setTimeout(() => {
                        k.play("match", { volume: 0.35, speed: 1.2, detune: -150 });

                        if (data) emit(data);

                        matchedCount += 2;

                        const levelFinished = matchedCount === shuffledCards.length;

                        if (levelFinished) {
                            emit("levelComplete", levels[currentLevelIndex].id);
                            
                        } else {
                            resetTurn(); 
                        }

                    }, 1000);

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

    function MainMenu() {
        
        isCredits = false;

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
            k.color(k.BLUE),
            k.area(),
            k.z(10),
            "menuUI"
        ]);
        startButton.onHover(() => k.setCursor("pointer"));
        startButton.onHoverEnd(() => k.setCursor("default"));

        const creditsButton = k.add([
            k.rect(200, 60, { radius: 12 }),
            k.pos(k.width() / 2, k.height() / 2 + 80),
            k.anchor("center"),
            k.color(k.BLUE),
            k.area(),
            k.z(10),
            "menuUI"
        ]);
        creditsButton.onHover(() => k.setCursor("pointer"));
        creditsButton.onHoverEnd(() => k.setCursor("default"));

        k.add([
            k.text("Start", { size: 24 }),
            k.pos(startButton.pos.x, startButton.pos.y),
            k.anchor("center"),
            k.color(k.WHITE),
            k.z(11),
            "menuUI"
        ]);
        k.add([
            k.text("Credits", { size: 24 }),
            k.pos(creditsButton.pos.x, creditsButton.pos.y),
            k.anchor("center"),
            k.color(k.WHITE),
            k.z(11),
            "menuUI"
        ]);

        startButton.onClick(() => {
            k.destroyAll("menuUI");
            k.setCursor("default");
            startLevel();
        });

        creditsButton.onClick(() => {
            k.destroyAll("menuUI");
            k.setCursor("default");
            isCredits = true;
            showCredits();
        });
    }

    function createFixedButtons(){

        const cvSprite= k.add([
            k.sprite("cvSprite"),
            k.pos(k.width() - 100, 100),
            k.scale(0.2),
            k.area(),
            k.z(201),
            k.anchor("center"),
            k.fixed(),
            "fixedUI"
        ]);
        cvSprite.onHover(() => k.setCursor("pointer"));
        cvSprite.onHoverEnd(() => k.setCursor("default"));

        const rrssButton = k.add([
            k.sprite("rrssSprite"),
            k.pos(k.width() - 250, 100),
            k.scale(0.2),
            k.area(),
            k.z(201),
            k.anchor("center"),
            k.fixed(),
            "fixedUI"
        ]);
        rrssButton.onHover(() => k.setCursor("pointer"));
        rrssButton.onHoverEnd(() => k.setCursor("default"));

        cvSprite.onClick(() => {
            window.open("https://drive.google.com/file/d/1jzprqZLEF4LPIrpNQyZmeuH140L0kPnb/view?usp=sharing", "_blank");
        });

        rrssButton.onClick(() => {
            window.open("https://linktr.ee/miguelmm95", "_blank");
        });
    }

    function EndScreen() {
        k.destroyAll();
        createFixedButtons();

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
        restartButton.onHover(() => k.setCursor("pointer"));
        restartButton.onHoverEnd(() => k.setCursor("default"));

        k.add([
            k.text("Main Menu", { size: 26 }),
            k.pos(restartButton.pos.x, restartButton.pos.y),
            k.anchor("center"),
            k.color(k.WHITE),
            k.z(11),
            "endUI"
        ]);

        restartButton.onClick(() => {
            setTimeout(() => {
                resetGame();
            }, 100);
        });
    }

    function resetGame() {

        k.destroyAll();
        k.setCursor("default");


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
        isCredits = false;

        MainMenu();
        createFixedButtons();
    }

    function startLevel() {
        k.destroyAll("card");
        k.setCursor("default");

        const currentLevel = levels[currentLevelIndex];

        if (currentLevel.dialogs && currentLevel.dialogs.length > 0) {
            createDialogBox(k,currentLevel.dialogs, isDialogOpen, () => {
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

    function showCredits() {
        firstCard = null;
        secondCard = null;
        lockBoard = false;
        matchedCount = 0;
        isDialogOpen = false;
        isSpawningCards = false;
        k.destroyAll("card");

        const currentCredits = credits[0];
        spawnAllCardsForLevel();

        // Botón para volver al menú principal
        const backButton = k.add([
            k.rect(180, 50, { radius: 10 }),
            k.pos(k.width() / 2, k.height() / 2 + 300),
            k.anchor("center"),
            k.color(k.BLUE),
            k.area(),
            k.z(10),
            "creditsUI"
        ]);
        backButton.onHover(() => k.setCursor("pointer"));

        k.add([
            k.text("Back", { size: 24 }),
            k.pos(backButton.pos.x, backButton.pos.y),
            k.anchor("center"),
            k.color(k.WHITE),
            k.z(11),
            "creditsUI"
        ]);
        backButton.onClick(() => {
            k.destroyAll("creditsUI");
            k.destroyAll("card");
            isCredits = false;
            MainMenu();
        });

    }

    function spawnAllCardsForLevel(){
        isSpawningCards = true;

        if (isCredits){
            shuffledCards = getCurrentLevelCards(credits);
        }else{
            shuffledCards = getCurrentLevelCards(levels);
        }
        

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
    createFixedButtons();
    
    on("levelComplete", () => {
        levelComplete = true;
    });

    on("modalClosed", () => {
        if (isCredits) {
            return;
        }
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