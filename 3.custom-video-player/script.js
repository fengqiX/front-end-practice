const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const process = document.getElementById("process");
const timestamp = document.getElementById("timestamp");

// Play & pause video
function toggleVideoStatus() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}


// update play/pause icon
function updatePlayIcon() {
    if (video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}


// Update progress & timestamp
function updateProgress() {
    process.value = (video.currentTime / video.duration) * 100

    //Get minutes
    let min = Math.floor(video.currentTime / 60)
    if (min < 10) {
        min = '0' + String(min)
    }
    let sec = Math.floor(video.currentTime % 60)
    if (sec < 10) {
        sec = '0' + String(sec)
    }
    timestamp.innerHTML = `${min}:${sec}`
}



// Set video time to progress
function setVideoProgress() {
    video.currentTime = (+process.value * video.duration) / 100;
}



// Stop video
function stopVideo() {
    video.currentTime = 0;
    video.pause()
}



// Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

process.addEventListener('change', setVideoProgress)
