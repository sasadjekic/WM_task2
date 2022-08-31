
/*
Drugi način - Node JS - 'node-fetch' modul , prikaz u terminalu
*/

//POMOĆNI INFO

//Izgled JSON fajla za bolji uvid u broj nivoa
/*const json = {"kind":"admin#reports#activity",
"id":{"time":"2021-04-08T12:25:46.274Z","uniqueQualifier":"8548472301918498484","applicationName":"calendar","customerId":"C02f6kyhr"},
"etag":"\"ApAxKM7VN_7bjOIbRu5ZTulmDYQVVJU0pk3qj_GxGmA/mOxUQYkGp1LxSDPdrbZryQ27HMA\"",
"actor":{"email":"mary@mydomain.com","profileId":"100415892406742027859"},
"ownerDomain":"mydomain.com",
"ipAddress":"84.229.147.57",
"events":[{"type":"event_change","name":"change_event_title","parameters":[{"name":"event_id","value":"567568luerat46dmp7duhhih"},{"name":"organizer_calendar_id","value":"tom@mydomain.com"},{"name":"calendar_id","value":"george@mydomain.com"},{"name":"target_calendar_id","value":"mark@mydomain.com"},{"name":"event_title","value":"Back"},{"name":"old_event_title","value":"Back plan cont"},{"name":"api_kind","value":"mobile"},{"name":"user_agent","value":"Chrome/5.0"}]},
          {"type":"event_change","name":"New title","parameters":[{"name":"event_id","value":"735zrtz45rat46dmp7duhhih"},{"name":"organizer_calendar_id","value":"jack@mydomain.com"},{"name":"calendar_id","value":"john@mydomain.com"},{"name":"target_calendar_id","value":"herbert@mydomain.com"},{"name":"event_title","value":"Mobile - Dril down "},{"name":"start_time","intValue":"63753822000"},{"name":"api_kind","value":"mobile"},{"name":"user_agent","value":"Mozilla/5.0"}]},
          {"type":"event_change","name":"add_event_guest","parameters":[{"name":"event_id","value":"7351l931luerat46dmp7duhhih"},{"name":"organizer_calendar_id","value":"mary@mydomain.com"},{"name":"calendar_id","value":"martin@mydomain.com"},{"name":"target_calendar_id","value":"martin@mydomain.com"},{"name":"event_title","value":"UI - Dril down "},{"name":"event_guest","value":"martin@mydomain.com"},{"name":"api_kind","value":"web"},{"name":"user_agent","value":"Mozilla/5.0"}]}
        ]
}

-Kako treba da izgleda prezentacija:
"kind":"admin#reports#activity",
"id"."time": "2021-04-08T12:25:46.274Z"
"events".0."type":"event_change"
"events".2."parameters"."name":"event_id"

*/


/*
INFO:
At the time of writing, to use ES6 module imports and exports in a NodeJs project, 
you have to set the type property to module in your package.json file:
*/


//SOURCE: "https://jsonkeeper.com/b/LUH3"

//console.log(JSON.parse(JSON.stringify(json)))
//const obj = JSON.parse(JSON.stringify(json))



      


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


//const fetch = require('node-fetch');
import fetch from 'node-fetch';

// Funkcija - Dohvatanje JSON fajla
async function getJsonData() {
  try {
    const response = await fetch("https://jsonkeeper.com/b/LUH3");

    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log(err);
  }
}

//Poziv funkcije za flat prezentacije koji kao argument ima response preko funkcije getJsonData
console.log(dotify(await getJsonData()));








