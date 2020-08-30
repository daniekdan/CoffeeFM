
document.getElementById("defaultOpen").click();

const btn_piosnka = document.getElementById('cat_piosenka');
const btn_pozdrowienie = document.getElementById('cat_pozdrowienie');
const btn_konkurs = document.getElementById('cat_konkurs');
const piosenkaList = document.querySelector('#piolista');
const pozdroList = document.querySelector('#pozlista');
const konkursList = document.querySelector('#konlista');
var piosenka = 0;
var konkurs = 0;
var pozdrowienie = 0;
var kategoria = "piosenka"
var audio = new Audio('notification_sound.mp3');

const hostySelect = document.getElementById("host");
const containerPrezenterzy = document.getElementById('containerPrezenterzy');
const divPrezenter = document.createElement('div');
const spanTytul = document.createElement('span');
const formDane = document.createElement('form');
const labelOpis = document.createElement('label');
const labelCzas = document.createElement('label');
const inputOpis = document.createElement('input');
const inputCzas = document.createElement('input');
const inputZapisz = document.createElement('input');
var prezenter = "offline";

const checkPiosenka = document.getElementById('checkPiosenka');
const checkPozdrowienie = document.getElementById('checkPozdrowienie');
const checkKonkurs = document.getElementById('checkKonkurs');

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

function zamknijKomunikat() {
    const informacja = document.getElementById('informacja');
    informacja.className = 'informacja hidden';
    const informacja2 = document.getElementById('informacja2');
    informacja2.className = 'informacja hidden';
}

// Menu z wiadomościami
// Wybór kategorii wiadomości
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

// Pobieranie danych
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


// Wyświetlanie wiadomości
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


// Sortowanie wiadomości
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

// Menu Ustawienia
// Tworzenie Listy
db.collection("prezenterzy").get()
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

    }).catch(function(error) {
        console.log("Error getting documents: ", error);
});

// Zmiana prezentera
function zmianaPrezentera() {
    db.collection("prezenterzy").doc("actual").set({
        prezenter: hostySelect.value
    });
    const zapisanoAH = document.getElementById('zapisanoAH');
    zapisanoAH.style.display = 'inline-block';
}

// Wyświetlanie ustawień
db.collection("prezenterzy").get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            if (doc.id != 'offline' && doc.id != 'actual') {
                const divPrezenter = document.createElement('div');
                const spanTytul = document.createElement('span');
                const formDane = document.createElement('form');
                const labelOpis = document.createElement('label');
                const labelCzas = document.createElement('label');
                const inputOpis = document.createElement('input');
                const inputCzas = document.createElement('input');
                const inputZapisz = document.createElement('input');

                divPrezenter.className = 'prezenter';
                spanTytul.textContent = doc.data().titl;
                formDane.setAttribute('id', doc.id);
                formDane.setAttribute('onsubmit', 'this.zapisz.value = "Zapisywanie..."; this.opis.disabled = true; this.czas.disabled = true; this.zapisz.disabled = true; zapiszZmiany(this.id); return false;');
                labelCzas.for = 'czas';
                labelOpis.for = 'opis';
                labelOpis.textContent = 'Tytuł audycji';
                labelCzas.textContent = 'Godziny trwania';
                inputCzas.setAttribute('type', 'text');
                inputOpis.setAttribute('type', 'text');
                inputZapisz.setAttribute('type', 'submit');
                inputZapisz.value = "Zapisz";
                inputCzas.id = 'czas';
                inputOpis.id = 'opis';
                inputZapisz.id = 'zapisz';
                inputCzas.name = 'czas';
                inputOpis.name = 'opis';
                inputZapisz.name = 'zapisz';

                inputOpis.value = doc.data().desc;
                inputCzas.value = doc.data().czas;

                formDane.appendChild(labelOpis);
                formDane.appendChild(inputOpis);
                formDane.appendChild(labelCzas);
                formDane.appendChild(inputCzas);
                formDane.appendChild(inputZapisz);

                divPrezenter.appendChild(spanTytul);
                divPrezenter.appendChild(formDane);

                containerPrezenterzy.appendChild(divPrezenter);
            }
        });
});

// Zapisywanie zmian
function zapiszZmiany(dokument) {
    var sourceForm = document.getElementById(dokument);
    var sfDocRef = db.collection("prezenterzy").doc(dokument);

    return db.runTransaction(function(transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(sfDocRef).then(function(sfDoc) {
            if (!sfDoc.exists) {
                throw "Document does not exist!";
            }

            // Add one person to the city population.
            // Note: this could be done without a transaction
            //       by updating the population using FieldValue.increment()
            transaction.update(sfDocRef, { desc: sourceForm.opis.value });
            transaction.update(sfDocRef, { czas: sourceForm.czas.value });
        });
    }).then(function() {
        console.log("Transaction successfully committed!");
        sourceForm.zapisz.value = 'Zapisano!';
        sourceForm.zapisz.disabled = false;
        sourceForm.czas.disabled = false;
        sourceForm.opis.disabled = false;
    }).catch(function(error) {
        console.log("Transaction failed: ", error);
        sourceForm.zapisz.value = 'Wystąpił błąd!';
    });
}

// Checkbox wiadomości
// Ładowanie danych
db.collection("ustawienia").doc("buttons")
    .onSnapshot(function(doc) {
        checkPiosenka.checked = doc.data().piosenka;
        checkPozdrowienie.checked = doc.data().pozdrowienie;
        checkKonkurs.checked = doc.data().konkurs;
});

// Wysyłanie danych
function buttonsUpdate() {
    db.collection("ustawienia").doc("buttons").set({
            konkurs: checkKonkurs.checked,
            piosenka: checkPiosenka.checked,
            pozdrowienie: checkPozdrowienie.checked
        })
        .then(function() {
            console.log("Document successfully written!");
            const zapisanoCH = document.getElementById('zapisanoCH');
            zapisanoCH.style.display = 'inline-block';
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            const zapisanoCH = document.getElementById('zapisanoCH');
            zapisanoCH.style.display = 'inline-block';
            zapisanoCH.textContent = 'Błąd!';
        });
}
    