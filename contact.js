import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyATzgQn8NGeKhg9HtVDH9EnAYr6LNVdJzQ",
  authDomain: "shrisha-construction.firebaseapp.com",
  projectId: "shrisha-construction",
  storageBucket: "shrisha-construction.firebasestorage.app",
  messagingSenderId: "446076291988",
  appId: "1:446076291988:web:1365a93b2c2269794a1d81",
  measurementId: "G-FSN4WBQQMN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

  (function () {
  const contactPage = document.getElementById("cuContactPage");

  if (!contactPage) return;

  const form = document.getElementById("cuContactForm");
  const statusText = document.getElementById("cuFormStatus");
  const callBtn = document.getElementById("cuCallBtn");

  window.addEventListener("load", function () {
    contactPage.classList.add("cu-contact-page--show");
  });

  if (callBtn) {
    callBtn.addEventListener("click", function (e) {
      const confirmCall = confirm("Do you want to call +91 84249 10995?");

      if (!confirmCall) {
        e.preventDefault();
      }
    });
  }

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    clearFormErrors();

    const formData = {
      fullName: form.fullName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim()
    };

    const isValid = validateContactForm(formData);

    if (!isValid) return;

    statusText.textContent = "Sending message...";
    statusText.className = "cu-form-status";

    const submitBtn = form.querySelector(".cu-submit-btn");
    submitBtn.disabled = true;

    /*
      BACKEND READY CODE:

      When you create backend, uncomment this fetch code.

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Something went wrong");
        }

        statusText.textContent = "Thank you! Your message has been sent.";
        statusText.className = "cu-form-status cu-success";
        form.reset();

      } catch (error) {
        statusText.textContent = error.message || "Unable to send message.";
        statusText.className = "cu-form-status cu-error";
      } finally {
        submitBtn.disabled = false;
      }
    */

    // Temporary frontend demo success
   try {

  await addDoc(
    collection(db, "contacts"),
    {

      fullName: formData.fullName,

      email: formData.email,

      phone: formData.phone,

      subject: formData.subject,

      message: formData.message,

      status: "New",

      source: "Contact Form",

      createdAt: serverTimestamp()

    }
  );

  statusText.textContent =
  "Thank you! Your message has been sent.";

  statusText.className =
  "cu-form-status cu-success";

  form.reset();

}
catch(error){

  console.error(error);

  statusText.textContent =
  "Unable to send message.";

  statusText.className =
  "cu-form-status cu-error";

}
finally{

  submitBtn.disabled = false;

}
  });

  function validateContactForm(data) {
    let valid = true;

    if (!data.fullName) {
      showError("cuFullName");
      valid = false;
    }

    if (!data.email || !isValidEmail(data.email)) {
      showError("cuEmail");
      valid = false;
    }

    if (!data.message) {
      showError("cuMessage");
      valid = false;
    }

    if (!valid) {
      statusText.textContent = "Please fill all required fields correctly.";
      statusText.className = "cu-form-status cu-error";
    }

    return valid;
  }

  function showError(inputId) {
    const input = document.getElementById(inputId);

    if (!input) return;

    const group = input.closest(".cu-form-group");

    if (group) {
      group.classList.add("cu-form-error");
    }
  }

  function clearFormErrors() {
    const errorGroups = form.querySelectorAll(".cu-form-error");

    errorGroups.forEach(function (group) {
      group.classList.remove("cu-form-error");
    });

    statusText.textContent = "";
    statusText.className = "cu-form-status";
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
})();