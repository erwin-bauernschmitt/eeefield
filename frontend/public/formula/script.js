function toggleSection(id) {
    const explanationId = id.replace('example', 'explanation');
    const exampleId = id.replace('explanation', 'example');

    // Get the elements
    const target = document.getElementById(id);
    const other = id === explanationId ? document.getElementById(exampleId) : document.getElementById(explanationId);
    
    // If we're showing the target section, hide the other
    if (target.classList.contains('visible')) {
        target.classList.remove('visible');
        target.style.display = 'none';
        // You might not need to call MathJax here since the content is being hidden
    } else {
        // Hide the other section if it's visible
        if (other.classList.contains('visible')) {
            other.classList.remove('visible');
            other.style.display = 'none';
        }
        target.classList.add('visible');
        target.style.display = 'block'; // Change to 'block' to make it visible
        
        // Call MathJax to typeset the newly visible content
        MathJax.typesetPromise([target]).then(() => {
            // Code to execute after MathJax has finished formatting the math
        });
    }
}



// Function to simulate clicking all ? buttons to expand or collapse all explanations
function toggleAllExplanations() {
    // Select all buttons with the text "?" in equation-container
    const explanationButtons = Array.from(document.querySelectorAll('.equation-container .button'))
        .filter(button => button.textContent.trim() === '?');

    explanationButtons.forEach(button => {
        // Simulate a click on each ? button
        button.click();
    });

    // Batch typeset math after toggling all explanations
    MathJax.typesetPromise().then(() => {
        console.log("All explanations toggled and typeset completed.");
    });
}

// Event listener for Ctrl + Shift + E to toggle all explanations
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'E') {
        // Log a message to check if the shortcut is being detected
        console.log("Ctrl + Shift + E shortcut detected!");
        event.preventDefault();
        toggleAllExplanations();
    }
});



