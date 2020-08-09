function openPage(pageName, elmnt, color) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove the background color of all tablinks/buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }

    // Show the specific tab content
    document.getElementById(pageName).style.display = "block";

    // Add the specific color to the button used to open the tab content
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();


const hostySelect = document.getElementById("host");
var prezenter = "offline";
db.collection("prezenterzy")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var option = document.createElement("option");
            option.text = doc.data().titl;
            option.value = doc.id;
            if (doc.data().titl != undefined) { hostySelect.add(option); }
        });

        var docRef = db.collection("prezenterzy").doc("actual");

        docRef.get().then(function(doc) {
            hostySelect.value = doc.data().prezenter;
        });

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });


const btn_piosnka = document.getElementById('cat_piosenka');
const btn_pozdrowienie = document.getElementById('cat_pozdrowienie');
const btn_konkurs = document.getElementById('cat_konkurs');

var audio = new Audio('notification_sound.mp3');

var piosenka = 0;
var konkurs = 0;
var pozdrowienie = 0;
var kategoria = "piosenka"

db.collection("piosenka")
    .onSnapshot(function(querySnapshot) {
        piosenka = 0;
        querySnapshot.forEach(function(doc) {
            piosenka++;
        });
        btn_piosnka.textContent = "Prośba o piosenkę (" + piosenka + ")";
        if (piosenka == 0 && btn_piosnka.className != "activeBTN") {
            btn_piosnka.className = "inactiveBTN";
        } else if (btn_piosnka.className != "activeBTN") {
            btn_piosnka.className = "newMessagesBTN";
        }
    });

db.collection("konkurs")
    .onSnapshot(function(querySnapshot) {
        konkurs = 0;
        querySnapshot.forEach(function(doc) {
            konkurs++;
        });
        btn_konkurs.textContent = "Konkurs (" + konkurs + ")";
        if (konkurs == 0 && btn_konkurs.className != "activeBTN") {
            btn_konkurs.className = "inactiveBTN";
        } else if (btn_konkurs.className != "activeBTN") {
            btn_konkurs.className = "newMessagesBTN";
        }
    });

db.collection("pozdrowienie")
    .onSnapshot(function(querySnapshot) {
        pozdrowienie = 0;
        querySnapshot.forEach(function(doc) {
            pozdrowienie++;
        });
        btn_pozdrowienie.textContent = "Pozdrowienie (" + pozdrowienie + ")";
        if (pozdrowienie == 0 && btn_pozdrowienie.className != "activeBTN") {
            btn_pozdrowienie.className = "inactiveBTN";
        } else if (btn_pozdrowienie.className != "activeBTN") {
            btn_pozdrowienie.className = "newMessagesBTN";
        }
    });


const piosenkaList = document.querySelector('#piolista');
const pozdroList = document.querySelector('#pozlista');
const konkursList = document.querySelector('#konlista');

// create element & render cafe
function renderPiosenka(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let time = document.createElement('span');
    let message = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('id', doc.id);
    name.textContent = doc.data().name;
    time.textContent = doc.data().time;
    message.textContent = doc.data().message;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(time);
    li.appendChild(message);
    li.appendChild(cross);

    piosenkaList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('id');
        db.collection("piosenka").doc(id).delete();
    });
}

// real-time listener
db.collection("piosenka").orderBy('time').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
            audio.play();
            renderPiosenka(change.doc);
        } else if (change.type == 'removed') {
            let li = document.getElementById(change.doc.id);
            piosenkaList.removeChild(li);
        }
    });
});

function renderPozdrowienie(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let time = document.createElement('span');
    let message = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('id', doc.id);
    name.textContent = doc.data().name;
    time.textContent = doc.data().time;
    message.textContent = doc.data().message;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(time);
    li.appendChild(message);
    li.appendChild(cross);

    pozdroList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('id');
        db.collection("pozdrowienie").doc(id).delete();
    });
}

// real-time listener
db.collection("pozdrowienie").orderBy('time').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
            audio.play();
            renderPozdrowienie(change.doc);
        } else if (change.type == 'removed') {
            let li = document.getElementById(change.doc.id);
            pozdroList.removeChild(li);
        }
    });
});

function renderKonkurs(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let time = document.createElement('span');
    let message = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('id', doc.id);
    name.textContent = doc.data().name;
    time.textContent = doc.data().time;
    message.textContent = doc.data().message;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(time);
    li.appendChild(message);
    li.appendChild(cross);

    konkursList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('id');
        db.collection("konkurs").doc(id).delete();
    });
}

// real-time listener
db.collection("konkurs").orderBy('time').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if (change.type == 'added') {
            audio.play();
            renderKonkurs(change.doc);
        } else if (change.type == 'removed') {
            let li = document.getElementById(change.doc.id);
            konkursList.removeChild(li);
        }
    });
});

function wyborKategorii(param) {
    switch (param) {
        case "piosenka":
            btn_piosnka.className = "activeBTN"
            if (pozdrowienie == 0) {
                btn_pozdrowienie.className = "inactiveBTN";
            } else {
                btn_pozdrowienie.className = "newMessagesBTN";
            }
            if (konkurs == 0) {
                btn_konkurs.className = "inactiveBTN";
            } else {
                btn_konkurs.className = "newMessagesBTN";
            }

            piosenkaList.style.display = "block";
            pozdroList.style.display = "none";
            konkursList.style.display = "none";
            break;
        case "pozdrowienie":
            btn_pozdrowienie.className = "activeBTN"
            if (piosenka == 0) {
                btn_piosnka.className = "inactiveBTN";
            } else {
                btn_piosnka.className = "newMessagesBTN";
            }
            if (konkurs == 0) {
                btn_konkurs.className = "inactiveBTN";
            } else {
                btn_konkurs.className = "newMessagesBTN";
            }

            piosenkaList.style.display = "none";
            pozdroList.style.display = "block";
            konkursList.style.display = "none";
            break;
        case "konkurs":
            btn_konkurs.className = "activeBTN"
            if (pozdrowienie == 0) {
                btn_pozdrowienie.className = "inactiveBTN";
            } else {
                btn_pozdrowienie.className = "newMessagesBTN";
            }
            if (piosenka == 0) {
                btn_piosnka.className = "inactiveBTN";
            } else {
                btn_piosnka.className = "newMessagesBTN";
            }

            piosenkaList.style.display = "none";
            pozdroList.style.display = "none";
            konkursList.style.display = "block";
            break;

        default:
            btn_piosnka.className = "activeBTN"
            if (pozdrowienie == 0) {
                btn_pozdrowienie.className = "inactiveBTN";
            } else {
                btn_pozdrowienie.className = "newMessagesBTN";
            }
            if (konkurs == 0) {
                btn_konkurs.className = "inactiveBTN";
            } else {
                btn_konkurs.className = "newMessagesBTN";
            }

            piosenkaList.style.display = "block";
            pozdroList.style.display = "none";
            konkursList.style.display = "none";
            break;
    }
}

function zmianaPrezentera() {
    db.collection("prezenterzy").doc("actual").set({
        prezenter: hostySelect.value
    });

}