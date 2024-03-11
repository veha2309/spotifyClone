let currentSong = new Audio();
function secondsToMinutes(seconds) {
    // Calculate minutes and seconds
    seconds = Math.floor(seconds)
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    // Convert to strings and pad with leading zeros if necessary
    var minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
    var secondsStr = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds.toString();

    // Return the formatted time
    return minutesStr + ':' + secondsStr;
}
async function getSong(){
    let source = await fetch("http://127.0.0.1:3000/songs/")
    let response = await source.text()
    let div = document.createElement(`div`)
    div.innerHTML = response;
    let songsrc = div.getElementsByTagName(`a`);
    let songs = [];
    for (let index = 0; index < songsrc.length; index++) {
        const element = songsrc[index];
        if (element.href.endsWith(`.mp3`)) {
            songs.push(element.href);
        }
    }
    return songs;
}
const playMusic = (track)=>{
    currentSong.src = track;
    currentSong.play();
    Continue.src = "assets/pause.svg"
    
    document.querySelector(".songInfo").innerHTML = track.split("/")[1];
    document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
}

async function main(){
    let songs = await getSong()
    
    let songUl = document.querySelector(`.songPlaylist`).getElementsByTagName(`ul`)[0]
    for (const song of songs) {
        songUl.innerHTML = songUl.innerHTML + `<li><img src="/assets/music.svg" alt="" class="invert">
        <div class="info ">
            <div>${song.split("/songs/")[1].replaceAll("%20"," ")}</div>
            <div>${"Vedant"}</div>
        </div>
            <div class="playnow">
                <h4>Play now

                </h4>  
                <img src="assets/play.svg" alt="" class="invert">
            </div></li>`
    }
    Array.from(document.getElementsByTagName('li')).forEach(e => {
        e.addEventListener("click" , element=>{
            playMusic(`songs/${e.querySelector(".info").firstElementChild.innerHTML}`)
        })
    })
    Continue.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play();
            Continue.src = "assets/pause.svg"
        }
        else{
            currentSong.pause();
            Continue.src = "assets/play.svg"
        }
    })
    let songCard = document.querySelector(".cards");
    for(const song of songs){
        songCard.innerHTML = songCard.innerHTML + 
    `<div class="card">
        <div class="thumbnail">
            <div class="circle-button">
                <div class="play-sign"></div>
            </div>
            <img src="/assets/thumbnail.jpg" alt="">
        </div>
        <div class="songTitle">
            ${song.split("/songs/")[1].replaceAll("%20"," ")}
        </div>
        <div class="songDescription">
            Lorem ipsum dolor, sit amet consectetur adipisicing.
        </div>
    </div>`
    }

    Array.from(document.querySelectorAll(".circle-button")).forEach(e=>{
       e.addEventListener("click", element=>{
        playMusic(`songs/${e.parentElement.parentElement.querySelector(".songTitle").innerHTML.trim()}`)
        element.stopPropagation()
       })
    })
    Array.from(document.querySelectorAll(".card")).forEach(e=>{
       e.addEventListener("click", element=>{
        open(`${e.querySelector(".songTitle").innerHTML.trim()}.html`)
       })
    })
    currentSong.addEventListener("timeupdate" , ()=>{
        document.querySelector(".songTime").innerHTML = `${
            secondsToMinutes(currentSong.currentTime)} : ${secondsToMinutes(currentSong.duration)}`
        document.querySelector(".circle").style.left = `${(currentSong.currentTime/currentSong.duration)*100}%`
    })

}
    



main()