const {createCanvas} = require('canvas');
const {CanvasEmoji} = require('../dist/index');
const emoji = require('node-emoji');
const fs = require('fs');
const Jimp = require('jimp');


async function drawPngReplaceEmoji() {
    const canvas = createCanvas(2000, 2000);
    const canvasCtx = canvas.getContext("2d");
    const canvasEmoji = new CanvasEmoji(canvasCtx);
    const text = "👨‍🔧 + 🐊";

    const keys = canvasEmoji.getEmojiKeys(text);
    console.log("Keys: ", keys);

    const a = await canvasEmoji.drawPngReplaceEmoji({
        text: text,
        fillStyle: "#000000",
        font: "bold 200px Impact",
        x: 0,
        y: 800,
        emojiW: 800,
        emojiH: 800
    });
    const out = fs.createWriteStream(__dirname + "/test.png");
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("The PNG file was created."));
    return a;
}

async function drawPngReplaceEmojiWithEmojicdn() {
    const canvas = createCanvas(0, 0);
    const canvasCtx = canvas.getContext("2d");
    const canvasEmoji = new CanvasEmoji(canvasCtx);

    const text = "👨‍🔧 + 🐊";
    const pureText = emoji.strip(text);
    console.log(`PureText: **${pureText}**`);
    const fontSize = 300;
    const { width: textWidth } = canvasCtx.measureText(text);
    const emojiCount = canvasEmoji.getEmojiKeys(text).length;
    const wordCount = pureText.length;

    const estimatedWidthByTextWidth = textWidth / 0.0625 * 2;
    const estimatedWidthByCalc = fontSize * emojiCount + wordCount * fontSize * 0.6;

    const estimatedWidth = Math.max(estimatedWidthByCalc, estimatedWidthByTextWidth); // Adjust canvas width based on text and emoji size

    console.log("MeasureText: ", JSON.stringify(canvasCtx.measureText(text)));
    console.log("#Emoji: ", emojiCount)
    console.log("#Word: ", wordCount)
    console.log("TextLength: " , text.length);
    console.log("TextWidth: " , textWidth);
    console.log("estimatedWidth: " , estimatedWidth);

    const canvasWidth = estimatedWidth; // Adjust canvas width based on text and emoji size
    const canvasHeight = fontSize; // Adjust canvas height based on the maximum of text and emoji size

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const a = await canvasEmoji.drawPngReplaceEmojiWithEmojicdn({
        text: text,
        fillStyle: "#000000",
        font: `${fontSize}px Arial`,
        x: 0,
        y: fontSize * 0.83,
        emojiW: fontSize,
        emojiH: fontSize,
        emojiStyle: 'apple'
    });
    //const out = fs.createWriteStream(__dirname + "/test2.png");
    //const stream = canvas.createPNGStream();

    const image = await Jimp.read(canvas.toBuffer());

    // Auto-crop the image based on the object boundaries
    image.autocrop();

    // Save the resulting image
    await image.writeAsync("test/test2.png");

    //stream.pipe(out);

    //return new Promise((res) => {
    //    out.on("finish", () => res(a));
    //});
}

drawPngReplaceEmoji();
//drawPngReplaceEmojiWithEmojicdn();
