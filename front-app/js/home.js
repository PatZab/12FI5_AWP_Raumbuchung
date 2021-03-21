const user_name = sessionStorage.getItem('name');
//document.getElementById('logout').addEventListener('click',logout());

fetch('/api/database/read/users')
.then(function(response){
    return response.json();
})
.then(function(info) {
    displayName(info);
})
.catch(function(err){
    console.log(err);
});

function displayName(info) {
    const dataArray = info.filter(d => d.username === user_name);
    let first_name = document.getElementById("first_name");
    first_name.innerHTML = dataArray[0].first_name;
    let last_name = document.getElementById("last_name");
    last_name.innerHTML = dataArray[0].last_name;
    sessionStorage.setItem( 'id' , dataArray[0].id );
}

fetch('/api/database/read/occupancies')
.then(function(response){
    return response.json();
})
.then(function(data){
    filterData(data);
})
.catch(function(err){
    console.log(err);
});

function filterData(data){
        const dataArray = data.filter(d => d.booker === user_name);
        appendData(dataArray);
}

function appendData(dataArray) {
    var divs = [];
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i< dataArray.length; i++){
        divs[i] = document.createElement("tr");
        divs[i].className = "tablerow";
        var div_date = document.createElement("td");
        var div_startTime = document.createElement("td");
        var div_endTime = document.createElement("td");
        var div_room = document.createElement("td");
        var div_building = document.createElement("td");
        var div_deleteBtn = document.createElement("button");
        div_deleteBtn.className = "delete_btn";
        div_date.className = "date";
        div_startTime.className = "startTime";
        div_building.className = "building";
        div_room.className = "room";

        div_date.innerHTML = dataArray[i].date;
        div_startTime.innerHTML = dataArray[i].start_time;
        div_endTime.innerHTML = dataArray[i].end_time;
        div_building.innerHTML = dataArray[i].building;
        div_room.innerHTML = dataArray[i].room_number;
        div_deleteBtn.innerHTML = "L&ouml;schen";

        divs[i].appendChild(div_date);
        divs[i].appendChild(div_startTime);
        divs[i].appendChild(div_endTime);
        divs[i].appendChild(div_building);
        divs[i].appendChild(div_room);
        divs[i].appendChild(div_deleteBtn);

        mainContainer.appendChild(divs[i]);
    }
}


let rootElement = document.querySelector('body');
rootElement.addEventListener('click',function(event){

let targetElement = event.target
let deleteBtn = '.delete_btn';

if(targetElement.matches(deleteBtn)){
    deleteEntry(event);
}

},true);

async function deleteEntry(event) {
    var deleteBtn = event.target;
    var parent = deleteBtn.parentNode;
    var children = parent.children;
    var date = children[0].innerHTML;
    var start_time = children[1].innerHTML;
    var building = children[3].innerHTML;
    var room_number = children[4].innerHTML;

    const data = { date, start_time, building, room_number};

    const options = {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'Post',
        body: JSON.stringify(data)
    }
    const res = await fetch('/api/database/remove/occupancies', options) 
    .then(response => response.json())
    .then(data => alert("Eintrag weg"));
}

function logout(){
    sessionStorage.clear();
    window.location.href='index.html'
}
