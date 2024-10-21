function filterData() {
  event.preventDefault();

  // Get the start and end dates from input fields
  const startdate = new Date(document.getElementById("startdate").value);
  const enddate = new Date(document.getElementById("enddate").value);

  // Ensure the date range includes the whole day
  enddate.setHours(23, 59, 59, 999);

  console.log(startdate);
  console.log(enddate);

  // Get all the rows from the table body
  const rows = document.querySelectorAll("#pitchTable tbody tr");

  // Loop through rows and hide those outside the date range
  rows.forEach(row => {
    const dateCell = row.cells[1]; // Assuming date is in the second cell (index 1)
    const rowDate = new Date(dateCell.textContent);

    // Check if the row date falls within the selected range
    if (rowDate >= startdate && rowDate <= enddate) {
      row.style.display = "";  // Show row
    } else {
      row.style.display = "none";  // Hide row
    }
  });
}


async function fetchData() {
  const url = 'https://compute.samford.edu/zohauth/clients/datajson/1';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    populateTable(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function populateTable(data) {
  const tableBody = document.querySelector('#pitchTable tbody');
  tableBody.innerHTML = ''; // Clear previous rows, if any

  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><a href="details.html?id=${item.PitchNo}">Pitch ${item.PitchNo}</a></td>
      <td>${item.Date}</td>
      <td>${item.Time}</td>
      <td>${item.Batter}</td>
      <td>${item.Balls}</td>
      <td>${item.Strikes}</td>
      <td>${item.Outs}</td>
      <td>${item.PitchCall}</td>
      <td>${item.KorBB || ''}</td>
      <td>${item.RelSpeed || ''}</td>
      <td>${item.SpinRate || ''}</td>
      <td>${item.SpinAxis || ''}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Fetch data when the page loads
window.onload = fetchData;