function openPaymentForm() {
    // Create a new window with the payment form
    const paymentWindow = window.open("", "Payment Form", "width=400,height=300");

    // Add the payment form HTML to the new window
    paymentWindow.document.write(`
      <form onsubmit="calculateAmount(event)">
        <label for="minutes">Number of minutes:</label>
        <input type="number" id="minutes" name="minutes" required>
        <button type="submit">Calculate Amount</button>
      </form>
    `);

    // Focus the new window
    paymentWindow.focus();
}

function calculateAmount(event) {
    event.preventDefault();
    const minutes = parseInt(event.target.elements.minutes.value);
    const rate = 50;
    const amount = (minutes * rate).toFixed(2);

    // Display the payment amount in the payment form window
    event.target.innerHTML += `
      <p>Total amount due: $${amount}</p>
      <a herf = "index.html">
      <button onclick="processPayment()">Pay Now</button>
      </a>
    `;
}

function processPayment() {
    // Replace this with your payment processing logic, such as redirecting to a payment page or calling an API.
    
    window.location.href = "pay1.html";
}