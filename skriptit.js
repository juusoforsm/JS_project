//Selectors for the application
var toDoSyote = document.getElementById("todo-syote");
var toDoNappi = document.getElementById("todo-nappi");
var toDoLista = document.getElementById("todo-lista");
var completedNappi = document.getElementById("completed");
var activeNappi = document.getElementById("active");
var allNappi = document.getElementById("all");
var clearCompleted = document.getElementById("clear-completed");

//Event Listeners for the application
//This eventlistener fires up, when the page is opened/refreshed
document.addEventListener('DOMContentLoaded', haeTodot);
//This calls the function to add a new todo item when the + is pressed
toDoNappi.addEventListener("click", lisaaTehtava);
//This one fires up when you click the remove button on the Li-element, removing the element all together from the list
toDoLista.addEventListener("click", poistaValmis);
//This one shows all the completed items and hides the rest
completedNappi.addEventListener('click', filterValmiit);
//this one shows active ones and hides the completed
activeNappi.addEventListener('click', filterActive);
//This one shows every item in the list
allNappi.addEventListener('click', filterAll);
//This one listens for the clear completed button, that removes every completed item from the list and localstorage
clearCompleted.addEventListener('click', clear);

//functions for the application
function lisaaTehtava(event){
    //Keeps the page from refreshing
    event.preventDefault();
//Create a Div for the list
    var toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");
//Create a new li element for to do items
    var uusiToDo = document.createElement("li");
    uusiToDo.innerText = toDoSyote.value;
//add an if statement to make sure the input is not too short or empty
    if (toDoSyote.value ===''){
        alert("Jotain täytyy kirjoittaa!");
        toDoSyote.style.borderColor = "red";
    return;
    }if ((toDoSyote.value.length <=2) || (toDoSyote.value.length < 0)){
        alert("Liian lyhyt...");
        toDoSyote.style.borderColor = "red";
    }    else {
        toDoSyote.style.borderColor = "rgb(255, 243, 228)";
//add a class to the new item
    uusiToDo.classList.add("todo-item");
//add the li element to the div
    toDoDiv.appendChild(uusiToDo);
//STore the data to localStorage
    store(toDoSyote.value);
//Add a checked button to li element
    var valmisNappi = document.createElement("button");
    valmisNappi.innerHTML = "&#10003;";
    valmisNappi.classList.add("valmis-nappi");
    toDoDiv.appendChild(valmisNappi);
//Add a delete button to li element
    var poistoNappi = document.createElement("button");
    poistoNappi.innerHTML = "\u00D7";
    poistoNappi.classList.add("poisto-nappi");
    toDoDiv.appendChild(poistoNappi);
//add the div to the list
    toDoLista.appendChild(toDoDiv);
//clear the input field
    toDoSyote.value = "";
    }
}

//Function to store data to local storage
function store(todo) {
    var todot;
//Create a if-statement to create new array, if there is nothing stored in localstorage already
    if(localStorage.getItem('todot') === null){
        todot = [];
    } else {
//Gets the items from localstorage and changes them to JSobjects in array
        todot = JSON.parse(localStorage.getItem('todot'));
    }
//push the items to the array
    todot.push(todo);
//Change the data to string using stringify to store them in localstorage
    localStorage.setItem('todot', JSON.stringify(todot));
}
//function to fetch the todos from localstorage and give them the style from css
function haeTodot(){
    var todot;
//Create a if-statement to create an array if there is nothing in localstorage
    if(localStorage.getItem('todot') === null){
        todot = [];
    } else {
//Fetch the items from localstorage
        todot = JSON.parse(localStorage.getItem('todot'));
    }
//Create a forEach loop to to get the local storage items looking the way they should on the website
    todot.forEach(function(todo){
//Use the code from function lisaaTehtava() to add the todos from localstorage
        var toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo");
        var uusiToDo = document.createElement("li");
//This time we'll just innerText the string that was already in stored
//These are pretty much the same, but with minor changes e.g we do not need the if statement anymore
        uusiToDo.innerText = todo;
        uusiToDo.classList.add("todo-item");
        toDoDiv.appendChild(uusiToDo);
        var valmisNappi = document.createElement("button");
        valmisNappi.innerHTML = "&#10003;";
        valmisNappi.classList.add("valmis-nappi");
        toDoDiv.appendChild(valmisNappi);
        var poistoNappi = document.createElement("button");
        poistoNappi.innerHTML = "\u00D7";
        poistoNappi.classList.add("poisto-nappi");
        toDoDiv.appendChild(poistoNappi);
        toDoLista.appendChild(toDoDiv);
    })
}

//function for deleting items and giving "valmis" class to li elements 
function poistaValmis(e){
    var asia = e.target;
//Delete Li item
    if (asia.classList[0] === "poisto-nappi"){
    var x = asia.parentElement;
//Call the function that removes the item from localstorage
    deleteFromLocal(x);
//remove the element from the website
    x.remove();
    }
//give "valmis" class to  the Li item
    if(asia.classList[0] === "valmis-nappi"){
       var  y = asia.parentElement;
       y.classList.toggle('valmis');    
    }
}

//Delete specific list items from localstorage
function deleteFromLocal(todo){
    var todot;
//Create a if-statement to create new array, if there is nothing stored in localstorage already
    if(localStorage.getItem('todot') === null){
        todot = [];
    } else {
//Gets the items from localstorage and changes them to JSobjects in array
        todot = JSON.parse(localStorage.getItem('todot'));
    }
//Define the variable that we want to delete
    var toDoIndex = todo.children[0].innerText;
//Use .splice to get the specific elements index from the array and delete it
    todot.splice(todot.indexOf(toDoIndex), 1);
//Save the rest of the items back to localStorage
    localStorage.setItem("todot", JSON.stringify(todot));
}

//A function to filter out everything but completed items
function filterValmiit(evt){
    var todot = toDoLista.childNodes;
//Create a for-loop to go through every element on the list checking if they contain class = 'valmis'
//Original intention was to use forEach loops with all the buttons, but we couldn't get the to work
//For- loop it is then
    for(var i = 0; i<todot.length; i++){
        if(todot[i].classList.contains('valmis')){
//If it contains the class, show it
            todot[i].style.display = "flex";
        }else{
//If not, hide it
            todot[i].style.display = "none";
        }    
    }
}

// Filter out everything but active items
function filterActive(evt){
    var todot = toDoLista.childNodes;
//Create a for-loop to go through every element on the list checking if they contain class = 'valmis'
    for(var i = 0; i<todot.length; i++){
        if(!todot[i].classList.contains('valmis')) {
//IF it doesn't contain the mentioned class, show it
            todot[i].style.display = "flex";
        }else{
//If not, hide it
            todot[i].style.display = "none";
        }
    }
}

//A function to show all items in the list
function filterAll(evt){
    var todot = toDoLista.childNodes;
//Create a for-loop to go through every element on the list checking if they contain or do not contain class = 'valmis'
    for(var i = 0; i<todot.length; i++){
        if((todot[i].classList.contains('valmis')) || (!todot[i].classList.contains('valmis'))) {
            todot[i].style.display = "flex";
        }
    }
}

//A function that removes completed items from list and local storage
function clear(evt){
    var todot = Array.from(document.getElementsByClassName('valmis'));
//Create a forEach - loop to go through every item in the list
//If it finds a class "valmis", then it deletes the item first from local storage and then from the website 
    todot.forEach(valmis => {
//Call the function that removes data from local storage
    deleteFromLocal(valmis);
    valmis.remove();
});
}
