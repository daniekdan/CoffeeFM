const nickname = document.getElementById('dj_name');
const awatar = document.getElementById('dj_avatar');
const show = document.getElementById('dj_show');
const time = document.getElementById('dj_time');

db.collection("prezenterzy").doc("actual")
    .onSnapshot(function(doc) {
        console.log("Zmiana prowadzącego: ", doc.data().prezenter);
    });