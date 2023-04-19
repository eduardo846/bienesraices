(function() {

    const lat = 7.9197131;
    const lng = -72.4981874
    const mapa = L.map('mapa').setView([lat, lng ], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);


})()