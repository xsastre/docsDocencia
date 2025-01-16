document.getElementById('circleForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const radius = parseFloat(document.getElementById('radius').value);
    if (isNaN(radius) || radius <= 0) {
        alert('Si us plau, introdueix un radi vàlid.');
        return;
    }

    const diameter = 2 * radius;
    const area = Math.PI * Math.pow(radius, 2);
    const volume = (4/3) * Math.PI * Math.pow(radius, 3);

    document.getElementById('results').innerHTML = `
        <p>Diàmetre: ${diameter.toFixed(2)}</p>
        <p>Àrea: ${area.toFixed(2)}</p>
        <p>Volum: ${volume.toFixed(2)}</p>
    `;

    const circle = document.getElementById('circle');
    circle.style.width = `${2 * radius}px`;
    circle.style.height = `${2 * radius}px`;

    const sphere = document.querySelector('.sphere-inner');
    sphere.style.width = `${2 * radius}px`;
    sphere.style.height = `${2 * radius}px`;
});
