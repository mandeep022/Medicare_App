
var disease = { "1": "Fever", "2": "Abdominal Pain", "3": "Headache", "4": "Vomitting" };
var precautions = [
    {
        id: '1',
        data: ["Sweating","Shivering","Headache","Muscle aches","Loss of appetite","Dehydration","General weakness"]
    },
    {
        id: '2',
        data: ["Indigestion", "Constipation", "Stomach virus", "Menstrual cramps", "Irritable bowel syndrome (IBS)", "Food poisoning", "Food allergies", "Gas", "Lactose intolerance", "Ulcers", "Pelvic inflammatory disease", "Hernia", "Gallstones", "Kidney stones", "Endometriosis", "Crohn's disease", "Urinary tract infection", "Gastroesophageal reflux disease (GERD)", "Appendicitis", "Indigestion", "Constipation", "Stomach virus", "Menstrual cramps", "Irritable bowel syndrome (IBS)", "Food poisoning", "Food allergies", "Gas", "Lactose intolerance", "Ulcers", "Pelvic inflammatory disease", "Hernia", "Gallstones", "Kidney stones", "Endometriosis", "Crohn's disease", "Urinary tract infection", "Gastroesophageal reflux disease (GERD)", "Appendicitis"]
    },
    {
        id: '3',
        data: ["Dull, aching head pain","Sensation of tightness or pressure across your forehead or on the sides and back of your head","Tenderness on your scalp, neck and shoulder muscles"]
    },
    {
        id: '4',
        data: ["Motion sickness or seasickness", "Early stages of pregnancy (nausea occurs in approximately 50%-90% of all pregnancies; vomiting in 25%-55%)", "Medication-induced vomiting", "Intense pain", "Emotional stress (such as fear)", "Gallbladder disease", "Food poisoning", "Infections (such as the 'stomach flu')", "Overeating", "A reaction to certain smells or odors", "Heart attack", "Concussion or brain injury", "Brain tumor", "Ulcers", "Some forms of cancer", "Bulimia or other psychological illnesses", "Gastroparesis or slow stomach emptying (a condition that can be seen in people with diabetes)", "Ingestion of toxins or excessive amounts of alcohol"]
    }
];



let mycities = document.getElementById('ddlSearch');
if (mycities != null) {
    for (let key in cities) {
        let opt = document.createElement('option');
        opt.value = key;
        opt.innerHTML = cities[key];
        mycities.appendChild(opt);
    }

    mycities.onchange = function () {
        let currentcityid = mycities.options[mycities.selectedIndex].value;
        let citiesdiv = document.getElementsByClassName('cities');
        citiesdiv[0].innerHTML = '';
        for (let key in hospitals) {
            if (hospitals[key].id == currentcityid) {
                let data = hospitals[key].data;
                let div = document.createElement('div');
                div.setAttribute('class', 'city-details');
                let h2 = document.createElement('h2');
                h2.innerText = data.name
                //contacts: {
                //    mobile: '9812398123',
                //    landline1: '01614323456',
                //    landline2: '0161212342'
                //}
                let doctor = document.createElement('span');
                doctor.innerText = 'Doctor : ' + data.doctor;

                let address = document.createElement('address');
                address.innerHTML = data.address1 + '<br/>' + data.address2 + '<br>' + data.city + ', ' + data.state + ' - ' + data.pin;

                let phones = document.createElement('p');
                phones.innerHTML = 'Phones : ' + data.contacts.mobile + ', ' + data.contacts.landline1 + ', ' + data.contacts.landline2;

                div.appendChild(h2);
                div.appendChild(doctor);
                div.appendChild(address);
                div.appendChild(phones);
                citiesdiv[0].appendChild(div);
            }
        }
    };
}
var txtdisease = document.getElementById('ddlDisease');
for (var key in disease) {
    var opt = document.createElement('option');
    opt.value = key;
    opt.innerHTML = disease[key];
    txtdisease.appendChild(opt);
}
txtdisease.onchange = function () {
    var diseaseid = txtdisease.options[txtdisease.selectedIndex].value;
    var symdiv = document.getElementsByClassName('symptoms');
    symdiv[0].innerHTML = '';
    for (var key in precautions) {
        if (precautions[key].id == diseaseid) {
            var data = precautions[key].data;
            var div = document.createElement('div');
            var h2 = document.createElement('h2');
            h2.innerHTML = "Symptoms:";
            var ul = document.createElement('ul');
            ul.setAttribute('class', 'symptoms');
            for (var x in data) {
                var li = document.createElement('li');
                li.innerText = data[x];
                ul.appendChild(li);
            }
            div.appendChild(h2);
            div.appendChild(ul);
            symdiv[0].appendChild(div);
        }
    }
};

