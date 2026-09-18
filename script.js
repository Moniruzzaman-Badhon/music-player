const audio = document.getElementById("audio");

const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlistElement = document.getElementById("playlist");

const autoplayCheckbox = document.getElementById("autoplay");


 // Playlist
 
const songs = [

    {
        title: "Song One",
        artist: "Artist One",
        src: "music/song1.mp3"
    },

    {
        title: "Song Two",
        artist: "Artist Two",
        src: "music/song2.mp3"
    },

    {
        title: "Song Three",
        artist: "Artist Three",
        src: "music/song3.mp3"
    },
    {
        title: "Song Four",
        artist: "Artist Four",
        src: "music/song4.mp3"
    }
];


// Current Song

let currentSongIndex = 0;


 // Load Song
 
function loadSong(index) {
    const song = songs[index];

    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    audio.load();

    updatePlaylist();
}


// Play Song

function playSong() {
    audio.play();
    playBtn.textContent = "⏸️";
}


// Pause Song

function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶️";
}


// Play / Pause Button

playBtn.addEventListener("click", function () {
    if (audio.paused) {
        playSong();
    } 
    else {
        pauseSong();
    }
});


// Next Song

function nextSong() {
    currentSongIndex++;

    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    playSong();
}


// Previous Song

function previousSong() {
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
}


nextBtn.addEventListener("click", nextSong);
previousBtn.addEventListener("click", previousSong);

// Update Progress Bar

audio.addEventListener("timeupdate", function () {
    if (audio.duration) {
        const progressPercent =
            (audio.currentTime / audio.duration) * 100;
             progress.value = progressPercent;
             currentTime.textContent = formatTime(audio.currentTime);
    }
});


// Duration

audio.addEventListener("loadedmetadata", function () {
    duration.textContent = formatTime(audio.duration);
});


// Change Progress

progress.addEventListener("input", function () {
    if (audio.duration) {
        audio.currentTime = (progress.value / 100) * audio.duration;
    }
});


// Format Time

function formatTime(time) {
    if (isNaN(time)) {
        return "0:00";
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}


// Volume Control

volume.addEventListener("input", function () {
    audio.volume = volume.value;
});


// Autoplay

audio.addEventListener("ended", function () {
    if (autoplayCheckbox.checked) {
        nextSong();
    } 
    else {
        playBtn.textContent = "▶️";
    }

});


// Create Playlist

function createPlaylist() {
    playlistElement.innerHTML = "";
    songs.forEach(function (song, index) {
        const li = document.createElement("li");
        li.textContent = song.title + " - " + song.artist;

        li.addEventListener("click", function () {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        playlistElement.appendChild(li);
    });
}


// Highlight Current Song

function updatePlaylist() {
    const playlistItems = playlistElement.querySelectorAll("li");

    playlistItems.forEach(function (item, index) {
        if (index === currentSongIndex) {
            item.classList.add("active");
        } 
        else {
            item.classList.remove("active");
        }
    });
}


// Start Player

loadSong(currentSongIndex);
createPlaylist();

