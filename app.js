document.addEventListener('DOMContentLoaded', () => {
    const asciiArtElement = document.getElementById('ascii-art');
    if (!asciiArtElement) {
        console.error('ASCII art element not found!');
        return;
    }

    const originalAsciiLines = asciiArtElement.innerText.split('\n');
    let lineStates = originalAsciiLines.map(() => ({ offset: 0, direction: 1 }));
    const maxSpaces = 53; 
    const startDelay = 1;
    let cycleCount = 0;

    let frameCount = 0; // New variable to count frames
    const frameRate = 10; // Update the wave every 10 frames to slow down the animation

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
    const container = document.querySelector('.background-container'); // Target the body for appending the coins

    // Function to create and return a coin element with a fixed size, opacity, and initial position
    function createCoin(src) {
        const size = 18; // Set to 12 pixels as per previous instructions (seems to be a typo)
        const opacity = 1;
        const iframe = document.createElement('iframe');
        iframe.src = src;
        iframe.width = size;
        iframe.height = size;
        iframe.frameBorder = "0";
        iframe.style.opacity = opacity;
        iframe.classList.add('giphy-embed');
        iframe.allowFullscreen = true;
        iframe.style.position = 'absolute';
        iframe.style.top = `${-size}px`;
        iframe.style.left = `${Math.random() * (window.innerWidth - size)}px`;

        // Randomly decide if the GIF should rotate clockwise or counterclockwise
        const rotationDirection = Math.random() < 0.5 ? 1 : -1; // 1 for clockwise, -1 for counterclockwise
        iframe.dataset.rotationDirection = rotationDirection; // Store this value for use in animation

        return iframe;
    }

    // Adjusted function to animate a coin including rotation
    function animateCoin(coin) {
        const speed = Math.random() * 2 + 1;
        const rotationDirection = parseInt(coin.dataset.rotationDirection, 10);

        function move() {
            let currentTop = parseFloat(coin.style.top);
            currentTop += speed;
            coin.style.top = `${currentTop}px`;

            // Apply rotation
            coin.style.transform = `rotate(${currentTop * rotationDirection}deg)`;

            if (currentTop > window.innerHeight) {
                coin.style.top = `${-parseFloat(coin.height)}px`;
                coin.style.left = `${Math.random() * (window.innerWidth - coin.width)}px`; // Reset to new position
            }

            requestAnimationFrame(move);
        }
        move();
    }

    // Function to generate a random number of coins and animate them
    function generateAndAnimateCoins(src, quantity) {
        for (let i = 0; i < quantity; i++) {
            const coin = createCoin(src);
            container.appendChild(coin);
            animateCoin(coin);
        }
    }

    // Coin sources
    const bitcoinSrc = "https://giphy.com/embed/NJ2hpQBcgiOz6cbal6";
    const ethereumSrc = "https://giphy.com/embed/WZbiJmZsWiDXDVjZCz";

    // Generate and animate a random number of coins for each type (ensuring even quantity)
    const totalCoins = 50; // Total number of coins
    const bitcoinQuantity = Math.floor(totalCoins / 2); // Divide by 2 to ensure even quantity
    const ethereumQuantity = totalCoins - bitcoinQuantity; // Remaining quantity for Ethereum
    generateAndAnimateCoins(bitcoinSrc, bitcoinQuantity); // For Bitcoin
    generateAndAnimateCoins(ethereumSrc, ethereumQuantity); // For Ethereum
});

document.addEventListener('DOMContentLoaded', () => {
    // Your existing code...

    // Select all the `.event` elements from the timeline
    const events = document.querySelectorAll('.timeline .event');

    // Define the slide-in animation
    const slideInOptions = {
        root: null, // Observing relative to the viewport
        threshold: 0.1, // Trigger when 10% of the element is in the viewport
        rootMargin: "0px"
    };

    // IntersectionObserver callback function
    const slideInOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            // Remove the animation class initially to reset the state
            entry.target.classList.remove('slide-in');

            // Check if the element is intersecting
            if (!entry.isIntersecting) {
                return; // Skip if the element is not intersecting
            }

            // Re-add the class to trigger the animation
            setTimeout(() => {
                entry.target.classList.add('slide-in');
            }, 50); // Short delay to ensure class removal and addition are distinguishable
        });
    };

    // Create the Intersection Observer
    const observer = new IntersectionObserver(slideInOnScroll, slideInOptions);

    // Observe each `.event`
    events.forEach(event => {
        observer.observe(event);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Create the button
    var backToTopButton = document.createElement('a');
    backToTopButton.innerHTML = '&#x261D;'; // Unicode for ☝️ emoji
    backToTopButton.href = "#";
    backToTopButton.id = 'back-to-top';
    
    // Style the button
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.fontSize = '24px';
    backToTopButton.style.zIndex = '99';
    backToTopButton.style.border = 'none';
    backToTopButton.style.outline = 'none';
    backToTopButton.style.backgroundColor = 'transparent';
    backToTopButton.style.color = 'black';
    backToTopButton.style.cursor = 'pointer';
    backToTopButton.style.padding = '15px';
    backToTopButton.style.borderRadius = '4px';
    backToTopButton.style.textDecoration = 'none';
    backToTopButton.style.display = 'none'; // Hide by default
    
    // Append the button to the body
    document.body.appendChild(backToTopButton);
    
    // Show the button when the user scrolls down
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };
    
    // Scroll smoothly to the top when the button is clicked
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent the default anchor behavior
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});
