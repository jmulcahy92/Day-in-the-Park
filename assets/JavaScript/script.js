var parksArray = [
    {
        fullName: 'GreatSmokyMountains',
        parkCode: 'grsm',
        latitude: '36.0001165336',
        longitude: '-112.121516363'
    },
    {
        fullName: 'Zion',
        parkCode: 'zion',
        latitude: '37.29839254',
        longitude: '-113.0265138'
    },

    {
        fullName: 'Yellowstone',
        parkCode: 'yell',
        latitude: '44.59824417',
        longitude: '-110.5471695'
    },
    
    {
        fullName: 'Grand Canyon',
        parkCode: 'grca',
        latitude: '36.0001165336',
        longitude: '-112.121516363'
    },
    
     {
        fullName: 'Rocky Mountain',
        parkCode: 'romo',
        latitude: '40.3556924',
        longitude: '-105.6972879'
    },

    {
        fullName: 'Acadia',
        parkCode: 'acad',
        latitude: '44.409286',
        longitude: '-68.247501'
    },
    
  {
        fullName: 'Grand Teton',
        parkCode: 'grte',
        latitude: '43.81853565',
        longitude: '-110.7054666'
    },

    {
        fullName: 'Yosemite',
        parkCode: 'yose',
        latitude: '37.84883288',
        longitude: '-119.5571873'
    },

    {
        fullName: 'Glacier',
        parkCode: 'glac',
        latitude: '48.68414678',
        longitude: '-113.8009306'
    }
];

var main = document.getElementById('main');
var parksKey = "KVZPIz8u4dvHQhj5wYQxDQUisHC1pnhaaCNJSTD9";
var parkCode = "acad" // placeholder (pulls data for Acadia)
var parksUrl = "https://developer.nps.gov/api/v1/parks?parkCode=" + parkCode + "&api_key=" + parksKey;

parksArray.forEach(({fullName,parkCode,latitude,longitude}) => {
    main.innerHTML += `
        <div class='card'>
            <h1>${fullName}</h1>
            <h4>Code: ${parkCode}</h4>
            <h4>Lat: ${latitude}</h4>
            <h4>Lon: ${longitude}</h4>
        </div>
    `;
});

// fetch(parksUrl)
//     .then(function (response) {
//         if (response.ok) {
//             response.json().then(function (data) {
//                 x=data;
//                 let { fullName,latitude,longitude,parkCode } = data.data[0];
//                 console.log(fullName,latitude,longitude,parkCode);
//             });
//         }
//     });