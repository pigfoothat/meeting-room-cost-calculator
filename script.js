let roomData = [];
let totalEquipment = 0;
let totalServices = 0;
let totalSupport = 0;
let totalLicenses = 0;
let totalCost = 0;

// Load JSON data
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
        totalEquipment += room.cost.equipment;
        totalServices += room.cost.services;
        totalSupport += room.cost.support;
        totalLicenses += room.cost.licenses;
        totalCost += room.cost.equipment + room.cost.services + room.cost.support + room.cost.licenses;

        const roomList = document.getElementById('roomList');
        const listItem = document.createElement('li');
        listItem.textContent = `${roomType} room with ${techSet} technology: Equipment: $${room.cost.equipment}, Services: $${room.cost.services}, Support: $${room.cost.support}, Licenses: $${room.cost.licenses}, Total: $${room.cost.equipment + room.cost.services + room.cost.support + room.cost.licenses}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeRoom(listItem, room.cost);
        listItem.appendChild(removeButton);
        roomList.appendChild(listItem);

        document.getElementById('totalEquipment').textContent = totalEquipment;
        document.getElementById('totalServices').textContent = totalServices;
        document.getElementById('totalSupport').textContent = totalSupport;
        document.getElementById('totalLicenses').textContent = totalLicenses;
        document.getElementById('totalCost').textContent = totalCost;
    }
}

function removeRoom(listItem, cost) {
    const roomList = document.getElementById('roomList');
    roomList.removeChild(listItem);
    totalEquipment -= cost.equipment;
    totalServices -= cost.services;
    totalSupport -= cost.support;
    totalLicenses -= cost.licenses;
    totalCost -= cost.equipment + cost.services + cost.support + cost.licenses;

    document.getElementById('totalEquipment').textContent = totalEquipment;
    document.getElementById('totalServices').textContent = totalServices;
    document.getElementById('totalSupport').textContent = totalSupport;
    document.getElementById('totalLicenses').textContent = totalLicenses;
    document.getElementById('totalCost').textContent = totalCost;
}

