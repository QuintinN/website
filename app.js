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
    let cycleCount = 0.5;

    let frameCount = 0; // New variable to count frames
    const frameRate = 0.75; // Update the wave more frequently for a smoother animation

    function updateAsciiArtWave() {
        frameCount++; // Increment frame count
        if (frameCount % frameRate === 0) { // Only update when frameCount is a multiple of frameRate
            const updatedAsciiLines = originalAsciiLines.map((line, index) => {
                if (cycleCount >= startDelay * index) {
                    const state = lineStates[index];
                    // Modify offset increment here for smoother transition if needed
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

document.addEventListener('DOMContentLoaded', function() {
    const upArrow = document.getElementById('back-to-top');
    const downArrow = document.getElementById('scroll-to-bottom');
    const sections = document.querySelectorAll('section');
    upArrow.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    downArrow.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';

    function toggleArrowVisibility() {
        const { scrollTop, clientHeight } = document.documentElement;
        // This calculation checks if the user is at the bottom of the page.
        const atBottom = scrollTop + clientHeight >= document.documentElement.scrollHeight - 1; // Adding a small threshold for rounding errors
    
        upArrow.style.display = scrollTop > 20 ? "block" : "none";
        // Show the down arrow unless the user is at the very bottom of the page.
        downArrow.style.display = atBottom ? "none" : "block";
    }

    window.addEventListener('scroll', toggleArrowVisibility);

    // Adjusted function for better handling of section heights
    upArrow.addEventListener('click', function(e) {
        e.preventDefault();
        const currentScroll = window.pageYOffset;
        let targetSection = null;
        let aboutSectionFound = false;

        // Reverse iteration to find the target section above the current viewport.
        for (let i = sections.length - 1; i >= 0; i--) {
            if (sections[i].id === 'about' && sections[i].offsetTop < currentScroll) {
                aboutSectionFound = true;
            }
            if (sections[i].offsetTop < currentScroll - 1) { // Adding -1 to ensure we move up even from the start of a section.
                targetSection = sections[i];
                break;
            }
        }

        if (aboutSectionFound) {
            // If we have passed the "About" section, scroll to the top.
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (targetSection) {
            // If another section is found above the current position, scroll to it.
            window.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
        }
    });

    downArrow.addEventListener('click', function(e) {
        e.preventDefault();
        const currentScroll = window.pageYOffset;
        
        // Determine if the current section is 'Projects'
        let isProjectsActive = Array.from(sections).some(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            return section.id === 'projects' && currentScroll >= sectionTop && currentScroll < sectionBottom;
        });

        // If 'Projects' section is currently active, scroll to the bottom of the page
        if (isProjectsActive) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        } else {
            // If not in 'Projects', find the next section to scroll to normally
            let targetSection = null;

            Array.from(sections).some(section => {
                if (section.offsetTop > currentScroll + window.innerHeight / 2) {
                    targetSection = section;
                    return true; // Break the loop
                }
            });

            if (targetSection) {
                window.scrollTo({ top: targetSection.offsetTop, behavior: 'smooth' });
            }
        }
    });

    toggleArrowVisibility();
});


document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.description ul li').forEach(function(li) {
        // Create the icon element
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-right';
        icon.style.color = '#12d640';
        icon.style.marginRight = '8px'; // Adds spacing between the icon and text

        // Insert the icon before the list item's content
        li.prepend(icon);
    });
}); 

document.addEventListener('DOMContentLoaded', function() {
    const photoStack = document.querySelector('.photo-stack');
    photoStack.addEventListener('click', function() {
        const photos = Array.from(this.children); // Convert HTMLCollection to Array
        const frontPhoto = photos.find(photo => parseInt(photo.style.zIndex, 10) === photos.length || isNaN(parseInt(photo.style.zIndex, 10)));
        const nextIndex = photos.indexOf(frontPhoto) + 1;

        photos.forEach((photo, index) => {
            if (index === nextIndex % photos.length) {
                photo.style.zIndex = photos.length; // Bring the next photo to the front
            } else {
                const currentZIndex = parseInt(photo.style.zIndex, 10);
                photo.style.zIndex = isNaN(currentZIndex) ? 1 : currentZIndex - 1; // Move other photos one level down
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-card').forEach(function(card) {
        const photos = card.querySelectorAll('.photo');
        const counterContainer = card.querySelector('.photo-stack-counter');
        photos.forEach((photo, index) => {
            const counterBox = document.createElement('div');
            counterBox.textContent = index + 1;
            counterContainer.appendChild(counterBox);

            // Set first counter box as active initially
            if(index === 0) {
                photo.style.display = 'block';
                counterBox.classList.add('active'); // Mark as active
            } else {
                photo.style.display = 'none';
            }

            counterBox.addEventListener('click', function() {
                photos.forEach((p, i) => {
                    p.style.display = i === index ? 'block' : 'none';
                    counterContainer.children[i].classList.remove('active'); // Remove active class from all
                });
                counterBox.classList.add('active'); // Add active class to clicked one
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-goals li').forEach(function(li) {
        // Create the icon element
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-right';
        icon.style.color = '#12d640';
        icon.style.marginRight = '8px'; // Adds spacing between the icon and text

        // Insert the icon before the list item's content
        li.prepend(icon);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.project-title-link').forEach(function(link) {
        link.setAttribute('target', '_blank');
    });
});

let hasLeftContact = false;

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

document.addEventListener('scroll', () => {
    const contactSection = document.getElementById('contact');
    const adam = document.querySelector('.photoAdam');
    const god = document.querySelector('.photoGod');
    
    // Check if the contact section is in the viewport
    if (isElementInViewport(contactSection) && hasLeftContact) {
        // User has scrolled back to the contact section, restart the animation
        adam.style.animation = 'none';
        god.style.animation = 'none';
        
        setTimeout(() => {
            adam.style.animation = '';
            god.style.animation = '';
            adam.classList.add('animateAdam');
            god.classList.add('animateGod');
        }, 0);

        hasLeftContact = false; // Reset flag
    } else if (!isElementInViewport(contactSection)) {
        hasLeftContact = true; // User has left the contact section, allow for re-triggering
    }
});