var glat, glng;
function initialize() {
    let options = {
        types: ['(cities)'],
        //componentRestrictions: { country: 'IN' }
    };
    let cities = document.getElementById('txtCity');
    let autocompleteCities = new google.maps.places.Autocomplete(cities, options);
    google.maps.event.addDomListener(cities, 'keydown', function (e) {
        if (e.keyCode == 13)
            e.preventDefault();
    });
    google.maps.event.addListener(autocompleteCities, 'place_changed', function () {
        let place = autocompleteCities.getPlace();
        glat = place.geometry.location.lat();
        glng = place.geometry.location.lng();
        //alert(glat + " : " + glon);
        //radarSearch(glat, glng);
        initMap();
    });
}
window.onload = initialize();

//function radarSearch(glat, glng) {


//let wObject;
//let xmlhttp = new XMLHttpRequest();
//xmlhttp.onreadystatechange = function () {
//    if (this.readyState == 4 && this.status == 200) {
//        wObject = JSON.parse(this.responseText);
//        alert(wObject[0].name);
//    }
//};

//xmlhttp.open('GET', 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + glat + ',' + glng + '&radius=1000&type=hospital&key=AIzaSyASynkDUJeuFGI3bnRzvwaT-6eOkI7xkYk', true);
//xmlhttp.send();

//fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + glat + ',' + glng + '&radius=1000&type=hospital&key=AIzaSyASynkDUJeuFGI3bnRzvwaT-6eOkI7xkYk', { mode: 'no-cors' })
//    .then(function (data) {
//        /*let allplaces = JSON.parse(data);
//        for (let x in allplaces) {
//            alert(x)
//        }*/
//        console.log(data);
//    })
//    .catch(function (error) {
//        alert(error);
//    });

var map;
var infowindow;

function initMap() {
    let pyrmont = { lat: glat, lng: glng };
    map = new google.maps.Map(document.getElementById('map'), {
        center: pyrmont,
        zoom: 15
    });

    infowindow = new google.maps.InfoWindow();
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: pyrmont,
        radius: 1000,
        type: ['hospital']
    }, callback);
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        let citiesdiv = document.getElementsByClassName('cities');
        citiesdiv[0].innerHTML = '';
        for (let ii = 0; ii < results.length; ii++) {
            let data = results[ii];
            let div = document.createElement('div');
            div.setAttribute('class', 'city-details');
            let h2 = document.createElement('h2');
            h2.innerText = data.name
            let doctor = document.createElement('span');
            doctor.innerHTML = data.opening_hours == undefined ? '' : data.opening_hours.open_now ? "<span style='color:green; font-weight:bold'>Open Now</span>" : "<span style='color:red; font-weight:bold'>Closed</span>";

            let address = document.createElement('address');
            address.innerHTML = data.vicinity;


            //let phones = document.createElement('p');
            //phones.innerHTML = 'Phones : ' + data.formatted_phone_number ;

            div.appendChild(h2);
            div.appendChild(doctor);
            div.appendChild(address);
            //div.appendChild(phones);
            citiesdiv[0].appendChild(div);
        }
    }
}
