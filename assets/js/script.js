// Enquiry form handling (only if enquiryForm exists)
const enquiryFormEl = document.getElementById("enquiryForm");
if (enquiryFormEl) {
  enquiryFormEl.addEventListener("submit", function (event) {
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
}

// Live realtime (local) time in footer (black text)
(function () {
  const footer = document.querySelector("footer");
  if (!footer) return;

  let timeEl = document.getElementById("realtime-clock");
  if (!timeEl) {
    timeEl = document.createElement("div");
    timeEl.id = "realtime-clock";
    timeEl.style.color = "black";
    timeEl.style.marginTop = "6px";
    footer.appendChild(timeEl);
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function render() {
    const now = new Date();
    // Format: YYYY-MM-DD HH:mm:ss (24h)
    const formatted =
      now.getFullYear() +
      "-" +
      pad2(now.getMonth() + 1) +
      "-" +
      pad2(now.getDate()) +
      " " +
      pad2(now.getHours()) +
      ":" +
      pad2(now.getMinutes()) +
      ":" +
      pad2(now.getSeconds());

    timeEl.textContent = "Live time: " + formatted;
  }

  render();
  setInterval(render, 1000);
})();


