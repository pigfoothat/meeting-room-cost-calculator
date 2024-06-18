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
        totalServices += room.services;
        totalSupport += room.support;
        totalLicenses += room.licenses;
        totalCost += room.services + room.support + room.licenses;

        const roomList = document.getElementById('roomList');
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${roomType} room with ${techSet} technology:</strong>`;

        const equipmentList = document.createElement('ul');
        room.equipment.forEach(equip => {
            const equipItem = document.createElement('li');
            equipItem.textContent = `${equip.name}: $${equip.cost}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeEquipment(equipItem, equip.cost, room, listItem);
            equipItem.appendChild(removeButton);
            equipmentList.appendChild(equipItem);
            totalEquipment += equip.cost;
            totalCost += equip.cost;
        });

        listItem.appendChild(equipmentList);
        roomList.appendChild(listItem);

        document.getElementById('totalEquipment').textContent = totalEquipment;
        document.getElementById('totalServices').textContent = totalServices;
        document.getElementById('totalSupport').textContent = totalSupport;
        document.getElementById('totalLicenses').textContent = totalLicenses;
        document.getElementById('totalCost').textContent = totalCost;
    }
}

function removeEquipment(equipItem, cost, room, listItem) {
    equipItem.remove();
    totalEquipment -= cost;
    totalCost -= cost;

    // Check if any equipment left
    if (!listItem.querySelector('ul').hasChildNodes()) {
        removeRoom(listItem, room);
    }

    document.getElementById('totalEquipment').textContent = totalEquipment;
    document.getElementById('totalCost').textContent = totalCost;
}

function removeRoom(listItem, room) {
    listItem.remove();
    totalServices -= room.services;
    totalSupport -= room.support;
    totalLicenses -= room.licenses;
    totalCost -= room.services + room.support + room.licenses;

    document.getElementById('totalServices').textContent = totalServices;
    document.getElementById('totalSupport').textContent = totalSupport;
    document.getElementById('totalLicenses').textContent = totalLicenses;
    document.getElementById('totalCost').textContent = totalCost;
}
