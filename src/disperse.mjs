export function disperse(stage, options, ...elements) {
    // get stage DOM element
    const stageDom = document.getElementById(stage);

    if (stageDom) {
        // get DOM rect of stage
        const stageClientRect = stageDom.getBoundingClientRect();

        for (const element of elements) {
            // get element DOM
            const e = document.getElementById(element);

            if (e) {
                // get element dimensions
                const eClientRect = e.getBoundingClientRect();

                // make element position type absolute
                e.style.position = 'absolute';

                // get new coordinates for element
                const nx = getRandomArbitrary(stageClientRect.left, stageClientRect.right - eClientRect.width);
                const ny = getRandomArbitrary(stageClientRect.top, stageClientRect.bottom - eClientRect.height);

                // set new position
                e.style.transform = `translate(${nx}px,${ny}px)`;
            }
        }
    }
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
