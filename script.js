let roomData = [];
let totalCost = 0;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        roomData = data;
    })
    .catch(error => console.error('Error loading JSON:', error));

function addRoom() {
    const roomType = document.getElementById('roomType').value;
    const techSet = document.getElementById('techSet').value;
    const room = roomData.find(r => r.room_type === roomType && r.technology_set === techSet);

    if (room) {
        totalCost += room.cost;

        const roomList = document.getElementById('roomList');
        const listItem = document.createElement('li');
        listItem.textContent = `${roomType} room with ${techSet} technology: $${room.cost}`;
        roomList.appendChild(listItem);

        document.getElementById('totalCost').textContent = totalCost;
    }
}
