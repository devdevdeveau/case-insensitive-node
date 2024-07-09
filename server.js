// const express = require('express');
// const res = require('express/lib/response');

// express.json(true, "100kb", (_, val) => {
//     if (Array.isArray(val) || typeof val !== 'object') {
//         return val;
//     }
//     return Object.entries(val).reduce((a, [key, val]) => {
//         a[key.toLowerCase()] = val;
//         return a;
//     }, {});
// });

// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   const json = {
//     "Name": "John Doe",
//     "Age": 30,
//     "Email": "john.doe@example.com",
//     "Address": {
//         "Street": "101 Main Street",
//         "City": "Hollywood",
//         "State": "CA"
//         }
//     };

//     res.send(json);
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// });

JSON.$parse = JSON.parse;

class CaseInsensitiveParser {
    static Parse(_, val, keyHelper) {
        if(!keyHelper) {
            keyHelper = (key)=>key.toLowerCase();
        }

        if (Array.isArray(val) || typeof val !== 'object') {
            return val;
        }
        return Object.entries(val).reduce((a, [key, val]) => {
            a[keyHelper(key)] = val;
            return a;
        }, {});
    }
}

JSON.parse = (s)=>JSON.$parse(s, CaseInsensitiveParser.Parse);

  const json = {
    "Name": "John Doe",
    "Age": 30,
    "Email": "john.doe@example.com",
    "Address": {
        "Street": "101 Main Street",
        "City": "Hollywood",
        "State": "CA"
        }
    };

console.log(JSON.parse(JSON.stringify(json)));