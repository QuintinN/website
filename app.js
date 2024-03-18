document.addEventListener('DOMContentLoaded', () => {
    const asciiArtElement = document.getElementById('ascii-art');
    if (!asciiArtElement) {
        console.error('ASCII art element not found!');
        return;
    }

    const originalAsciiLines = asciiArtElement.innerText.split('\n');
    let lineStates = originalAsciiLines.map(() => ({ offset: 0, direction: 1 }));
    const maxSpaces = 25;
    const startDelay = 1;
    let cycleCount = 0;

    let frameCount = 0; // New variable to count frames
    const frameRate = 20; // Update the wave every 10 frames to slow down the animation

    function updateAsciiArtWave() {
        frameCount++; // Increment frame count
        if (frameCount % frameRate === 0) { // Only update when frameCount is a multiple of frameRate
            const updatedAsciiLines = originalAsciiLines.map((line, index) => {
                if (cycleCount >= startDelay * index) {
                    const state = lineStates[index];
                    state.offset += state.direction;
                    if (state.offset === maxSpaces || state.offset === 0) {
                        state.direction *= -1;
                    }
                }
                return ' '.repeat(lineStates[index].offset) + line;
            }).join('\n');

            asciiArtElement.innerText = updatedAsciiLines;
            cycleCount++;
        }

        requestAnimationFrame(updateAsciiArtWave);
    }

    requestAnimationFrame(updateAsciiArtWave);
});
