// Variables to track total investments
let lumpsumTotalInvestment = 0;
let sipTotalInvestment = 0;

// Lumpsum Calculation Function
function calculateLumpsum() {
    const principal = parseFloat(document.getElementById('lumpsum-principal').value);
    const rate = parseFloat(document.getElementById('lumpsum-rate').value) / 100;
    const time = parseFloat(document.getElementById('lumpsum-time').value);
    const compoundingFrequency = document.getElementById('lumpsum-compounding').value;

    if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
        alert("Please fill in all the fields.");
        return;
    }

    let compoundingPeriods = 0;
    if (compoundingFrequency === "monthly") {
        compoundingPeriods = 12;
    } else if (compoundingFrequency === "annually") {
        compoundingPeriods = 1;
    }

    // Calculate compound interest formula
    const amount = principal * Math.pow((1 + rate / compoundingPeriods), compoundingPeriods * time);

    // Total investment is simply the principal
    const totalInvestment = principal;

    // Update the total investment for lumpsum
    lumpsumTotalInvestment = totalInvestment;

    // Update result and total investment
    document.getElementById('lumpsum-result').textContent = amount.toFixed(2);
    document.getElementById('lumpsum-total-investment').textContent = totalInvestment.toFixed(2);

    // Update the total combined investment
    updateTotalCombinedInvestment();
}

// SIP Calculation Function
function calculateSIP() {
    const sipAmount = parseFloat(document.getElementById('sip-principal').value);
    const rate = parseFloat(document.getElementById('sip-rate').value) / 100;
    const time = parseFloat(document.getElementById('sip-time').value);
    const compoundingFrequency = document.getElementById('sip-compounding').value;

    if (isNaN(sipAmount) || isNaN(rate) || isNaN(time)) {
        alert("Please fill in all the fields.");
        return;
    }

    let compoundingPeriods = 0;
    if (compoundingFrequency === "monthly") {
        compoundingPeriods = 12;
    } else if (compoundingFrequency === "annually") {
        compoundingPeriods = 1;
    }

    // SIP compound interest formula: Future Value = SIP * [(1 + r/n)^(nt) - 1] / (r/n)
    const totalMonths = time * 12;
    const amount = sipAmount * ((Math.pow(1 + rate / 12, totalMonths) - 1) / (rate / 12));

    // Total investment is SIP amount multiplied by total months
    const totalInvestment = sipAmount * totalMonths;

    // Update the total investment for SIP
    sipTotalInvestment = totalInvestment;

    // Update results
    document.getElementById('sip-result').textContent = amount.toFixed(2);
    document.getElementById('sip-total-investment').textContent = totalInvestment.toFixed(2);

    // Update the total combined investment
    updateTotalCombinedInvestment();
}

// Update the Total Combined Investment
function updateTotalCombinedInvestment() {
    const totalCombinedInvestment = lumpsumTotalInvestment + sipTotalInvestment;
    document.getElementById('total-combined-investment').textContent = totalCombinedInvestment.toFixed(2);
}

// Functions to switch between Lumpsum and SIP calculators
function showLumpsumCalculator() {
    document.getElementById('lumpsum-form').style.display = 'block';
    document.getElementById('sip-form').style.display = 'none';
    document.getElementById('lumpsum-btn').classList.add('active');
    document.getElementById('sip-btn').classList.remove('active');
}

function showSipCalculator() {
    document.getElementById('sip-form').style.display = 'block';
    document.getElementById('lumpsum-form').style.display = 'none';
    document.getElementById('sip-btn').classList.add('active');
    document.getElementById('lumpsum-btn').classList.remove('active');
}
