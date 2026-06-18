
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// PASTE YOUR FIREBASE CONFIG
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


// LOAD DATA
async function loadLeads() {

  try {

    const quoteSnap = await getDocs(collection(db, "quotes"));
    const contactSnap = await getDocs(collection(db, "contacts"));

    let html = "";

    let total = 0;
    let pending = 0;
    let contacted = 0;
    let confirmed = 0;

    // QUOTES
    quoteSnap.forEach((lead) => {

      const data = lead.data();

      total++;

      const status = data.status || "Pending";

      if (status === "Pending") pending++;
      if (status === "Contacted") contacted++;
      if (status === "Confirmed") confirmed++;

      html += `
      <tr>
        <td>Estimate</td>
        <td>${data.name || ""}</td>
        <td>${data.phone || ""}</td>
        <td>${data.email || ""}</td>
        <td>${data.service || ""}</td>
        <td>${data.location || ""}</td>

        <td>
          <select class="status-select"
                  data-id="${lead.id}"
                  data-type="quotes">

            <option value="Pending" ${status==="Pending"?"selected":""}>
              Pending
            </option>

            <option value="Contacted" ${status==="Contacted"?"selected":""}>
              Contacted
            </option>

            <option value="Confirmed" ${status==="Confirmed"?"selected":""}>
              Confirmed
            </option>

          </select>
        </td>

        <td>
          ${
            data.createdAt?.seconds
            ? new Date(data.createdAt.seconds * 1000).toLocaleDateString()
            : "-"
          }
        </td>

        <td>
          <button class="delete-btn"
                  data-id="${lead.id}"
                  data-type="quotes">
            Delete
          </button>
        </td>

      </tr>
      `;
    });



    // CONTACTS
    contactSnap.forEach((lead) => {

      const data = lead.data();

      total++;

      const status = data.status || "Pending";

      if (status === "Pending") pending++;
      if (status === "Contacted") contacted++;
      if (status === "Confirmed") confirmed++;

      html += `
      <tr>

        <td>Contact</td>
        <td>${data.fullName || ""}</td>
        <td>${data.phone || ""}</td>
        <td>${data.email || ""}</td>
        <td>${data.subject || ""}</td>
        <td>${data.message || ""}</td>

        <td>
          <select class="status-select"
                  data-id="${lead.id}"
                  data-type="contacts">

            <option value="Pending" ${status==="Pending"?"selected":""}>
              Pending
            </option>

            <option value="Contacted" ${status==="Contacted"?"selected":""}>
              Contacted
            </option>

            <option value="Confirmed" ${status==="Confirmed"?"selected":""}>
              Confirmed
            </option>

          </select>
        </td>

        <td>
          ${
            data.createdAt?.seconds
            ? new Date(data.createdAt.seconds * 1000).toLocaleDateString()
            : "-"
          }
        </td>

        <td>
          <button class="delete-btn"
                  data-id="${lead.id}"
                  data-type="contacts">
            Delete
          </button>
        </td>

      </tr>
      `;
    });



    document.getElementById("leadTable").innerHTML = html;

    document.getElementById("totalLeads").textContent = total;
    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("contactedCount").textContent = contacted;
    document.getElementById("confirmedCount").textContent = confirmed;

    attachEvents();

  } catch (error) {

    console.error(error);
    alert(error.message);

  }

}



// EVENTS
function attachEvents() {

  document.querySelectorAll(".delete-btn")
  .forEach(btn => {

    btn.onclick = async () => {

      if (!confirm("Delete Lead?")) return;

      await deleteDoc(
        doc(
          db,
          btn.dataset.type,
          btn.dataset.id
        )
      );

      loadLeads();
    };

  });



  document.querySelectorAll(".status-select")
  .forEach(select => {

    select.onchange = async () => {

      await updateDoc(
        doc(
          db,
          select.dataset.type,
          select.dataset.id
        ),
        {
          status: select.value
        }
      );

      loadLeads();
    };

  });

}



// SEARCH
document.getElementById("searchInput")
.addEventListener("input", () => {

  const value =
  document.getElementById("searchInput")
  .value
  .toLowerCase();

  document
  .querySelectorAll("#leadTable tr")
  .forEach(row => {

    row.style.display =
    row.innerText
    .toLowerCase()
    .includes(value)
    ? ""
    : "none";

  });

});



// REFRESH
document
.getElementById("refreshBtn")
.addEventListener("click", loadLeads);



// START
loadLeads();