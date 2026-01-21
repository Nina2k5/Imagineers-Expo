/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
const themeButton = document.getElementById("themeButton");

// Step 2: Write the callback function
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
}

// Step 3: Register a 'click' event listener for the theme button,
//             and tell it to use toggleDarkMode as its callback function
themeButton.addEventListener("click", toggleDarkMode);

let count = 3;
/*** Form Handling ***
  
  Purpose:
  - When the user submits the RSVP form, the name and state they 
    entered should be added to the list of participants.

  When To Modify:
  - [ ] Project 6 (REQUIRED FEATURE)
  - [ ] Project 6 (STRETCH FEATURE) 
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: Add your query for the submit RSVP button here

const addParticipant = (person) => {
    // --- Add the new participant's name to the list ---
  
    const participantsDiv = document.querySelector(".rsvp-participants");
    const newP = document.createElement("p");
    newP.textContent = `✨ ${person.name} from ${person.state} has RSVP'd.`;
    participantsDiv.appendChild(newP);

    // --- Update the counter using the remove-and-append method ---

    // 1. Find and remove the old counter element.
    
    count++;
    const counter = document.getElementById("rsvp-count");
    counter.textContent = `⭐ ${count} people have RSVP'd to this event!`;
  };


/*** Form Validation ***
  
  Purpose:
  - Prevents invalid form submissions from being added to the list of participants.

  When To Modify:
  - [ ] Project 7 (REQUIRED FEATURE)
  - [ ] Project 7 (STRETCH FEATURE)
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Any time between / after
***/

// Step 1: We actually don't need to select the form button again -- we already did it in the RSVP code above.

// Step 2: Write the callback function
const validateForm = () => {
  let containsErrors = false;
  let rsvpInputs = document.getElementById("rsvp-form").elements;
  
  let person = {
    name: rsvpInputs[0].value, // accesses and saves value of first input
    email: rsvpInputs[1].value,
    state: rsvpInputs[2].value
  };


  // First pass: validate all inputs
  for (let i = 0; i < rsvpInputs.length; i++) {
    const input = rsvpInputs[i];
    if (input.type !== "submit") {
      if (input.value.trim().length < 2) {
        containsErrors = true;
        input.classList.add("error");
      } else {
        input.classList.remove("error");
      }
    }
  }

  // Special case: email validation
  if (!person.email.includes(".com") || !person.email.includes("@")) {
    containsErrors = true;
    rsvpInputs[1].classList.add("error");
  } else {
    rsvpInputs[1].classList.remove("error");
  }

  // If valid, add participant and then clean up
  if (!containsErrors) {
    addParticipant(person);

    toggleModal(person.name);

    // Clear inputs and error classes
    for (let i = 0; i < rsvpInputs.length; i++) {
      if (rsvpInputs[i].type !== "submit") {
        rsvpInputs[i].classList.remove("error");
        rsvpInputs[i].value = "";
      }
    }
  }
};

const rsvpForm = document.getElementById("rsvp-form");

rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault(); // This will now correctly prevent the page reload
    validateForm();
});
/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/

/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [ ] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

const toggleModal = (person) => {
    const modal = document.getElementById("success-modal");
    const modalText = document.getElementById("modal-text");
    
    // TODO: Update modal display to flex
    modal.style.display = "flex";

    // TODO: Update modal text to personalized message
    modalText.textContent = `Thanks for RSVPing, ${person}! We can't wait to see you at the event!`;

    let intervalId = setInterval(animateImage, 500);

    const closeModalBtn = document.getElementById("closeModalBtn");

  // Function to close modal
  function closeModal() {
      modal.style.display = "none";
      clearInterval(intervalId); // stop animation

      // Set modal timeout to 5 seconds

  }

  // Add click listener
  closeModalBtn.addEventListener("click", closeModal);
  setTimeout(closeModal, 5000);
}

// Animation variables
let rotateFactor = 0;
let modalImage = document.querySelector("#success-modal img"); // select modal image

// Animation function
const animateImage = () => {
    // Toggle between 0 and -10 degrees
    rotateFactor = rotateFactor === 0 ? -10 : 0;

    // Apply rotation to the image
    modalImage.style.transform = `rotate(${rotateFactor}deg)`;
};

let motionEnabled = true;
const reduceMotionBtn = document.getElementById("reduceMotionBtn");

function reduceMotion() {
    motionEnabled = !motionEnabled;
    reduceMotionBtn.textContent = motionEnabled ? "Reduce Motion" : "Enable Motion";
}

reduceMotionBtn.addEventListener("click", reduceMotion);

// When showing modal:
function showModal(person) {
    modalText.textContent = `Thanks for RSVPing, ${person}! We can't wait to see you at the event!`;
    modal.style.display = "block";

    // Only animate if motion is enabled
    if (motionEnabled) {
        intervalId = setInterval(animateImage, 500);
    }

    function closeModal() {
        modal.style.display = "none";
        clearInterval(intervalId); // stop animation
    }

    // Make sure the close button only has one listener
    closeModalBtn.onclick = closeModal;
};

