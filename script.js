const nickname = document.getElementById('host');
const awatar = document.getElementById('awatar');
const show = document.getElementById('opis');
const time = document.getElementById('czas');
const radio = document.getElementById('radio');
const playerBtn = document.getElementById('playerBtn');
const divPrzyciski = document.getElementById('przyciski');
const przyciskPozdrowienia = document.createElement('button');
const przyciskPiosenka = document.createElement('button');
const przyciskKonkurs = document.createElement('button');
const forma = document.getElementById('forma');
var kategoria;

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

db.collection("ustawienia").doc("buttons")
    .onSnapshot(function(doc) {
        divPrzyciski.textContent = "";
        forma.textContent = "";
        if (doc.data().piosenka == true) {
            przyciskPiosenka.className = "inactive";
            przyciskPiosenka.setAttribute('onclick', 'setTextFields(); przyciskKonkurs.className="inactive"; przyciskPozdrowienia.className="inactive"; przyciskPiosenka.className="active"; kategoria = "piosenka";');
            przyciskPiosenka.textContent = "Zaproponuj piosenkę";
            divPrzyciski.appendChild(przyciskPiosenka);
        }
        if (doc.data().pozdrowienie == true) {
            przyciskPozdrowienia.textContent = "Wyślij pozdrowienie";
            przyciskPozdrowienia.setAttribute('onclick', 'setTextFields(); przyciskKonkurs.className="inactive"; przyciskPozdrowienia.className="active"; przyciskPiosenka.className="inactive"; kategoria = "pozdrowienie";');
            przyciskPozdrowienia.className = "inactive";
            divPrzyciski.appendChild(przyciskPozdrowienia);
        }
        if (doc.data().konkurs == true) {
            przyciskKonkurs.setAttribute('onclick', 'setTextFields(); przyciskKonkurs.className="active"; przyciskPozdrowienia.className="inactive"; przyciskPiosenka.className="inactive"; kategoria = "konkurs";');
            przyciskKonkurs.className = "inactive";
            przyciskKonkurs.textContent = "Konkurs";
            divPrzyciski.appendChild(przyciskKonkurs);
        }

    })

//TODO: IP Address taken from DB

function playRadio() {
    if (radio.paused) {
        radio.src = "http://217.97.86.104:8000/stream.ogg"
        playerBtn.src = "img/icons8-pause-100.png";
        awatar.className = "opacity1";
        playerBtn.className = "opacity0";
        radio.play();

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

function refreshWidth() {
    document.body.style.width = "100%";
}

function setTextFields() {
    forma.textContent = "";
    const form_req = document.createElement('form');
    const nameTF = document.createElement('input');
    const messTF = document.createElement('input');
    const sendBT = document.createElement('input');

    form_req.setAttribute('onsubmit', 'sendBT.value = "Wysyłanie..."; wyslij(kategoria, imie.value, wiadomosc.value); return false;');

    nameTF.name = "imie";
    nameTF.placeholder = "Imię";
    messTF.name = "wiadomosc";
    messTF.placeholder = "Wiadomość";
    sendBT.name = "sendBT";
    nameTF.required = true;
    messTF.required = true;

    sendBT.type = "submit";
    sendBT.value = "Wyślij";
    form_req.id = "formWysylanie";

    form_req.appendChild(nameTF);
    form_req.appendChild(messTF);
    form_req.appendChild(sendBT);
    forma.appendChild(form_req);

    function handleForm(event) { event.preventDefault(); }
    form_req.addEventListener('submit', handleForm);
}

function wyslij(kategoria, imie, wiadomosc) {

    var today = new Date();
    var millis = today.getTime() + "";
    var time = today.getHours() + ":" + today.getMinutes();

    db.collection(kategoria).doc(millis).set({
            name: imie,
            message: wiadomosc,
            time: time
        })
        .then(function() {
            console.log("Document successfully written!");
            forma.textContent = "Wiadomość wysłana pomyślnie!";
            przyciskKonkurs.className = "inactive";
            przyciskPozdrowienia.className = "inactive";
            przyciskPiosenka.className = "inactive";
            kategoria = "";
        })
        .catch(function(error) {
            forma.textContent = "Wystąił błąd podczas wysyłania wiadomości";
            console.error("Error writing document: ", error);
        });

}