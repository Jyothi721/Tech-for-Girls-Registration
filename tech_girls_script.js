let shareCount = 0;
const maxShares = 5;

const shareBtn = document.getElementById("shareBtn");
const counterText = document.getElementById("counterText");
const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

if (localStorage.getItem("submitted")) {
  form.querySelectorAll("input, button").forEach(el => el.disabled = true);
  message.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
}

shareBtn.addEventListener("click", () => {
  if (shareCount < maxShares) {
    shareCount++;
    counterText.textContent = `Click count: ${shareCount}/${maxShares}`;
    window.open("https://wa.me/?text=Hey Buddy, Join Tech For Girls Community", "_blank");

    if (shareCount === maxShares) {
      counterText.textContent = "Sharing complete. Please continue.";
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (shareCount < maxShares) {
    alert("Please complete WhatsApp sharing before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const file = document.getElementById("screenshot").files[0];

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", file);

  try {
    await fetch("YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL", {
      method: "POST",
      body: formData,
    });

    localStorage.setItem("submitted", "true");
    form.querySelectorAll("input, button").forEach(el => el.disabled = true);
    message.textContent = "🎉 Your submission has been recorded. Thanks for being part of Tech for Girls!";
  } catch (error) {
    alert("Submission failed. Try again.");
  }
});
