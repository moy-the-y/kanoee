export default class SoundProgressBarManager {
    #fillingTaskId = null;
    #FILLING_INTERVAL = 33;

    #barLength;
    #filler;

    /**
     * 
     * @param {int} barLengthVW 
     * @param {HTMLDivElement} barFillerElement 
     */
    constructor(barLengthVW, barFillerElement) {
        this.#barLength = barLengthVW;
        this.#filler = barFillerElement;
    }

    start(durationMS) {
        if (this.#fillingTaskId) {
            clearInterval(this.#fillingTaskId);
        }

        let taskTimeMS = 0;
        this.#fillingTaskId = setInterval(() => {
            taskTimeMS += this.#FILLING_INTERVAL;
            if (taskTimeMS >= durationMS) {
                this.#filler.style.width = "0vw";
                clearInterval(this.#fillingTaskId);
            } else {
                const newWidth = (taskTimeMS / durationMS) * this.#barLength;
                this.#filler.style.width = `${newWidth}vw`;
            }
        }, this.#FILLING_INTERVAL);
    }
}