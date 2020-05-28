let artists = [
    {
        name: "Olga",
        creations: [
            {
                type: "Открытки",
                theme: "С 23 Февраля",
                price: "5",
                img: "img/23.jpeg",

            },
            {
                type: "Открытки",
                theme: "С Днём Рождения",
                price: "9",
                img: "img/birthday.jpg",
            }
        ]
    },
    {
        name: "Juliya",
        creations: [
            {
                type: "Мягкие игрушки",
                theme: "Мишки",
                price: "13",
                img: "img/bear.jpg",
            },
            {
                type: "Мягкие игрушки",
                theme: "Сова",
                price: "15",
                img: "img/owl.jpg"
            }
        ]
    }
];

function findArtist(name) {
    return artists.filter(function(artist) { return artist.name == name });
}

function counter() {
	let curr = 1;
	return function() { return curr++; };
}
let generateID = counter();


if (localStorage.getItem("Semyon")) {
    let artistsString = localStorage.getItem("Semyon");
    artists = JSON.parse(artistsString);
} else {
    localStorage.setItem("Semyon", JSON.stringify(artists));
}

setAllIds(artists);
renderFilterOptions(artists);
renderAll(artists);

document.getElementById('add').addEventListener('click', addJobForm);

function renderFilterOptions(artists) {
    //  <option value="all" selected>Все работы</option> 
    let types = ['all'];
    artists.forEach(function (artist) {
        artist.creations.forEach(work => {
            if (!types.includes(work.type))
                types.push(work.type);           
        });
    });
    let select = document.getElementById('filter');
    types.forEach(type => {
        let opt = document.createElement('option');
        opt.innerText = (type != 'all') ? type : 'Все работы';
        opt.value = type;
        select.appendChild(opt);
    })
}

function renderAll(artists) {
    document.getElementById('data').innerHTML = '';

    artists.forEach(function (artist) {
        artist.creations.forEach(renderCreation);

        function renderCreation(creation) {
            let creationDiv = document.createElement("div");
            creationDiv.classList.add("creation");
            creationDiv.setAttribute('data-id', creation.id);

            let img = document.createElement("img");
            img.src = creation.img;
            img.classList.add("creation__photo");
            creationDiv.appendChild(img);

            // let typeDiv = document.createElement("div");
            // typeDiv.classList.add("creation__type");
            // let typeText = document.createTextNode(creation.type);
            // typeDiv.appendChild(typeText);
            // creationDiv.appendChild(typeDiv);
            /*creationDiv.appendChild(createDivWithClass(creation.id, "id"));*/

            creationDiv.appendChild(createDivWithClass(creation.type, "creation__type"));
            // let themeDiv = document.createElement("div");
            // themeDiv.classList.add("creation__theme");
            // let themeText = document.createTextNode(`"${creation.theme}"`);
            // themeDiv.appendChild(themeText);
            // creationDiv.appendChild(themeDiv);
            creationDiv.appendChild(createDivWithClass(`"${creation.theme}"`, "creation__theme"));

            let artistDiv = document.createElement("div");
            artistDiv.classList.add("creation__name");
            let artistText = document.createTextNode(`Мастер: ${artist.name}`);

            let priceDiv = document.createElement("div");
            priceDiv.classList.add("creation__price");
            let priceText = document.createTextNode(`${creation.price} BYN`);

            artistDiv.appendChild(artistText);
            priceDiv.appendChild(priceText);

            // creationId.appendChild(createId(creation.id, "id"));
            creationDiv.appendChild(artistDiv);
            creationDiv.appendChild(priceDiv);
            document.getElementById('data').appendChild(creationDiv);
        }
    });
    
}

