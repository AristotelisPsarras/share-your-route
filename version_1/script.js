// console.log("hello world");
//Form visibility in order to open when i click on the button (Share Your Route)
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".route-form");
btn.addEventListener("click", function () {
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        btn.textContent = "Close";
    } else {
        form.classList.add("hidden");
        btn.textContent = "Share Your Route";
    }
});
//Τα αρχεια γιατι δεν εκανα import 
const CATEGORIES = [
    { name: "on-bellow-400km", color: "#3b82f6" },
    { name: "on-above-400km", color: "#16a34a" },
    { name: "enduro-easy", color: "#ef4444" },
    { name: "enduro-medium", color: "#eab308" },
    { name: "enduro-hard", color: "#db2777" },
    { name: "on-off-easy", color: "#14b8a6" },
    { name: "on-off-medium", color: "#f97316" },
    { name: "on-off-hard", color: "#8b5cf6" },
];

const initialRoutes = [
    {
        id: 1,
        text: "I recently did the route from Tripoli to Levidi, Vytina, Dimitsana, Chrysovitsi, and Tripoli again, essentially it's the round of Menalo from there, and going up the ski lift you meet endless dirt roads, I'm attaching the following dirt roads in a gpx file for the friends)",
        source: "https://opensource.fb.com/",
        category: "on-bellow-400km",
        votesInteresting: 24,
        votesMindblowing: 9,
        votesFalse: 4,
        createdIn: 2021,
    },
    {
        id: 2,
        text: "a great way to spend your weekend especially direct guide dirt guides you will enjoy your bike very much on the olympus routes basically the climb consists of 75 km light dirt 100 km difficult and the second day is calculated around 65 km so you are the margin of return to Athens the link below is the ancient gpx",
        source:
            "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
        category: "on-above-400km",
        votesInteresting: 11,
        votesMindblowing: 2,
        votesFalse: 0,
        createdIn: 2019,
    },
    {
        id: 3,
        text: "good evening and from me, an excellent route for enduro friends is Mt. Ziria, it basically offers infinite paths of easy, difficult and extreme difficulty. I quote the maps that I followed coming from Athens, kissing in the cars in Kalavryta and going towards Mt. Ziria, the two routes are the first day e from Kalavryta to Mount Ziria and the second is the return essentially but from Tripoli heading south back to Athens",
        source: "https://en.wikipedia.org/wiki/Lisbon",
        category: "enduro-easy",
        votesInteresting: 8,
        votesMindblowing: 3,
        votesFalse: 1,
        createdIn: 2015,
    },
];


//Removing all the elements from the list in order to put them again with javascript 
const routesList = document.querySelector(".route-list");
routesList.innerHTML = "";
//importing data from the data js file in order to have more clear code

// import { initialRoutes } from "./data.js";
//calling tha function in order to output the routes
createRoutesList(initialRoutes);
//Loading data from the supabase 
loadRoutes();
async function loadRoutes() {
    const res = await fetch('https://lwaknrisovgsgaostfpq.supabase.co/rest/v1/routes?', {
        headers: {
            apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YWtucmlzb3Znc2dhb3N0ZnBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNTQ2NTAsImV4cCI6MjAyMzkzMDY1MH0.mQiDtMWfe2J6WayhPI4YxbYlFwH-2-A811oSYi0jqsU",
            authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3YWtucmlzb3Znc2dhb3N0ZnBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNTQ2NTAsImV4cCI6MjAyMzkzMDY1MH0.mQiDtMWfe2J6WayhPI4YxbYlFwH-2-A811oSYi0jqsU"
        }
    });
    //converthing into a json object
    const data = await res.json();
    console.log(data);
    // filtering the data
    // const filteredData = data.filter((route) => route.category === 'enduro');
    // createRoutesList(filteredData);    // console.log(filteredData);
    //calling the function in order to output the routes
    // createRoutesList(filteredData);
    console.log(res);
    // console.log(data);
    //calling the function in order to output the routes
    createRoutesList(data);
    console.log(res);
}


//This functiion will be taking data from the supabase and allso took the data from the initial roots array 
function createRoutesList(dataArray) {
    const htmlArray = dataArray.map((route) => `<li class="route"><p>${route.text}<a class="map" href="${route.source}" target="_blank">Route</a>
    </p>
    <span class="tag" style="background-color: ${CATEGORIES.find((cat) => cat.name === route.category).color}">${route.category}</span></li>`);
    const html = htmlArray.join("");
    routesList.insertAdjacentHTML("afterbegin", html);
    // console.log(htmlArray);
}


