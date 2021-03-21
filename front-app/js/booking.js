const user_name = sessionStorage.getItem('name');
const usersId = sessionStorage.getItem('id');

const submitBtn = document.getElementById('submitFormBtn');
submitBtn.addEventListener('click', async function() {
    let dateField = document.getElementById("date");
    let dateValue = dateField.value;
    let dateArray = dateValue.split("-");
    let date = dateArray[2] + '.' + dateArray[1] + '.' + dateArray[0];

    let room = document.getElementById("room");
    let roomsId = room.options[room.options.selectedIndex].id;

    let slot = document.getElementById("slot");
    let slotsId = slot.options[slot.options.selectedIndex].id;

    const data = { date, roomsId, slotsId, usersId};

    const options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'Post',
        body: JSON.stringify(data)
    }
    const res = await fetch('/api/database/insert/occupancies', options) 
    .then(response => response.json())
    .then(data => alert("Buchung erfolgreich"));

    

});

