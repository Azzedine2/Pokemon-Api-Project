/*
bug: "#26de81",
dragon: "#ffeaa7",
electric: "#fed330",
fairy:"#ff0069",
fighting:"#30336b",
fire:"#f0932b",
flying:"#8eccec",
grass:"#00b894",
ground:"#efb549",
ghost:"#a55eea",
ice:"#74b9ff",
normal:"#95afc0",
poison:"#6c5ce7",
psychic:"#a29bfe",
rock:"#2d3436",
water:"#0190ff",
*/

const typeColor = {
    bug: "#26de81",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#ff0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#8eccec",
    grass: "#00b894",
    ground: "#efb549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190ff",
}
const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

let getPokeData = () => {
    // Générer un nombre aléatoire entre 1 et 151
    let id = Math.floor(Math.random() * 151) + 1;
    // Combinez l'URL de l'API Pokémon avec l'identifiant du Pokémon
    const finalUrl = url + id;
    // Effectuez une requête pour récupérer les données du Pokémon
    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {
            generateCard(data);
        });
};

// GENERATE CARD
let generateCard = (data) => {
    // GET NECESSARY DATA AND ASSIGN IT TO VARIABLES
    console.log(data);
    const hp = data.stats[0].base_stat;
    console.log(hp);
    const imgSrc = data.sprites.other.dream_world.front_default;
    console.log(imgSrc);
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    console.log(pokeName);
    const type = data.types[0].type.name;
    console.log(type);;
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;

    // \set color scheme by type
    let themeColor = typeColor[data.types[0].type.name];
    console.log(themeColor);

    card.innerHTML = `
    <p class="hp">
        <span>HP</span>
        ${hp}
        
    </p>
    <img src=${imgSrc} alt=${pokeName}>
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types">
 
    </div>
    <div class="stats">
        <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
        </div>
        <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
        </div>
        <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
        </div>
    </div>
`;

    appendTypes(data.types);
    styleCard(themeColor);
};

let appendTypes = (types) => {
    types.forEach((item) => {
        let span = document.createElement("span");
        span.textContent = item.type.name;
        document.querySelector(".types").appendChild(span);
    });
};
let styleCard = (color) => {
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #ffffff 36%)`;
    card.querySelectorAll(".types span").forEach(
        (typeColor) => {
         typeColor.style.backgroundColor = color;
    });

};


btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
