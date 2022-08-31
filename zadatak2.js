/*
Prvi način - JS - Fetch, prikaz preko HTML fajla u kojem je link na JS fajl zadatak2.js
*/

//Funkcija za kreiranje "flat" prezentacije JSON responsa
function dotify(obj) {
    const res = {};
    function recurse(obj, current) {
        for (const key in obj) {
            const value = obj[key];
            if(value != undefined) {
                const newKey = (current ? current + '.' + key : key);
                if (value && typeof value === 'object') {
                    recurse(value, newKey);
                } else {
                    res[newKey] = value;
                }
            }
        }
    }
    recurse(obj);
    return res;
  }


// Funkcija - Dohvatanje JSON fajla - Obrada preko funkcije dotify(obj) i prikaz preko HTML fajla
function GetJsonData() {
    
    fetch("https://jsonkeeper.com/b/LUH3")
        .then(response => response.json())  //response se konvertuje u JS objekat
        .then(data => { //a onda sve prikazi uz pomoc HTML kodu 
            let tableData = document.getElementById("tableData"); //el sa id table Albums stavimo u varijablu

            let dataFlat = dotify(data)
            
            for(key in dataFlat) {
                
            
                //Prolaz kroz niz objekata i prikaz u tabeli
                tableData.innerHTML +=  
                `<tr>    
                    <td class="bg-warning">
                    ${key}
                    </td> 
                    <td>${dataFlat[key]}</td>
                </tr>`;                            
            }; 
        });
}

//Poziv funkcije 
GetJsonData();


