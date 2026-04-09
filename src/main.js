import { triggerRandomAnimation } from "./animation-trigger.js";
import ShortSoundPlayer from "./short-sound-player.js";
// import cft from "/node_modules/canvas-confetti/dist/confetti.module.mjs";
import randInt from "./rand-int.js";
import SoundProgressBar from "./sound-progress-bar.js";

const IMAGE_ROOT = "/asset/image/";
const SOUND_ROOT = "/asset/sound/";
const IMAGE_COUNT = 12;
const SOUND_COUNT = 100;

const soundPlayer = new ShortSoundPlayer(new AudioContext());
const progressBar = new SoundProgressBar(
    9,
    document.querySelector("#sound-progress-bar-filler")
);

const imgContainer = document.querySelector("#yippee-img-container");
imgContainer.addEventListener("click", async () => {
    const randImg = IMAGE_ROOT + randInt(0, IMAGE_COUNT - 1) + ".png";
    const randSound = SOUND_ROOT + randInt(0, SOUND_COUNT - 1) + ".mp3";

    await soundPlayer.play(randSound);
    imgContainer.firstElementChild.src = randImg;

    progressBar.start(soundPlayer.queryBufferLength(randSound));
    triggerRandomAnimation(imgContainer);
    cft();
});