// scripts/app.js

// Helper to get input values
function getInputs() {
    return {
      score: parseInt(document.getElementById('scoreInput').value),
      util: parseFloat(document.getElementById('utilInput').value),
      hist: parseFloat(document.getElementById('histInput').value),
      inq: parseInt(document.getElementById('inqInput').value)
    };
  }
  
  // Handle static tips
  function getStaticTips({ score }) {
    let category = '';
    let tips = [];
  
    if (score < 580) {
      category = 'Poor';
      tips = ['Pay bills on time.', 'Lower balances.', 'Avoid new inquiries.', 'Dispute report errors.'];
    } else if (score < 670) {
      category = 'Fair';
      tips = ['Keep utilization <30%.', 'Auto-pay bills.', 'Maintain old accounts.', 'Diversify credit.'];
    } else if (score < 740) {
      category = 'Good';
      tips = ['On-time payments.', 'Request limit increases.', 'Limit inquiries.', 'Monitor reports.'];
    } else if (score < 800) {
      category = 'Very Good';
      tips = ['Utilization <10%.', 'Balance account types.', 'Keep oldest open.', 'Check for fraud.'];
    } else {
      category = 'Exceptional';
      tips = ['Maintain habits.', 'Pay in full.', 'Use strategically.', 'Annual report review.'];
    }
  
    return { category, tips };
  }
  
  function displayStaticTips() {
    const resultDiv = document.getElementById('result');
    const inputs = getInputs();
    if (!inputs.score) return alert('Please enter your credit score.');
    const { category, tips } = getStaticTips(inputs);
    resultDiv.innerHTML = `<div class="section-title">Static Tips (${category})</div>` +
      tips.map(t => `<div class="tip">${t}</div>`).join('');
    updateProgressBar(inputs.score);
  }
  
  function updateProgressBar(score) {
    const percent = ((score - 300) / 550) * 100;
    document.querySelector('.bar').style.width = percent + '%';
  }
  
  function displayMLPrediction() {
    const resultDiv = document.getElementById('result');
    const inputs = getInputs();
    if (![inputs.score, inputs.util, inputs.hist, inputs.inq].every(v => !isNaN(v))) {
      return alert('Please fill in all fields');
    }
  
    let risk;
    const score = inputs.score;
    if (score < 600) risk = 'High Risk';
    else if (score < 700) risk = 'Medium Risk';
    else risk = 'Low Risk';
  
    resultDiv.innerHTML = `<div class="section-title">ML Model Prediction</div>` +
      `<div class="tip">Based on your input, your credit profile is: <strong>${risk}</strong></div>`;
    updateProgressBar(score);
  }
  
  function displayAITips() {
    const resultDiv = document.getElementById('result');
    const inputs = getInputs();
    if (![inputs.score, inputs.util, inputs.hist, inputs.inq].every(v => !isNaN(v))) {
      return alert('Please fill in all fields');
    }
  
    const aiTips = [
      'Keep credit utilization below 30%.',
      'Avoid applying for new credit frequently.',
      'Make consistent, on-time payments.',
      'Keep old accounts open to lengthen history.'
    ];
  
    resultDiv.innerHTML = `<div class="section-title">AI Tips</div>` +
      aiTips.map(t => `<div class="tip">${t}</div>`).join('');
    updateProgressBar(inputs.score);
  }
  
  // Add event listeners
  window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('staticBtn').addEventListener('click', displayStaticTips);
    document.getElementById('mlBtn').addEventListener('click', displayMLPrediction);
    document.getElementById('aiBtn').addEventListener('click', displayAITips);
  });
  