function addJobForm() {
    let newCreationDiv = document.createElement("div");
    newCreationDiv.className = "alert";

    let form = document.createElement("form");
    form.className = "newWork";
    form.innerHTML = "Заполните форму для добавления работы";

    let workImg = document.createElement("input");
    workImg.type = "text";
    workImg.id = "photo";
    workImg.placeholder = "Введите адрес фотографии";

    let infoP1 = document.createElement("input");
    infoP1.type = "text";
    infoP1.id = "jobType";
    infoP1.placeholder = "Тип работы";

    let infoP2 = document.createElement("input");
    infoP2.type = "text";
    infoP2.id = "theme";
    infoP2.placeholder = "Тема работы";

    let infoP3 = document.createElement("input");
    infoP3.type = "text";
    infoP3.id = "name";
    infoP3.placeholder = "Ваше имя";

    let infoP4 = document.createElement("input");
    infoP4.type = "text";
    infoP4.id = "price";
    infoP4.placeholder = "Цена работы (BYN)";

    let btn = document.createElement("button");
    btn.type = "submit";
    btn.id = "save";
    btn.innerHTML = "Сохранить работу";

    // FORM
    newCreationDiv.appendChild(form);
    form.appendChild(workImg);
    form.appendChild(infoP1);
    form.appendChild(infoP2);
    form.appendChild(infoP3);
    form.appendChild(infoP4);
    form.appendChild(btn);

    document.getElementById('data').appendChild(newCreationDiv);

    form.addEventListener('submit', addNewJob);
};

function addNewJob() {
    // event.preventDefault();
    /*const newBox = document.createElement("div");
    newBox.classList.add("new-creation");
    newBox.addAttribute("id", noteIdCounter);
    noteIdCounter++;
    document.body.appendChild(newBox);*/

    let newPhoto = document.getElementById("photo").value;
    // localStorage.setItem("photo", JSON.stringify(newPhoto));
    let newJobType = document.getElementById("jobType").value;
    // localStorage.setItem("jobType", JSON.stringify(newJobType));
    let newTheme = document.getElementById("theme").value;
    // localStorage.setItem("theme", JSON.stringify(newTheme));
    let newName = document.getElementById("name").value;
    // localStorage.setItem("name", JSON.stringify(newName));
    let newPrice = document.getElementById("price").value;
    // localStorage.setItem("price", JSON.stringify(newPrice));
    // let newId = function (argument) {
    //       // body...
    // }

    let job = {
        "type": newJobType,
        "theme": newTheme,
        "price": newPrice,
        "img": newPhoto,
    };

    let master = {};

    let existingArtist = findArtist(newName);

    if (existingArtist.length == 1) {
        master = existingArtist[0];
    } else {
        master.name = newName;
        master.creations = [];
        artists.push(master);
    }

    master.creations.push(job);

    localStorage.setItem("Semyon", JSON.stringify(artists));
    location.reload();
}

function createDivWithClass(text, className) {
    let div = document.createElement("div");
    div.classList.add(className);
    div.appendChild(document.createTextNode(text));
    return div;
}


document.getElementById("clear").onclick = Clear;

function Clear() {
    localStorage.clear();
    location.reload();
}

document.getElementById("all").onclick = function () {
    renderAll(artists);
};

document.getElementById("cards").onclick = function () {
    renderAll(artists.map(artist => { return {
        name: artist.name,
        creations: artist.creations.filter(el => el.type === "Открытки") }
    }));
};

document.getElementById("toys").onclick = function () {
    renderAll(artists.map(artist => { return {
        name: artist.name,
        creations: artist.creations.filter(el => el.type === "Мягкие игрушки") }
    }));
};

document.getElementById('filter').addEventListener('change', function() {
    if (this.value == "all")
        renderAll(artists);
    else {
        renderAll(artists.map(artist => { return {
            name: artist.name,
            creations: artist.creations.filter(el => el.type == this.value) }
        }));
    }
});

document.getElementById('search-form').addEventListener("submit", function (e) {
    e.preventDefault();
    let input = this.search.value.toLowerCase();
    renderAll(artists.map(artist => 
                artist.name.toLowerCase().includes(input)
                ? artist
                : { name: artist.name,
                  creations: artist.creations.filter(work => work.theme.toLowerCase().includes(input) ||
                                                             work.type.toLowerCase().includes(input)) }
    ));
});

function getElementById(id) {
    return artists.map(artist => { return {
        name: artist.name,
        creations: artist.creations.filter( rect => rect.id == id) }
        });
}

function getIndexById(id) {
    return artists.map(artist => { return {
        name: artist.name,
        creations: artist.reduce(function(found, rect, idx) {
            if (rect.id == id)
                found.push(idx);
            return found;
        }, [])
    };
});
}

function setAllIds(artists) {
    artists.forEach(artist => {
        artist.creations = artist.creations.map(cr => { cr.id = generateID(); return cr; })
    })
}