export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export function checkOverlap(clientRect, x2, y2, w2, h2) {
    const {x: x1, y: y1, width: w1, height: h1} = clientRect;

    return x2 < x1 + w1
        && x2 > x1 - w2
        && y2 < y1 + h1
        && y2 > y1 - h2;
}
