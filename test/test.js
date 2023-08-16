const {createCanvas} = require('canvas');
const {CanvasEmoji} = require('../dist/index');
const emoji = require('node-emoji');
const fs = require('fs');
const Jimp = require('jimp');


async function drawPngReplaceEmoji() {
    const canvas = createCanvas(0, 0);
    const canvasCtx = canvas.getContext("2d");
    const canvasEmoji = new CanvasEmoji(canvasCtx);

    const fontSize = 800;
    const text = "🐱‍🐉+🌑";

    canvas.width = fontSize * text.length;
    canvas.height = fontSize;

    const a = await canvasEmoji.drawPngReplaceEmoji({
        text: text,
        fillStyle: "#ff0000",
        font: `${fontSize}px Arial`,
        x: 0,
        y: fontSize * 0.83,
        emojiW: fontSize,
        emojiH: fontSize
    });
    const image = await Jimp.read(canvas.toBuffer());

    // Auto-crop the image based on the object boundaries
    image.autocrop({ cropOnlyFrames: false });

    // Save the resulting image
    return image.writeAsync(__dirname + "/test.png");
}

async function drawPngReplaceEmojiWithEmojicdn() {
    const canvas = createCanvas(0, 0);
    const canvasCtx = canvas.getContext("2d");
    const canvasEmoji = new CanvasEmoji(canvasCtx);

    const fontSize = 800;
    const text = "🐱‍🐉+🌑";

    canvas.width = fontSize * text.length;
    canvas.height = fontSize;

    const a = await canvasEmoji.drawPngReplaceEmojiWithEmojicdn({
        text: text,
        fillStyle: "#ff0000",
        font: `${fontSize}px Arial`,
        x: 0,
        y: fontSize * 0.83,
        emojiW: fontSize,
        emojiH: fontSize,
        emojiStyle: 'apple'
    });
    const image = await Jimp.read(canvas.toBuffer());

    // Auto-crop the image based on the object boundaries
    image.autocrop({ cropOnlyFrames: false });

    // Save the resulting image
    return image.writeAsync(__dirname + "/test2.png");
}

drawPngReplaceEmoji();
drawPngReplaceEmojiWithEmojicdn();
