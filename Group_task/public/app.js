const SENSOR_API = 'http://localhost:5001/parking';


$.get(`${SENSOR_API}`)
    .then(response => {
        const car1Status = response.find(pdata => pdata.id === 1).data;
        $('#car1').text(car1Status);
    });

// function Makepayment() {
//     var name = document.getElementById("name").value;
//     var amount = document.getElementById("amount").value;

//     var options = {
//         "key": "rzp_test_ArNjkVYcUtxXIZ", // Enter the Key ID generated from the Dashboard
//         "amount": amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//         "currency": "INR",
//         "name": "Smart Parking System", //your business name
//         "description": "Test Transactions",
//         "image": "https://example.com/your_logo",
//         // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//         "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
//         "prefill": {
//             "name": "Gaurav Kumar", //your customer's name
//             "email": "gaurav.kumar@example.com",
//             "contact": "9000090000"
//         },
//         "notes": {
//             "address": "Razorpay Corporate Office"
//         },
//         "theme": {
//             "color": "#3399cc"
//         },
//         "handler": function (response) {
//             window.location.href = 'front1.html';
//             $.post(`http://localhost:5001/success`)
//                 .then(response => {
//                     console.log(response); // Log the response to the console
//                 })
//                 .catch(error => {
//                     console.error(`Error: ${error}`);
//                 });
//         }

//     };
//     var rzp1 = new Razorpay(options);
//     rzp1.open();
// }
