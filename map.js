PIXEL = 1;
MAP_SIZE = 500;
EXP = 1;
IMAGE = null;
VY = VX = 0;
MX = MY = MAP_SIZE;
BIOMES = [{
    name: 'rock',
    point: 0,
    color: "rgb(0, 0, 0)",
    colora: [0, 0, 0]
}, {
    name: 'water',
    point: 0.33,
    color: "rgb(55, 108, 147)",
    colora: [55, 108, 147]
}, {
    name: 'land',
    point: 2,
    color: "rgb(55, 147, 70)",
    colora: [55, 147, 70]
}];
FREQUENCIES = [1, 2, 4, 8, 16, 32];

function getContext() {
    canvas = document.getElementById('canvas');
    canvas.width = canvas.height = MAP_SIZE;
    CTX = canvas.getContext("2d");
    return CTX.createImageData(canvas.width, canvas.height);
}

function drawPoint(x, y, z) {
    var color = null;
    cell = (x + y * MAP_SIZE) * 4;

    IMAGE.data[cell] = 0; // height based alpha
    IMAGE.data[cell + 1] = 0; // height based alpha
    IMAGE.data[cell + 2] = 0; // height based alpha
    IMAGE.data[cell + 3] = z * 255; // height based alpha
    // for (b = 1; b < BIOMES.length; b++) {
    //     if (BIOMES[b - 1].point < z && z < BIOMES[b].point) {
    //         IMAGE.data[cell] = BIOMES[b].colora[0]; // r
    //         IMAGE.data[cell + 1] = BIOMES[b].colora[1]; // g
    //         IMAGE.data[cell + 2] = BIOMES[b].colora[2]; // b
    //         IMAGE.data[cell + 3] = 255;
    //         break;
    //     }
    // }
    // */
}

function getElevation(x, y) {
    var result = 0;
    for (var i = 0; i < FREQUENCIES.length; i++) {
        var freq = FREQUENCIES[i],
            nx = x / MAP_SIZE,
            ny = y / MAP_SIZE;
        result += ((1 / freq) * noise.simplex2(freq * nx, freq * ny));
    }
    // result = Math.pow(result, EXP);
    result = Math.abs(result);

    return result;
}

function drawMap() {
    IMAGE = getContext();
    CTX.clearRect(0, 0, MAP_SIZE, MAP_SIZE);
    var z = 0;
    var ms = Number.MAX_SAFE_INTEGER / 10000;
    // count from 1 to 50
    for (var y = VY; y < MY; y += PIXEL) {
        // count from 1 to 50
        for (var x = VX; x < MX; x += PIXEL) {
            // draw point
            z = getElevation(x, y);
            drawPoint(x - VX, y - VY, z);
        }
    }
    CTX.fillColor = 'black';
    CTX.fillRect(0, 0, MAP_SIZE, MAP_SIZE);
    CTX.putImageData(IMAGE, 0, 0);
}

function updateEXP(value) {
    document.getElementById("exp_slider_disp").innerHTML = value;
    EXP = value;
    drawMap();
}

function updateWater(value) {
    document.getElementById("water_level_disp").innerHTML = value;
    BIOMES[1].point = value;
    drawMap();
}

function seed() {
    noise.seed(Math.random());
    drawMap();
}

function navX(val) {
    VX += val;
    MX = VX + MAP_SIZE;
    drawMap();
}

function navY(val) {
    VY += val;
    MY = VY + MAP_SIZE;
    drawMap();
}

updateWater(0.33);
updateEXP(1);
seed();
drawMap();
