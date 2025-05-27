import kaplay from "kaplay";

export default function initKaplay() {
    return kaplay({
        width: 1920,
        height: 1080,
        letterbox: true,        //Responsibe
        global: false,
        debug: true,       //Debug mode TODO: voler a ponerlo en falso en la fase de producción
        debugKey: "f1",
        canvas: document.getElementById("game"),
        pixelDensity: devicePixelRatio,
    })

}