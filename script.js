let roomData = [];
let totalEquipment = 0;
let totalServices = 0;
let totalSupport = 0;
let totalLicenses = 0;
let totalCost = 0;
const selectedRooms = [];

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

        selectedRooms.push({roomType, techSet, room});

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

    const index = selectedRooms.findIndex(r => r.room === room);
    if (index !== -1) {
        selectedRooms.splice(index, 1);
    }

    document.getElementById('totalServices').textContent = totalServices;
    document.getElementById('totalSupport').textContent = totalSupport;
    document.getElementById('totalLicenses').textContent = totalLicenses;
    document.getElementById('totalCost').textContent = totalCost;
}

function exportData() {
    let csvContent = "data:text/csv;charset=utf-8,Room Type,Technology Set,Equipment,Cost,Services,Support,Licenses,Total Cost\n";

    selectedRooms.forEach(({ roomType, techSet, room }) => {
        room.equipment.forEach(equip => {
            const totalRoomCost = equip.cost + room.services + room.support + room.licenses;
            const row = `${roomType},${techSet},${equip.name},${equip.cost},${room.services},${room.support},${room.licenses},${totalRoomCost}\n`;
            csvContent += row;
        });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "meeting_room_costs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
