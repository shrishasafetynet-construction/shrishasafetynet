// ======================
// Animation Code
// ======================

document.addEventListener("DOMContentLoaded",()=>{

    const cards =
    document.querySelectorAll(".sn-product-card");

    const observer =
    new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },{threshold:.15});

    cards.forEach((card,index)=>{

        card.style.transition =
        `all .6s ease ${index * 0.1}s`;

        observer.observe(card);

    });

});

// ======================
// Firebase
// ======================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// =====================================
// PASTE YOUR FIREBASE CONFIG HERE
// =====================================

const firebaseConfig = {
  apiKey: "AIzaSyATzgQn8NGeKhg9HtVDH9EnAYr6LNVdJzQ",
  authDomain: "shrisha-construction.firebaseapp.com",
  projectId: "shrisha-construction",
  storageBucket: "shrisha-construction.firebasestorage.app",
  messagingSenderId: "446076291988",
  appId: "1:446076291988:web:1365a93b2c2269794a1d81",
  measurementId: "G-FSN4WBQQMN"
};

const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);


// =====================================
// FORM SUBMIT
// =====================================

const quoteForm =
document.getElementById("scsQpForm");

quoteForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const submitBtn =
    document.querySelector(".scsQp-submit");

    submitBtn.disabled = true;

    try{

        await addDoc(
            collection(db,"quotes"),
            {

                name:
                document.getElementById("scsQpName").value,

                phone:
                document.getElementById("scsQpPhone").value,

                email:
                document.getElementById("scsQpEmail").value,

                service:
                document.getElementById("scsQpService").value,

                location:
                document.getElementById("scsQpLocation").value,

                message:
                document.getElementById("scsQpMessage").value,

                status:"Pending",

                createdAt:
                serverTimestamp()

            }
            
        );

        alert("Quote Request Submitted Successfully");

        quoteForm.reset();

    }
    catch(error){

        console.error(error);

        alert("Error Submitting Form");

    }

    submitBtn.disabled = false;

});