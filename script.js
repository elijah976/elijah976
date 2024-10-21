function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log(startdate);
  console.log(enddate);
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