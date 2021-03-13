import {checkOverlap, getRandomInt} from "./util";

export function disperse(stage, options, ...elements) {
    // default options
    let noOverlap = false;
    let evenly = false;
    let excludeChildren = false;

    if (options && typeof options === 'object') {
        ({noOverlap, evenly, excludeChildren} = options);
    }

    function checkOverlaps(nx, ny, width, height, processed) {
        const clientRects = [];
        for (let i = 0; i < processed; i++) {
            clientRects.push(document.getElementById(elements[i]).getBoundingClientRect());
        }

        for (const clientRect of clientRects) {
            if (checkOverlap(clientRect, nx, ny, width, height)) {
                return true;
            }
        }

        return false;
    }

    function randomDisperse(stageClientRect) {
        let processedCount = 0;
        for (const element of elements) {
            // get element DOM
            const e = document.getElementById(element);

            if (e) {
                // get element dimensions
                const eClientRect = e.getBoundingClientRect();

                // make element position type absolute
                e.style.position = 'absolute';

                // get new coordinates for element with optional overlap checking
                let nx;
                let ny;
                do {
                    nx = getRandomInt(stageClientRect.left, stageClientRect.right - eClientRect.width);
                    ny = getRandomInt(stageClientRect.top, stageClientRect.bottom - eClientRect.height);
                } while (!noOverlap || checkOverlaps(nx, ny, eClientRect.width, eClientRect.height, processedCount));

                // set new position
                e.style.transform = `translate(${nx}px,${ny}px)`;
            }
            processedCount++;
        }
    }

    // get stage DOM element
    const stageDom = document.getElementById(stage);

    if (stageDom) {
        // get DOM rect of stage
        const stageClientRect = stageDom.getBoundingClientRect();

        if (!evenly) {
            randomDisperse(stageClientRect);
        }
    }
}
