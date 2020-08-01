
const nickname = document.getElementById('host');
const awatar = document.getElementById('awatar');
const show = document.getElementById('opis');
const time = document.getElementById('czas');
const radio = document.getElementById('radio');
const playerBtn = document.getElementById('playerBtn');

db.collection("prezenterzy").doc("actual")
    .onSnapshot(function(doc) {
        console.log("Prowadzący: ", doc.data().prezenter);
        db.collection("prezenterzy").doc(doc.data().prezenter)
            .onSnapshot(function(doc) {
                console.log(doc.data());
                nickname.textContent = doc.data().titl;
                show.textContent = doc.data().desc;
                if (doc.data().czas != undefined && doc.data().czas != null) {
                    time.textContent = doc.data().czas;
                } else {
                    time.textContent = "";
                }

                if (doc.data().url == undefined) {
                    awatar.src = "img/logo_on.png";
                    awatar.style.width = "150px";
                    awatar.style.height = "150px";
                } else {
                    awatar.src = doc.data().url;
                    awatar.style.width = "150px";
                    awatar.style.height = "150px";
                }
            });
    });

function playRadio() {
    if (radio.paused) {
        radio.play();
        radio.src = "http://87.98.216.129:7208"
        playerBtn.src = "img/icons8-pause-100.png";
        awatar.className = "opacity1";
        playerBtn.className = "opacity0";

    } else {
        radio.pause();
        radio.src = "";
        playerBtn.src = "img/icons8-play-100.png";
        awatar.className = "opacity07";
        playerBtn.className = "opacity1";

    }
}

function setVol(volume) {
    radio.volume = volume;
}
