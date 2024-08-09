const songlist = [
    {
        name: "Koiiro",
        artist: "mosawo",
        src: "assets/koiiro.mp3",
        cover: "https://t2.genius.com/unsafe/184x184/https%3A%2F%2Fimages.genius.com%2F0ccc924076aed6ac5e0e328af3bdb12f.640x640x1.jpg"
    },
    {
        name: "Gala Bunga Matahari",
        artist: "Sal Priadi",
        src: "assets/Gala Bunga Matahari.mp3",
        cover: "https://lingkaran.id/images/post/lagu-gala-bunga-matahari-milik-sal-priadi-membuat-masyarakat-terhipnotis.jpg"
    },
    {
        name: "Sialan",
        artist: "Juicy Luicy & Adrian feat. Mahalini",
        src: "assets/Sialan.mp3",
        cover: "https://i1.sndcdn.com/artworks-JrYpTWfgYmxKzikV-2IbcAg-t500x500.jpg"
    },
    {
        name: "Tampar",
        artist: "Juicy Luicy",
        src: "assets/Tampar.mp3",
        cover: "https://asset-2.tstatic.net/sumsel/foto/bank/images/Lirik-dan-Chord-Gitar-Lagu-Juicy-Luicy-Hujan-Samarkan-DerasnyaTampar.jpg"
    },
    {
        name: "All Too Well",
        artist: "Taylor Swift",
        src: "assets/All Too Well.mp3",
        cover: "https://i1.sndcdn.com/artworks-000623344276-vx8bhd-t500x500.jpg"
    }
];

const artistName = document.querySelector('.artist-name');
const musicName = document.querySelector('.song-name');
const fillBar = document.querySelector('.fill-bar');
const time = document.querySelector('.time');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const prog = document.querySelector('.progress-bar');

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener('DOMContentLoaded', () =>{
    loadSong(currentSong);
    song.addEventListener('timeupdate', updateProgress);
    song.addEventListener('ended', nextSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    playBtn.addEventListener('click', togglePlayPause);
    prog.addEventListener('click', seek);
});

function loadSong(index){
    const { name, artist, src, cover: thumb } = songlist
    [index];
    artistName.innerText = artist;
    musicName.innerText = name;
    song.src = src;
    cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress(){
    if(song.duration){
        const pos = (song.currentTime / song.duration) * 100;
        fillBar.style.width = `${pos}%`;
        
        const duration = formatTime(song.duration);
        const currentTime = formatTime(song.currentTime);
        time.innerText = `${currentTime} - ${duration}`;

    }
}

function formatTime(seconds){
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function togglePlayPause(){
    if(playing){
        song.pause();
    }else {
        song.play();
    }
    playing = !playing;
    playBtn.classList.toggle('fa-pause', playing);
    playBtn.classList.toggle('fa-play', !playing);
    cover.classList.toggle('active', playing);
}

function nextSong(){
    currentSong = (currentSong + 1) % songlist.length;
    playMusic();
}

function prevSong(){
    currentSong = (currentSong - 1 + songlist.length) % songlist.length; 
    playMusic();
}

function playMusic(){
    loadSong(currentSong);
    song.play();
    playing = true;
    playBtn.classList.add('fa-pause');
    playBtn.classList.remove('fa-play');
    cover.classList.add('active');
}

function seek(e){
    const pos = (e.offsetX / prog.clientWidth) * song.duration;
    song.currentTime = pos;
}