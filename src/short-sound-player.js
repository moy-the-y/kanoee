export default class ShortSoundPlayer {
    #auctx;
    #abMap = new Map(); // filePath -> audioBuffer

    constructor(audioContext) {
        this.#auctx = audioContext;
    }

    async play(soundFilePath) {
        console.log(this.#abMap);
        if (await this.#getBuffer(soundFilePath)) {
            this.#playSound(this.#abMap.get(soundFilePath));
        }
        console.log(this.#abMap);
    }

    queryBufferLength(filePath) {
        const dur = this.#abMap.get(filePath).duration;
        return (dur * 1000);
    }

    async #playSound(buffer) {
        // dealing with autoplay policy
        if (this.#auctx.state === "suspended") {
            await this.#auctx.resume(); // state resumes to running
        }

        const source = new AudioBufferSourceNode(this.#auctx, {
            buffer: buffer,
        });
        source.connect(this.#auctx.destination);
        source.start();
    }

    /**
     * 
     * @param {*} filePath 
     * @returns {Promise<boolean>} isSuccess
     */
    async #getBuffer(filePath) {
        for (const kv of this.#abMap) {
            if (kv[0] === filePath) {
                // already had the buffer created
                return true;
            }
        }

        // don't have the buffer, create one
        try {
            const res = await fetch(filePath);
            const buffer = await res.arrayBuffer();
            const audioBuffer = await this.#auctx.decodeAudioData(buffer);

            // making sure abMap is clean
            if (audioBuffer) {
                this.#abMap.set(filePath, audioBuffer);
                return true;
            }
        } catch (err) {
            return false;
        }

        return false;
    }
}