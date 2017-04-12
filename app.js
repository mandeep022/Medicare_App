
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

var yoga = {
    "id": "yoga",
    "results": [
      {
          "hindi_name": "Kapalabhati Pranayama",
          "english_name": "Skull Shining Breath",
          "steps": [
            "Kapalabhati consists of alternating short, explosive exhales and slightly longer, passive inhales. Exhales are generated by powerful contractions of the lower belly (between the pubis and navel), which push air out of the lungs. Inhales are responses to the release of this contraction, which sucks air back into the lungs.", "Focus on your lower belly. Many beginners aren’t able to isolate and contract this area. If needed, cup one hand lightly in the other and press them gently against your lower belly.", "Now quickly contract (or pump your fisted hands against) your lower belly, pushing a burst of air out of your lungs. Then quickly release the contraction (or your hands), so the belly “rebounds” to suck air into your lungs. Pace yourself slowly at first. Repeat eight to 10 times at about one exhale-inhale cycle every second or two.", "As you become more adept at contracting/releasing your lower belly, you can increase your pace to about two exhale-inhale cycles every second. Imagine the exhale sweeping out or “brightening” the inner lining of your skull.", "Do 25 to 30 cycles at first. Gradually increase the number of cycles you do each practice to 100 or more."
          ]
      },
      {
          "hindi_name": "Savasana",
          "english_name": "Corpse Pose",
          "steps": ["In Savasana it’s essential that the body be placed in a neutral position. Sit on the floor with your knees bent, feet on the floor, and lean back onto your forearms. Lift your pelvis slightly off the floor and, with your hands, push the back of the pelvis toward the tailbone, then return the pelvis to the floor. Inhale and slowly extend the right leg, then the left, pushing through the heels. Release both legs, softening the groins, and see that the legs are angled evenly relative to the mid-line of the torso, and that the feet turn out equally. Narrow the front pelvis and soften (but don’t flatten) the lower back.", "With your hands lift the base of the skull away from the back of the neck and release the back of the neck down toward the tailbone. If you have any difficulty doing this, support the back of the head and neck on a folded blanket. Broaden the base of the skull too, and lift the crease of the neck diagonally into the center of the head. Make sure your ears are equidistant from your shoulders.", "Reach your arms toward the ceiling, perpendicular to the floor. Rock slightly from side to side and broaden the back ribs and the shoulder blades away from the spine. Then release the arms to the floor, angled evenly relative to the mid-line of torso. Turn the arms outward and stretch them away from the space between the shoulder blades. Rest the backs of the hands on the floor as close as you comfortably can to the index finger knuckles. Make sure the shoulder blades are resting evenly on the floor. Imagine the lower tips of the shoulder blades are lifting diagonally into your back toward the top of the sternum. From here, spread the collarbones.", "In addition to quieting the physical body in Savasana, it’s also necessary to pacify the sense organs. Soften the root of the tongue, the wings of the nose, the channels of the inner ears, and the skin of the forehead, especially around the bridge of the nose between the eyebrows. Let the eyes sink to the back of the head, then turn them downward to gaze at the heart. Release your brain to the back of the head.", "Stay in this pose for 5 minutes for every 30 minutes of practice. To exit, first roll gently with an exhalation onto one side, preferably the right. Take 2 or 3 breaths. With another exhalation press your hands against the floor and lift your torso, dragging your head slowly after. The head should always come up last."]
      }
    ]
};
var yogadiv = document.getElementsByClassName('yoga')[0];
let ya = document.createElement('a');
ya.href = 'javascript:;';
ya.setAttribute('class', 'list-group-item active');
ya.innerHTML = 'Select a Yoga';
yogadiv.appendChild(ya);
for (let y in yoga.results) {
    let ya = document.createElement('a');
    ya.href = 'javascript:;';
    ya.setAttribute('class', 'list-group-item yoga-item');
    ya.innerHTML = yoga.results[y].hindi_name;
    yogadiv.appendChild(ya);
}

var yi = document.getElementsByClassName('yoga-item');
for (let yogaitem in yi) {
    yi[yogaitem].onclick = function () {
        let yd = document.getElementsByClassName('yoga-details')[0];
        yd.innerHTML = '';
        let yh = document.createElement('h2');
        yh.innerHTML = yoga.results[yogaitem].hindi_name;
        let yh2 = document.createElement('h5');
        yh2.innerHTML = '<span class="text-muted">aka</span> ' + yoga.results[yogaitem].english_name;
        let yimg = document.createElement('img');
        yimg.src = 'img/' + yoga.results[yogaitem].hindi_name + '.jpg';
        yimg.setAttribute('style', 'width:100%');
        let yul = document.createElement('ol');
        let yh5 = document.createElement('h5');
        yh5.innerHTML = 'How to do it!!!';
        for (var step in yoga.results[yogaitem].steps) {
            var stepli = document.createElement('li');
            stepli.innerHTML = yoga.results[yogaitem].steps[step];
            yul.appendChild(stepli);
        }
        yd.appendChild(yh);
        yd.appendChild(yh2);
        yd.appendChild(yimg);
        yd.appendChild(yh5);
        yd.appendChild(yul);
        return false;
    }
}