document.addEventListener('DOMContentLoaded', function() {
    const collapsibleHeadings = document.querySelectorAll('.collapsible-heading');

    collapsibleHeadings.forEach(function(heading) {
        heading.addEventListener('click', function() {
            const content = heading.nextElementSibling; // Get the content
            const chevron = heading.querySelector('.chevron'); // Get the chevron

            if (content.classList.contains('expanded')) {
                // Prepare for collapsing
                content.style.maxHeight = content.scrollHeight + "px"; // Set starting point for transition
                content.offsetHeight; // Trigger reflow to make sure transition starts from scrollHeight
                content.style.maxHeight = 0; // Start collapsing transition
                content.classList.remove('expanded');
                content.classList.add('collapsed');
                chevron.textContent = '▲'; // Chevron up, indicating content is collapsed/ing
            } else {
                // Expand action
                content.classList.remove('collapsed');
                content.classList.add('expanded');
                content.style.maxHeight = content.scrollHeight + "px"; // Dynamically set max-height for smooth transition
                chevron.textContent = '▼'; // Chevron down, indicating content is expanded/ing
                // Optionally reset max-height after transition to allow for dynamic content changes
                setTimeout(() => {
                  content.style.maxHeight = null;
                }, 300); // Timeout duration should match CSS transition duration
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    var images = document.querySelectorAll('.left-svg, .middle-svg');
    images.forEach(function(img) {
        var scale = img.getAttribute('image-scale');
        if (scale) {
            var originalWidth = img.naturalWidth || img.width;  // Get the original width
            var originalHeight = img.naturalHeight || img.height;  // Get the original height
            
            // Calculate new dimensions based on scale
            var newWidth = originalWidth * scale;
            var newHeight = originalHeight * scale;
            
            // Set the new width and height explicitly
            img.style.width = newWidth + 'px';
            img.style.height = newHeight + 'px';
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    var panel = document.getElementById('sidePanel');
    var content = document.querySelector('body'); 
    var toggle = document.getElementById('panelToggle');

    // Initialize the side panel state correctly
    panel.style.left = '0px'; // Ensure JS knows the panel is open
    content.style.marginLeft = 'calc(20% + 8px)'; // Ensure JS knows the body margin is shifted
    toggle.textContent = '⟪'; // Set toggle button to show the open icon

    toggle.addEventListener('click', function() {
        if (panel.style.left === '0px') {
            panel.style.left = '-20%'; // Hide the panel
            content.style.marginLeft = '8px'; // Reset margin
            toggle.textContent = '⟫'; // Change to show the panel is closed
            toggle.style.left = '0px'; // Reset toggle button position
        } else {
            panel.style.left = '0px'; // Show the panel
            content.style.marginLeft = 'calc(20% + 8px)'; // Shift content
            toggle.textContent = '⟪'; // Change to show the panel is open
            toggle.style.left = '20%'; // Adjust toggle button position
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to both main links and sublinks
    document.querySelectorAll('.panel-link, .panel-sublink').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior
            var targetId = this.getAttribute('href'); // Get the target section id from href
            var targetElement = document.querySelector(targetId);
            var navbarHeight = document.querySelector('.sticky-nav').offsetHeight; // Get the height of the navbar
            var additionalPadding = 28; // Extra padding to ensure visibility

            // Function to recursively simulate clicking on parent collapsible headings
            function simulateClicksOnParents(element) {
                let currentElement = element.closest('.content'); // Start from the closest collapsible content container
                while (currentElement) {
                    let heading = currentElement.previousElementSibling; // Assuming headings are directly preceding content
                    if (heading && heading.classList.contains('collapsible-heading') && currentElement.classList.contains('collapsed')) {
                        heading.click(); // Simulate click only if collapsed to expand
                    }
                    currentElement = currentElement.parentElement.closest('.content'); // Move to the next parent content
                }
            }

            // Expand the target section if it's collapsible and collapsed
            function expandTargetSection(target) {
                let content = target.nextElementSibling; // Assuming the content directly follows the target
                if (content && content.classList.contains('collapsed')) {
                    let heading = target.closest('.collapsible-heading');
                    if (heading) heading.click(); // Simulate click to expand
                }
            }

            // Expand all necessary parent collapsible headings
            simulateClicksOnParents(targetElement);
            // Also, try to expand the target section if it itself is a collapsible heading
            expandTargetSection(targetElement);

            // Ensure expansions are completed before scrolling
            setTimeout(() => {
                // Calculate new scroll position to account for navbar height and additional padding
                var elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - navbarHeight - additionalPadding,
                    behavior: 'smooth'
                });
            }, 300); // Delay to ensure expansions have completed
        });
    });
});




document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.getElementById('searchInput');
    var clearButton = document.getElementById('clearSearchButton');

    searchInput.addEventListener('input', function() {
        // Toggle clear button based on input content
        if (searchInput.value.length > 0) {
            clearButton.style.visibility = 'visible';
        } else {
            clearButton.style.visibility = 'hidden';
        }
    });

    searchInput.addEventListener('blur', function() {
        // Optionally hide clear button when input loses focus and is empty
        if (searchInput.value.length === 0) {
            clearButton.style.visibility = 'hidden';
        }
    });

    clearButton.addEventListener('click', function() {
        // Clear input and maintain focus
        searchInput.value = '';
        searchInput.focus();
        clearButton.style.visibility = 'hidden';
    });
});


function clearSearch() {
    var searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    searchInput.focus(); // Keep focus on the input after clearing
    toggleClearButton(); // Update button visibility
}


document.getElementById('expandAll').addEventListener('click', function() {
    toggleSections(true);
});

document.getElementById('collapseAll').addEventListener('click', function() {
    toggleSections(false);
});

function toggleSections(expand) {
    const sections = document.querySelectorAll('.content'); // Assuming .content is your collapsible section class
    sections.forEach(section => {
        if (expand && section.classList.contains('collapsed')) {
            section.previousElementSibling.click(); // Simulate a click on the heading to expand
        } else if (!expand && !section.classList.contains('collapsed')) {
            section.previousElementSibling.click(); // Simulate a click on the heading to collapse
        }
    });
}



// You may want to add event listeners to the search box for actual search functionality,
// which will filter sections based on the input.
document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    // Placeholder for search functionality
    console.log('Search for:', searchTerm);
});


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}



