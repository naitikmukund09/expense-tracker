// emi.js
document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const rateInput = document.getElementById('rate');
    const yearsInput = document.getElementById('years');
    const calculateButton = document.getElementById('calculate');
    const monthlyPaymentDiv = document.getElementById('monthly-payment');
    const totalPaymentDiv = document.getElementById('total-payment');
    const totalInterestDiv = document.getElementById('total-interest');
    const chartContainer = document.getElementById('chart-container');
    const paymentChartCanvas = document.getElementById('paymentChart');
    let paymentChart;

    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const container = document.querySelector('.container');
    const heading = document.querySelector('h1');
    const labels = document.querySelectorAll('label');
    const inputFields = document.querySelectorAll('input[type="number"]');
    const resultBoxes = document.querySelectorAll('.result-box');

    function calculateEMI(principal, annualRate, termYears) {
        const monthlyRate = annualRate / 1200; // Annual rate to monthly rate (percentage to decimal)
        const numberOfPayments = termYears * 12;

        if (monthlyRate === 0) {
            return principal / numberOfPayments;
        }

        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        return emi;
    }

    function formatCurrency(amount) {
        return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    function displayResults(monthlyPayment, totalPayment, totalInterest) {
        monthlyPaymentDiv.textContent = `Monthly Payment: ${formatCurrency(monthlyPayment)}`;
        totalPaymentDiv.textContent = `Total Payment: ${formatCurrency(totalPayment)}`;
        totalInterestDiv.textContent = `Total Interest: ${formatCurrency(totalInterest)}`;
    }

    function createAmortizationChart(principal, annualRate, termYears) {
        const monthlyRate = annualRate / 1200;
        const numberOfPayments = termYears * 12;
        let balance = principal;
        let monthlyPayments = [];
        let interestPaid = 0;
        let principalPaid = 0;

        for (let i = 1; i <= numberOfPayments; i++) {
            const interest = balance * monthlyRate;
            const principalPayment = calculateEMI(principal, annualRate, termYears) - interest;
            balance -= principalPayment;
            interestPaid += interest;
            principalPaid += principalPayment;
            monthlyPayments.push({ month: i, interest: interest, principal: principalPayment });
        }

        if (paymentChart) {
            paymentChart.destroy();
        }

        const labels = monthlyPayments.map(payment => payment.month);
        const interestData = monthlyPayments.map(payment => payment.interest);
        const principalData = monthlyPayments.map(payment => payment.principal);

        paymentChart = new Chart(paymentChartCanvas, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Interest',
                        data: interestData,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Principal',
                        data: principalData,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount ($)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Loan Amortization Schedule',
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    }
                }
            }
        });
    }

    calculateButton.addEventListener('click', function() {
        const principal = parseFloat(amountInput.value);
        const annualRate = parseFloat(rateInput.value);
        const termYears = parseInt(yearsInput.value);

        if (isNaN(principal) || isNaN(annualRate) || isNaN(termYears) || principal <= 0 || annualRate < 0 || termYears <= 0) {
            alert('Please enter valid loan details.');
            return;
        }

        const monthlyPayment = calculateEMI(principal, annualRate, termYears);
        const numberOfPayments = termYears * 12;
        const totalPayment = monthlyPayment * numberOfPayments;
        const totalInterest = totalPayment - principal;

        displayResults(monthlyPayment, totalPayment, totalInterest);
        createAmortizationChart(principal, annualRate, termYears);
        chartContainer.style.display = 'block';
    });

    // Dark Mode Toggle Functionality
    darkModeToggle.addEventListener('change', function() {
        body.classList.toggle('dark-mode');
        container.classList.toggle('dark-mode');
        heading.classList.toggle('dark-mode');
        labels.forEach(label => label.classList.toggle('dark-mode'));
        inputFields.forEach(input => input.classList.toggle('dark-mode'));
        resultBoxes.forEach(box => box.classList.toggle('dark-mode'));
    });
});