/*
Treći način - Node JS - 'request' modul , prikaz u terminalu
*/


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





import request from 'request';

let url = "https://jsonkeeper.com/b/LUH3"


let options = {json: true};



request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };

    if (!error && res.statusCode == 200) {
        // do something with JSON, using the 'body' variable
        console.log(dotify(JSON.parse(JSON.stringify(body))));
    };
});
