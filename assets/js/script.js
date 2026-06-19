document.getElementById("enquiryForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all required fields.");
        return;
    }

    alert("Thank you, " + name + "! Your enquiry has been submitted.");

    // Clear the form
    document.getElementById("enquiryForm").reset();
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;

    alert("Thank you, " + name + "! Your message has been sent.");

    document.getElementById("contactForm").reset();
});
mapboxgl.accessToken = "YOUR_MAPBOX_ACCESS_TOKEN";

const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [29.453, -23.904], // Polokwane
    zoom: 12
});