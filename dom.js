
// WEEK 5: DOM MANIPULATION PRACTICE

// TASK 9.1: SELECTING ELEMENTS

const header = document.getElementById("main-header");
console.log("getElementById:", header);

const contents = document.getElementsByClassName("content");
console.log("getElementsByClassName:", contents);

const paragraphs = document.getElementsByTagName("p");
console.log("getElementsByTagName:", paragraphs);

const firstLink = document.querySelector(".nav-link");
console.log("querySelector:", firstLink);

const allLinks = document.querySelectorAll(".nav-link");
console.log("querySelectorAll:", allLinks);

// Practice selections
console.log("H1:", document.querySelector("h1"));
console.log("Content elements:", document.querySelectorAll(".content"));
console.log("Contact form:", document.getElementById("contact-form"));
console.log("Email input:", document.getElementById("email"));
console.log("Navigation list items:", document.querySelectorAll(".nav-list li"));
console.log("First link:", document.querySelector(".nav-link"));
console.log("Last paragraph:", document.querySelector("footer p"));


// TASK 9.2: TRAVERSING THE DOM

const nav = document.querySelector("nav");

console.log("Nav parent:", nav.parentElement);
console.log("Nav children:", nav.children);
console.log("First child:", nav.firstElementChild);
console.log("Last child:", nav.lastElementChild);

const article = document.querySelector("article");

console.log("Next sibling:", article.nextElementSibling);
console.log("Previous sibling:", article.previousElementSibling);

const navLinks = nav.querySelectorAll("a");
console.log("All navigation links:", navLinks);

// Practice navigation
const selectedHeader = document.getElementById("main-header");
console.log("Nav inside header:", selectedHeader.querySelector("nav"));

const selectedLink = document.querySelector(".nav-link");
console.log("Parent list item:", selectedLink.parentElement);

const selectedArticle = document.querySelector("article");
console.log("Article next sibling:", selectedArticle.nextElementSibling);

const selectedList = document.querySelector(".nav-list");
console.log("List items:", selectedList.children);

const footer = document.querySelector("footer");
console.log("Footer body:", footer.parentElement.parentElement);


// TASK 9.3: MODIFYING CONTENT

const h1 = document.querySelector("h1");

console.log("Original heading:", h1.textContent);

h1.textContent = "Learning DOM Manipulation";

const title = document.querySelector(".title");
title.innerHTML = "My <strong>Practice</strong> Article";

const firstParagraph = document.querySelector(".content");
firstParagraph.textContent = "I am learning how to change page content.";

const secondParagraph = document.querySelectorAll(".content")[1];
secondParagraph.classList.add("highlight");

// Working with attributes
const emailInput = document.getElementById("email");

emailInput.setAttribute("placeholder", "Enter your email address");
console.log("Email placeholder:", emailInput.getAttribute("placeholder"));

// Working with data attributes
const firstNavLink = document.querySelector(".nav-link");
firstNavLink.dataset.section = "home";

console.log("Data section:", firstNavLink.dataset.section);

// Working with styles
h1.classList.add("highlight");


// TASK 9.4: ADDING AND REMOVING ELEMENTS

const newParagraph = document.createElement("p");
newParagraph.textContent = "This paragraph was created using JavaScript.";

document.querySelector("article").appendChild(newParagraph);

// Remove an element
const paragraphToRemove = document.querySelectorAll(".content")[1];
paragraphToRemove.remove();

// Clone an element
const clonedHeader = document.querySelector("header").cloneNode(true);
console.log("Cloned header:", clonedHeader);

// Function to add navigation items
function addNavItem(text) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href = "#";
    link.textContent = text;
    link.classList.add("nav-link");

    listItem.appendChild(link);
    document.querySelector(".nav-list").appendChild(listItem);
}

addNavItem("Projects");


// TASK 10.1: EVENT LISTENERS

const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Contact form submitted!");
});

// Click counter
let clickCount = 0;

h1.addEventListener("click", function() {
    clickCount++;
    console.log("Heading clicked:", clickCount, "times");
});

// Mouse event
h1.addEventListener("mouseover", function() {
    h1.classList.add("highlight");
});

h1.addEventListener("mouseout", function() {
    h1.classList.remove("highlight");
});


// TASK 10.2: EVENT OBJECT AND KEYBOARD EVENTS

document.addEventListener("keydown", function(event) {
    console.log("Key pressed:", event.key);

    if (event.key === "Escape") {
        console.log("Escape key was pressed.");
    }

    if (event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        console.log("Save shortcut detected!");
    }
});


// TASK 10.3: EVENT BUBBLING AND DELEGATION

const navList = document.querySelector(".nav-list");

navList.addEventListener("click", function(event) {
    const link = event.target.closest(".nav-link");

    if (!link) {
        return;
    }

    event.preventDefault();
    console.log("Navigation clicked:", link.textContent);
});


// TASK 10.4: FORM HANDLING AND VALIDATION

function showError(input, message) {
    input.classList.add("highlight");
    console.log(message);
}

function clearError(input) {
    input.classList.remove("highlight");
}

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nameInput = document.getElementById("name");
    const emailField = document.getElementById("email");

    let valid = true;

    if (nameInput.value.trim() === "") {
        showError(nameInput, "Please enter your name.");
        valid = false;
    } else {
        clearError(nameInput);
    }

    if (emailField.value.trim() === "") {
        showError(emailField, "Please enter your email.");
        valid = false;
    } else {
        clearError(emailField);
    }

    if (valid) {
        console.log("Form is valid!");
    }
});
