//const movie = document.getElementById()

const container = document.querySelector('.container');
//console.log(container)
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
console.log(seats);
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI()
//console.log( movieSelect.selectedIndex);
let ticketPrice =+movieSelect.value; 

//Save Selected movie index and price
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

//Update total and count
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
//    console.log(selectedSeats);
//    console.log(seats);
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
//    console.log(seatsIndex)
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex));
    const selectedSeatsCount = seatsIndex.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    
//  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

//Get data from locatstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add('selected');
                
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex!==null){
        movieSelect.selectedIndex=selectedMovieIndex
    }

}

//Movie Select Event
movieSelect.addEventListener('click',e=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelectedCount()
});


//Seat Select Event
container.addEventListener('click', e=>{
    if(e.target.classList.contains('seat')&&
       !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})


// Initial count and total set
updateSelectedCount();























