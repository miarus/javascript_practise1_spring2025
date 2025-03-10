document.addEventListener("DOMContentLoaded", function() {  //koodi suoritetaan vasta kun html ladattu ja valmis, tyhjä funktio vasta kun sivu valmis


    // Lisää harjoitus storageen
    document.getElementById("laheta").addEventListener("click", function() {
        let laji = document.getElementById("laji");
        let aika = document.getElementById("aika");
        let paivamaara = document.getElementById("paivamaara");
        let kuvaus = document.getElementById("kuvaus");

        let lajiArvo = laji.value;
        let aikaArvo = parseFloat(aika.value);  // aikaarvona-stringi muutetaan parsella liukuluku floatiksi, ettei jää tekstiksi
        let paivamaaraArvo = paivamaara.value;
        let kuvausArvo = kuvaus.value;

        // Resetoi virhereunukset, eli poistaa mahdolli punareunukset syöttökentt ympärilt ettei jää(jos virhetieto kuten tyhjä) tallennuksen jälkeen
        laji.classList.remove("error");
        aika.classList.remove("error");
        paivamaara.classList.remove("error");
        kuvaus.classList.remove("error");

        // Tarkistus: Kaikki kentät täytetty oikein? jos jokin alla olev täyttyy, alertti näkyy, punainen reuna
        if (!lajiArvo || isNaN(aikaArvo) || aikaArvo <= 0 || !paivamaaraArvo || !kuvausArvo) {  //isNan (x) - onko tämä numero true tai false
            alert("Täytä kaikki kentät oikein!");

            if (!lajiArvo) laji.classList.add("error");  //jos lajia ei valittu, menee "sisään"
            if (isNaN(aikaArvo) || aikaArvo <= 0) aika.classList.add("error");  //jos aika ei ole numero tai on 0 tai vähemm, menee sisään
            if (!paivamaaraArvo) paivamaara.classList.add("error"); //jos pvm tyhjä menee sisään
            if (!kuvausArvo) kuvaus.classList.add("error");  //jos kuvaus tyhjä, menee sisään

            return;  //keskeyttää koodin heti, ei mene tallennusosaan
        }

        // Haetaan aiemmat treenit storage:sta. tekee ennen kuin tallennetaan tiedot back storage jottei häviä
        let harjoitukset = JSON.parse(localStorage.getItem(lajiArvo)) || [];  //parse muuttaa back lista arrayksi. get item hakee lajitiedot. 
                                                                            // ii [] jos ei tietoa ole vielä käyttää tyhjää listaa jottei virheitä
        // Lisätään uusi harjoitus listaan
        harjoitukset.push({
            paivamaara: paivamaaraArvo,  //tekee uuden harjoituksen objektina, jossa pvm, aika, kuvaus
            aika: aikaArvo,
            kuvaus: kuvausArvo
        });

        // Tallennetaan uusi päivitetty lista takaisin storageen
        localStorage.setItem(lajiArvo, JSON.stringify(harjoitukset));

        // Tyhjennetään syöttökentät kun syöttö valmis
        laji.value = "";
        aika.value = "";
        paivamaara.value = "";
        kuvaus.value = "";

        alert("Harjoitus lisätty!");
    });

    // Hae tallennetut treenit yhteenvedosta
    document.getElementById("hae").addEventListener("click", function() {  //hae nappia painetaan, kuuntelija, funktio käynnistyy
        let valittuLaji = document.getElementById("etsiLaji").value;  //valikko josta haettu laji, value on lajivalinta

        if (valittuLaji) {  //storagesta haetaan valitun lajin tiedot
            let harjoitukset = JSON.parse(localStorage.getItem(valittuLaji)) || [];    //ii [] jos ei tietoa ole käyttää tyhjää listaa jottei virheitä

            if (harjoitukset.length === 0) {  //tarkistaa löytyykö tallennettuja harjoituksia
                document.getElementById("tulos").textContent = `Ei harjoituksia lajille: ${valittuLaji}`;
                document.getElementById("tuloksetLista").innerHTML = "";  //tyhjentää aiemmat listat, jottei vanh tieto jää näkyviin
            } else {
                // Näytetään kaikki harjoitukset listana
                document.getElementById("tulos").textContent = `Harjoitukset lajille: ${valittuLaji}`;
                let listaHTML = ""; // Luodaan tyhjä merkkijono, johon lisätään listan osat

                for (let i = 0; i < harjoitukset.length; i++) {  //harjoitukset yksitellen läpi

                    let h = harjoitukset[i]; // Haetaan yksittäinen harjoitus listasta
                    listaHTML += `<li>${h.paivamaara} | ${h.aika} h | ${h.kuvaus}</li>`;  //lisätään joka harjoitus html listaan
                }    

                document.getElementById("tuloksetLista").innerHTML = listaHTML;  //näytetään lista käyttäjälle
            }
        } else {
            document.getElementById("tulos").textContent = "Valitse ensin laji.";  //pitää valita laji ennen hakua
            document.getElementById("tuloksetLista").innerHTML = "";  //tyhjennetään lista aiemmista hauista
        }
    });
});
