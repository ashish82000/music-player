const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')

//song title
const songs =['AoT_S4_OP1', 'Ban Than Chali', 'Believer_Imagine_Dragons', 'Binks no Sake Strawhat', 'Birju', 'Blue Bird - Naruto', 'Chaiyya Chaiyya', 'Chand Sifarish', 'Chhod Do Aachal Bombay Vikings', 'Excuses', 'Hukus Bukus', 'Kiss Me Baby', 'Kya Mujhe Pyar (Remix)', 'Memories OnePiece Ending 1', 'Pretty_Woman', 'Rap God (Explicit)', 'Sound of', 'Tere Liye', 'Tunak Tunak Tun Video', 'We Are One Piece OP'];

//keep track of songs
let songIndex = 19;

//load song info DOM initialy
loadSong(songs[songIndex])

//update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.zmdi').classList.remove('zmdi-play')
    playBtn.querySelector('i.zmdi').classList.add('zmdi-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.zmdi').classList.remove('zmdi-pause')
    playBtn.querySelector('i.zmdi').classList.add('zmdi-play')

    audio.pause()
}

function prevSong() {
    songIndex--;
  
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
  
    loadSong(songs[songIndex]);
    playSong();
}
  
function nextSong() {
    songIndex++ 

    if (songIndex > songs.length -1 ) {
        songIndex = 0
    }
    loadSong (songs[songIndex])
    playSong()
}

function updateProgress (e) {
    const {duration, currentTime} = e.srcElement
    const progPerc = (currentTime / duration) *100
    progress.style.width = `${progPerc}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX= e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

//event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying){
        pauseSong()
    } else {
        playSong()
    }
})

//change song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)