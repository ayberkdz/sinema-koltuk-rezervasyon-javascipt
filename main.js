const container = document.querySelector('.container')

const text = document.getElementById('text')
const text2 = document.getElementById('text2')

const count = document.getElementById('count')
const amount = document.getElementById('amount')
const select = document.getElementById('movie')
const seats = document.querySelectorAll('.seat:not(.reserved)')

getFromLocalStorage()
calculateTotal()

function saveToLocalStorage(index) {
    localStorage.setItem('selectedSeats', JSON.stringify(index));
    localStorage.setItem('selectedMovieIndex', select.selectedIndex)
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function(seat, index) {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        });
    }

    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'))

    if (selectedMovieIndex != null) {
        select.selectedIndex = selectedMovieIndex
    }
}

function calculateTotal() {

    let selectedSeats = container.querySelectorAll('.seat.selected')

    const selectedSeatArray = []
    const seatsArray = []

    selectedSeats.forEach(function(seat) {
        selectedSeatArray.push(seat);
    });

    seats.forEach(function(seat) {
        seatsArray.push(seat)
    });

    let selectedSeatIndexs = selectedSeatArray.map(function(seat) {
        return seatsArray.indexOf(seat)
    })

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount
    amount.innerText = selectedSeatCount * select.value

    saveToLocalStorage(selectedSeatIndexs);
}

container.addEventListener('click', function(e) {

    // basılan eleman seat sınıfı içeriyor ve reserved sınıfı içermiyor mu?
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected')

        calculateTotal()

        // console.log(selectedSeatCount*price);
    }
});

select.addEventListener('change', function(e) {
    calculateTotal()
});