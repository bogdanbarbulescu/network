const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

// Ensure the canvas size matches the card's width
canvas.width = document.querySelector('.card').offsetWidth - 40; // Account for padding
canvas.height = 400; // Set a fixed height for the canvas

// Dummy JSON Data (Simulate Data from API/Management App)
const jsonData = [
    {
        "sourceIP": "192.168.10.2",
        "srcInterface1": "LAN",
        "firewall1": "V4",
        "dstInterface1": "O4ALL",
        "srcInterface2": "O4ALL",
        "firewall2": "V5_BRA",
        "dstInterface2": "LAN",
        "destinationIP": "10.10.50.10"
    },
    {
        "sourceIP": "172.16.1.1",
        "srcInterface1": "DMZ",
        "firewall1": "FW1",
        "dstInterface1": "WAN",
        "srcInterface2": "WAN",
        "firewall2": "FW2",
        "dstInterface2": "DMZ",
        "destinationIP": "172.16.2.2"
    },
    {
        "sourceIP": "10.0.0.5",
        "srcInterface1": "LAN1",
        "firewall1": "FIRE1",
        "dstInterface1": "OUT",
        "srcInterface2": "OUT",
        "firewall2": "FIRE2",
        "dstInterface2": "LAN2",
        "destinationIP": "10.0.1.10"
    }
];

// Function to Populate the Table Dynamically
function populateTable(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Clear existing content

    data.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.sourceIP}</td>
            <td>${item.srcInterface1}</td>
            <td>${item.firewall1}</td>
            <td>${item.dstInterface1}</td>
            <td>${item.srcInterface2}</td>
            <td>${item.firewall2}</td>
            <td>${item.dstInterface2}</td>
            <td>${item.destinationIP}</td>
            <td><button onclick="generateDiagram(${index})">Show Diagram</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// Function to Draw a Node (Circle)
function drawCircle(x, y, text) {
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, 2 * Math.PI); // Slightly larger for better visibility
    ctx.fillStyle = "#ffcc00"; // Soft yellow
    ctx.fill();
    ctx.strokeStyle = "#ddd"; // Subtle stroke
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#000"; // Black text for contrast
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.font = "bold 14px Arial"; // Improved font size and bold for readability
    ctx.fillText(text, x, y);
}

// Function to Draw a Firewall (Triangle)
function drawFirewall(x, y, text) {
    ctx.beginPath();
    ctx.moveTo(x, y - 30); // Higher starting point for more space
    ctx.lineTo(x + 60, y); // Wider triangle for better appearance
    ctx.lineTo(x, y + 30);
    ctx.closePath();
    ctx.fillStyle = "#F47174"; // Soft blue
    ctx.fill();
    ctx.strokeStyle = "#ddd"; // Subtle stroke
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#fff"; // White text for contrast
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.font = "bold 14px Arial"; // Improved font for readability
    ctx.fillText(text, x + 20, y);
}

// Function to Draw a Box (Rectangle)
function drawBox(x, y, text) {
    ctx.beginPath();
    ctx.rect(x, y, 80, 40); // Slightly wider box
    ctx.fillStyle = "#a3d4a1"; // Soft green
    ctx.fill();
    ctx.strokeStyle = "#ddd"; // Subtle stroke
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#000"; // Black text for contrast
    ctx.textAlign = "center";
    ctx.textBaseline = "middle"; // Center the text vertically
    ctx.font = "bold 14px Arial"; // Improved font for readability
    ctx.fillText(text, x + 40, y + 20); // Center the text inside the box
}

// Function to Draw an Arrow
function drawArrow(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = "#ddd"; // Subtle arrow color
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Function to Generate Diagram Dynamically
function generateDiagram(index) {
    const item = jsonData[index];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCircle(100, 200, item.sourceIP);
    drawBox(200, 185, item.srcInterface1);
    drawFirewall(300, 200, item.firewall1);
    drawBox(400, 185, item.dstInterface1);
    drawBox(500, 185, item.srcInterface2);
    drawFirewall(600, 200, item.firewall2);
    drawBox(700, 185, item.dstInterface2);
    drawCircle(850, 200, item.destinationIP);

    // Arrows
    drawArrow(125, 200, 200, 200);
    drawArrow(280, 200, 300, 200);
    drawArrow(355, 200, 400, 200);
    drawArrow(480, 200, 500, 200);
    drawArrow(580, 200, 600, 200);
    drawArrow(660, 200, 700, 200);
    drawArrow(780, 200, 825, 200);
}

// Initialize Table with JSON Data
populateTable(jsonData);
