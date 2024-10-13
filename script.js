// Elements
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

// Music Data (songs and artists)
const songs = [
    {
        title: 'Song 1',
        artist: 'Artist 1',
        src: 'music/song1.mp3'
    },
    {
        title: 'Song 2',
        artist: 'Artist 2',
        src: 'music/song2.mp3'
    },
    {
        title: 'Song 3',
        artist: 'Artist 3',
        src: 'music/song3.mp3'
    }
];

// Track current song
let currentSongIndex = 0;
let isPlaying = false;

// Create audio element
const audio = new Audio(songs[currentSongIndex].src);

// Load Song Details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
}

// Play Song
function playSong() {
    audio.play();
    playBtn.innerText = 'Pause';
    isPlaying = true;
}

// Pause Song
function pauseSong() {
    audio.pause();
    playBtn.innerText = 'Play';
    isPlaying = false;
}

// Update Progress Bar
function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
}

// Set Progress Bar Position
function setProgress(e) {
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
}

// Play/Pause Button Functionality
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Next Song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

// Previous Song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    playSong();
});

// Update progress bar during song
audio.addEventListener('timeupdate', updateProgress);

// Set progress bar when user clicks
progress.addEventListener('input', setProgress);

// Load first song on page load
loadSong(songs[currentSongIndex]);