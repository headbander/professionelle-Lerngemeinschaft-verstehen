/**
 * audio-player.js
 * Skript für den Audio-Player der PLG-Website
 */

document.addEventListener('DOMContentLoaded', function() {
    initAudioPlayers();
});

/**
 * Initialisiert alle Audio-Player auf der Seite
 */
function initAudioPlayers() {
    // Alle Audio-Player auf der Seite finden
    const players = document.querySelectorAll('.audio-player');
    
    players.forEach(player => {
        const audio = player.querySelector('audio');
        const playBtn = player.querySelector('.play-btn');
        const progressBar = player.querySelector('.progress');
        const progressContainer = player.querySelector('.progress-bar');
        const currentTimeDisplay = player.querySelector('.current-time');
        const durationDisplay = player.querySelector('.duration');
        const chapterMarkers = player.querySelectorAll('.chapter-marker');
        
        if (!audio || !playBtn || !progressBar) return;
        
        // Play/Pause-Funktionalität
        playBtn.addEventListener('click', function() {
            if (audio.paused) {
                // Alle anderen Audio-Player pausieren
                document.querySelectorAll('audio').forEach(a => {
                    if (a !== audio && !a.paused) {
                        a.pause();
                        const otherPlayBtn = a.closest('.audio-player').querySelector('.play-btn i');
                        if (otherPlayBtn) otherPlayBtn.className = 'fas fa-play';
                    }
                });
                
                // Diesen Player abspielen
                audio.play();
                playBtn.querySelector('i').className = 'fas fa-pause';
            } else {
                audio.pause();
                playBtn.querySelector('i').className = 'fas fa-play';
            }
        });
        
        // Fortschrittsbalken aktualisieren
        audio.addEventListener('timeupdate', function() {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
            
            // Aktuelle Zeit anzeigen
            if (currentTimeDisplay) {
                currentTimeDisplay.textContent = formatTime(audio.currentTime);
            }
        });
        
        // Klick auf Fortschrittsbalken
        if (progressContainer) {
            progressContainer.addEventListener('click', function(e) {
                const clickPosition = (e.offsetX / this.offsetWidth);
                audio.currentTime = clickPosition * audio.duration;
            });
        }
        
        // Kapitelmarker
        chapterMarkers.forEach(marker => {
            marker.addEventListener('click', function() {
                const time = parseFloat(this.getAttribute('data-time'));
                if (!isNaN(time)) {
                    audio.currentTime = time;
                    
                    // Wenn Audio pausiert ist, abspielen
                    if (audio.paused) {
                        audio.play();
                        playBtn.querySelector('i').className = 'fas fa-pause';
                    }
                }
            });
        });
        
        // Dauer anzeigen, sobald Metadaten geladen sind
        audio.addEventListener('loadedmetadata', function() {
            if (durationDisplay) {
                durationDisplay.textContent = formatTime(audio.duration);
            }
        });
        
        // Bei Ende zurücksetzen
        audio.addEventListener('ended', function() {
            playBtn.querySelector('i').className = 'fas fa-play';
            progressBar.style.width = '0%';
            audio.currentTime = 0;
        });
    });
}

/**
 * Formatiert die Zeit in Minuten und Sekunden
 */
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
