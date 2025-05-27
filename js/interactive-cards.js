/**
 * interactive-cards.js
 * Skript für die interaktiven Kacheln im PLG-Überblick-Bereich
 */

document.addEventListener('DOMContentLoaded', function() {
    initInteractiveCards();
});

/**
 * Initialisiert die interaktiven Kacheln
 */
function initInteractiveCards() {
    const cards = document.querySelectorAll('.interactive-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
        
        // Tastaturzugänglichkeit
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('flipped');
            }
        });
    });
    
    // Mehr-Erfahren-Buttons in den Karten
    const learnMoreButtons = document.querySelectorAll('.card-learn-more');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Verhindert, dass die Karte umgedreht wird
            
            const targetId = this.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Wenn es ein Tab-Element ist, aktiviere den entsprechenden Tab
                if (targetId.includes('tab-')) {
                    const tabId = targetId.replace('tab-', '');
                    const tabButton = document.querySelector(`[data-tab="${tabId}"]`);
                    if (tabButton) {
                        setTimeout(() => {
                            tabButton.click();
                        }, 500);
                    }
                }
            }
        });
    });
}
