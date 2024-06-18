const roomData = [
    { room_type: "Small", technology_set: "Basic", cost: 1000 },
    { room_type: "Medium", technology_set: "Standard", cost: 2000 },
    { room_type: "Large", technology_set: "Advanced", cost: 3000 }
];

let totalCost = 0;

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
