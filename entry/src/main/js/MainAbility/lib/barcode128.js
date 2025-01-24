function generateCode128CBarcode(value) {
    // Code 128 number binary map
    const code128C = [
        "11011001100", "11001101100", "11001100110", "10010011000", "10010001100", "10001001100",
        "10011001000", "10011000100", "10001100100", "11001001000", "11001000100", "11000100100",
        "10110011100", "10011011100", "10011001110", "10111001100", "10011101100", "10011100110",
        "11001110010", "11001011100", "11001001110", "11011100100", "11001110100", "11101101110",
        "11101001100", "11100101100", "11100100110", "11101100100", "11100110100", "11100110010",
        "11011011000", "11011000110", "11000110110", "10100011000", "10001011000", "10001000110",
        "10110001000", "10001101000", "10001100010", "11010001000", "11000101000", "11000100010",
        "10110111000", "10110001110", "10001101110", "10111011000", "10111000110", "10001110110",
        "11101110110", "11010001110", "11000101110", "11011101000", "11011100010", "11011101110",
        "11101011000", "11101000110", "11100010110", "11101101000", "11101100010", "11100011010",
        "11101111010", "11001000010", "11110001010", "10100110000", "10100001100", "10010110000",
        "10010000110", "10000101100", "10000100110", "10110010000", "10110000100", "10011010000",
        "10011000010", "10000110100", "10000110010", "11000010010", "11001010000", "11110111010",
        "11000010100", "10001111010", "10100111100", "10010111100", "10010011110", "10111100100",
        "10011110100", "10011110010", "11110100100", "11110010100", "11110010010", "11011011110",
        "11011110110", "11110110110", "10101111000", "10100011110", "10001011110", "10111101000",
        "10111100010", "11110101000", "11110100010", "10111011110", "10111101110", "11101011110",
        "11110101110"
    ];

    const startCodeC = "11010011100"; // Start Code C
    const stopCode = "1100011101011"; // Stop Code
    const bars = [];
    let checksum = 105; //code C start with 105

    //split the numeric data into pairs
    if (value.length % 2 !== 0) {
        value = "0" + value; // start with a leading zero for odd length value
    }

    for (let i = 0; i < value.length; i += 2) {
        const pair = parseInt(value.substring(i, i + 2), 10);
        bars.push(code128C[pair]);
        checksum += pair * (i / 2 + 1);
    }

    // checksum modulo 103
    const checksumValue = checksum % 103;
    bars.push(code128C[checksumValue]);

    // start and stop codes
    bars.unshift(startCodeC);
    bars.push(stopCode);

    return bars;
}

function renderBarcode128(canvas, value, config) {

    const ctx = canvas.getContext("2d");
    console.log(JSON.stringify(config))
    const barWidth = config.barWidth
    const barHeight = config.barHeight
    const barColor = config.barColor
    const bgColor = config.bgColor

    var startingPointX = config.startingPointX
    var startingPointY = config.startingPointY

    try {
        const patterns = generateCode128CBarcode(value);
        var x = startingPointX
        for (let i = 0; i < patterns.length; i++) {
            const bars = patterns[i]
            console.log("bar:" + bars)
            for (let j = 0; j < bars.length; j++) {
                const bit = bars[j]
                console.log("bit:" + bit)
                ctx.fillStyle = bit === "1" ? barColor : bgColor;
                ctx.fillRect(x, startingPointY, barWidth, barHeight);
                x += barWidth;
            }
        }

    } catch (error) {
        console.error(error.message || error);

    }

}

export { renderBarcode128 }