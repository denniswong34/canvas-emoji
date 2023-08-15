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
    const canvas = createCanvas(800, 200);
    const canvasCtx = canvas.getContext("2d");
    const canvasEmoji = new CanvasEmoji(canvasCtx);
    const a = await canvasEmoji.drawPngReplaceEmojiWithEmojicdn({
        text: "	🚼测试一下哦💋💃测试一下💋测试一下💋💃测试一下💋测试一下💋💃",
        fillStyle: "#000000",
        font: "bold 200px Impact",
        x: 0,
        y: 100,
        emojiW: 12,
        emojiH: 12,
        length: 20,
        emojiStyle: 'apple'
    });
    const out = fs.createWriteStream(__dirname + "/test2.png");
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => console.log("The PNG file was created."));
    return a;
}

console.log(drawPngReplaceEmoji());
drawPngReplaceEmojiWithEmojicdn();
