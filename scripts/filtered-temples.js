const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation');


menuButton.addEventListener("click", () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
})

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Raleigh North Carolina",
        location: "Raleigh, North Carolina, United States",
        dedicated: "1999, December, 18",
        area: 12864,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/253122ddcd621aa0a460c39066f8fe310248d332/full/1920%2C/0/default"
    },
    {
        templeName: "Columbia South Carolina",
        location: "Columbia, South Carolina, United States",
        dedicated: "1999, October, 16",
        area: 10700,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/3c145c64740f7339b72d845a2bfc49a237a2c3b1/full/1920%2C/0/default"
    },
    {
        templeName: "Laie Hawaii",
        location: "Laie, Hawaii, United States",
        dedicated: "1919, November, 27",
        area: 42100,
        imageUrl: "https://www.churchofjesuschrist.org/imgs/d6037ab6ff0fa1431efcc539b1809e86d63a1d50/full/1920%2C/0/default"
    }

];


const templeCard = document.querySelector(".temple-pics");

const oldTemples = document.querySelector("#old");
const newTemples = document.querySelector("#new");
const largeTemples = document.querySelector("#large");
const smallTemples = document.querySelector("#small");
const templesHome = document.querySelector("#home");

createTempleCard(temples);

oldTemples.addEventListener("click", () => {
    const oldTemple = temples.filter(t => {
        const firstPart = t.dedicated.split(',')[0].trim();
        const year = parseInt(firstPart, 10);
        return Number.isFinite(year) && year < 1900;
    });
    createTempleCard(oldTemple);
});

newTemples.addEventListener("click", () => {
    const newTemple = temples.filter(t => {
        const firstPart = t.dedicated.split(',')[0].trim();
        const year = parseInt(firstPart, 10);
        return Number.isFinite(year) && year > 2000;
    });
    createTempleCard(newTemple);
});

largeTemples.addEventListener("click", () => {
    const largeTemple = temples.filter(temples => temples.area > 90000);
    createTempleCard(largeTemple);
})
smallTemples.addEventListener("click", () => {
    const smallTemple = temples.filter(temples => temples.area < 10000);
    createTempleCard(smallTemple);
})
templesHome.addEventListener("click", () => {
    createTempleCard(temples);
})

function createTempleCard(filteredTemples) {

    if (filteredTemples) {
        document.querySelector(".temple-pics").innerHTML = "";
        filteredTemples.forEach(temple => {
            // create the card and give it the class name 'temple-card'
            const card = document.createElement("div");
            card.className = 'temple-card';

            // Create the h2 element, give it a class name of 'card-h2', make it's textContent the name of the temple
            const cardH2 = document.createElement("h3");
            cardH2.className = 'card-h3'
            cardH2.textContent = temple.templeName
            card.appendChild(cardH2)

            // Create "location" on card and give it the class name 'card-temple-details' | Create the dynamic location <span> and add the temple location as it's textContent  
            const location = document.createElement("p")
            location.className = 'card-temple-details'
            location.textContent = 'Location: '

            const templeLocation = document.createElement("span")
            templeLocation.textContent = temple.location
            location.appendChild(templeLocation)
            card.appendChild(location)

            // Create "dedication" on card and give it the class name of 'card-temple-details | Create dynamic location <span> and add the temple dedication date as it's textContent

            const dedicated = document.createElement("p")
            dedicated.className = 'card-temple-details'
            dedicated.textContent = 'Dedicated: '

            const dedicatedDate = document.createElement("span")
            dedicatedDate.textContent = temple.dedicated
            dedicated.appendChild(dedicatedDate)
            card.appendChild(dedicated)

            //  Create "size" on card and give it the class name of 'card-temple-details' | Create dynamic location <span> and add the temple square foot size as it's textContent

            const size = document.createElement("p")
            size.className = 'card-temple-details'
            size.textContent = 'Size: '

            const templeSize = document.createElement("span")
            templeSize.textContent = `${temple.area} sq ft`
            size.appendChild(templeSize)
            card.appendChild(size)


            // Create <img> and add the url to it
            const img = document.createElement("img");
            img.src = temple.imageUrl;
            img.alt = temple.templeName;
            img.setAttribute("loading", "lazy");
            card.appendChild(img);


            templeCard.appendChild(card)
        });
    }
} 
