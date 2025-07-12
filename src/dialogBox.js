export function createDialogBox(k, dialogs, isDialogOpen, onComplete = () => {}) {
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