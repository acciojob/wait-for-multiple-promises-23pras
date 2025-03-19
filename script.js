const output = document.getElementById('output');

// ✅ Display initial "Loading..." row with id="loading"
output.innerHTML = `
  <tr id="loading">
    <td colspan="2" class="text-center">Loading...</td>
  </tr>
`;

const createPromise = (index) => {
  const delay = Math.random() * (3 - 1) + 1; // Random delay between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ index, time: delay.toFixed(3) }); // Format to 3 decimal places
    }, delay * 1000);
  });
};

const promise1 = createPromise(1);
const promise2 = createPromise(2);
const promise3 = createPromise(3);

Promise.all([promise1, promise2, promise3]).then((results) => {
  // ✅ Remove loading row
  const loadingRow = document.getElementById('loading');
  if (loadingRow) loadingRow.remove();

  // ✅ Add resolved promise data to the table
  let totalTime = 0;

  results.forEach((result) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>Promise ${result.index}</td>
      <td>${result.time}</td>
    `;
    output.appendChild(row);

    // ✅ Track the total time taken (maximum of the resolved times)
    totalTime = Math.max(totalTime, parseFloat(result.time));
  });

  // ✅ Add Total row
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `
    <td><strong>Total</strong></td>
    <td>${totalTime.toFixed(3)}</td>
  `;
  output.appendChild(totalRow);
});
