document.addEventListener('DOMContentLoaded', () => {
    const asciiArtElement = document.getElementById('ascii-art');
    if (!asciiArtElement) {
        console.error('ASCII art element not found!');
        return;
    }

    const originalAsciiLines = asciiArtElement.innerText.split('\n');
    let lineStates = originalAsciiLines.map(() => ({ offset: 0, direction: 1 }));
    const maxSpaces = 45;
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

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.background-container');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const startPositionX = Math.random() * window.innerWidth;
        particle.style.left = `${startPositionX}px`;

        container.appendChild(particle);

        const endPositionX = startPositionX + (Math.random() - 0.5) * 200;
        const duration = Math.random() * 3 + 2; // Between 2 and 5 seconds

        particle.animate([
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear',
            fill: 'forwards'
        });

        setTimeout(() => {
            container.removeChild(particle);
        }, duration * 1000);
    }

    setInterval(createParticle, 10);
});
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.background-container');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const startPositionX = Math.random() * window.innerWidth;
        particle.style.left = `${startPositionX}px`;

        container.appendChild(particle);

        const endPositionX = startPositionX + (Math.random() - 0.5) * 200;
        const duration = Math.random() * 3 + 2; // Between 2 and 5 seconds

        particle.animate([
            { transform: 'translateY(0px)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear',
            fill: 'forwards'
        });

        setTimeout(() => {
            container.removeChild(particle);
        }, duration * 1000);
    }

    setInterval(createParticle, 100);
});
