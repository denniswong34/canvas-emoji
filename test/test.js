const {createCanvas} = require('canvas');
const {CanvasEmoji} = require('../dist/index');
const fs = require('fs');


function drawPngReplaceEmoji() {
    const canvas = createCanvas(5000, 500);
    const canvasCtx = canvas.getContext("2d");
    const canvasEmoji = new CanvasEmoji(canvasCtx);
    
    const keys = canvasEmoji.getEmojiKeys("💋💃");
    console.log("Keys: ", keys);

    const a = canvasEmoji.drawPngReplaceEmoji({
        text: "🚼🚼🚼测试一下💋💃",
        fillStyle: "#000000",
        font: "bold 200px Impact",
        x: 0,
        y: 200,
        emojiW: 200,
        emojiH: 200
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

    const text = "🐰+🍬";
    const fontSize = 300;
    const { width: textWidth } = canvasCtx.measureText(text);
    const emojiCount = canvasEmoji.getEmojiKeys(text).length;
    const wordCount = text.length - (emojiCount * 2);
    
    const estimatedWidthByTextWidth = textWidth / 0.0625;
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
    const out = fs.createWriteStream(__dirname + "/test2.png");
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("The PNG file was created."));
    return a;
}

//console.log(drawPngReplaceEmoji());
drawPngReplaceEmojiWithEmojicdn();
