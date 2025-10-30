// Exemplo de gráficos Chart.js para dashboard

// Staff Chart
const ctxStaff = document.getElementById('staffChart').getContext('2d');
new Chart(ctxStaff, {
    type: 'doughnut',
    data: {
        labels: ['Active', 'Inactive'],
        datasets: [{
            data: [12, 3],
            backgroundColor: ['#2ed573', '#ff4757'],
            borderWidth: 1
        }]
    },
    options: {
        plugins: { legend: { position: 'bottom' } }
    }
});

// Reports Chart
const ctxReports = document.getElementById('reportsChart').getContext('2d');
new Chart(ctxReports, {
    type: 'bar',
    data: {
        labels: ['Today', 'Yesterday', '2 Days Ago', '3 Days Ago'],
        datasets: [{
            label: 'Reports',
            data: [5, 8, 2, 6],
            backgroundColor: '#ffa502'
        }]
    },
    options: {
        plugins: { legend: { display: false } },
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Forms Chart
const ctxForms = document.getElementById('formsChart').getContext('2d');
new Chart(ctxForms, {
    type: 'line',
    data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
            label: 'Forms Processed',
            data: [5, 7, 9, 6, 10],
            fill: true,
            backgroundColor: 'rgba(46, 213, 115, 0.2)',
            borderColor: '#2ed573',
            tension: 0.3
        }]
    },
    options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
    }
});
