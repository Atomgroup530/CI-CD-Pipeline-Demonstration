import {
  createRoommate,
  readRoommate,
  deleteRoommate,
  updateRoommate,
} from "../../../../back-end/roommateListAPI.js";

window.addEventListener("DOMContentLoaded", init);

/** Starts the program, all our function calls
 *  come from our init function
 */
function init() {
  // load the cards in the page with the current list of roommates
  initPage(readRoommate());

  // initialize the form if the user decides to add
  initFormHandler();
}

/** initPage, reads in our roommates from the local storage
 *  creates a new element for each roommate that'll
 *  be present on the page when it is loaded in
 * @param {*} roommates
 */
function initPage(roommates) {
  // find the row element where all of the cards are
  const row = document.querySelector(".row");

  // remove all of the cards except the add button
  while (row.childElementCount > 1) {
    row.removeChild(row.firstElementChild);
  }

  // add a card for each roommate in the list
  roommates.forEach((roommate) => {
    const card = document.createElement("roommate-card");
    card.setAttribute("id", roommate.id);
    card.data = roommate;
    row.insertBefore(card, document.querySelector("#new.item"));
  });

  // initialize the update/delete functionality for when the card is clicked
  updateDelHandler();
}

/** initFormHandler, adds the needed event handlers
 * 	for when the submit button and creates a new roommate
 * 	when it is is clicked and will also brings up a
 *  popup when it is clicked
 */
function initFormHandler() {
  // nodes for the add form, form popup, add, and close buttons
  const addForm = document.querySelector("form.add");
  const addPopup = document.querySelector(".background.add");
  const addBtn = document.querySelector("#new.item");
  const closeBtn = document.getElementById("close-button-1");

  // when submit button is clicked, submit the form and make a new roommate, hide the popup
  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addPopup.style.display = "none";
    createRoommate(new FormData(addForm));
    initPage(readRoommate());
  });

  // when the add button is clicked, show the popup
  addBtn.onclick = function show() {
    addPopup.style.display = "block";
  };

  // when the close button is clicked, hide the popup
  closeBtn.onclick = function close() {
    addPopup.style.display = "none";
  };
}

/** updateDelHandler, handles when a roommate-card gets deleted or updated
 *  will add the updated roommate list to localstorage. Provides a popup where
 *  people can input information for roommate update and delete
 */
function updateDelHandler() {
  // nodes for roommate cards, update form, form popup, delete, save, and close buttons
  const cards = document.querySelectorAll("roommate-card");
  const updateForm = document.querySelector("form.update");
  const updatePopup = document.querySelector(".background.update");
  const delBtn = document.getElementById("delete-button");
  const closeBtn = document.getElementById("close-button-2");

  // creating an event listener for each card
  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      // roommate variables
      const roommates = readRoommate();
      let roommate;

      // grabbing the right specific roommate
      for (let i = 0; i < roommates.length; i++) {
        if (roommates[i].id == event.target.id) {
          roommate = roommates[i];
          break;
        }
      }

      // updating the form HTML to prefill it with the roommate's data
      updateForm.innerHTML = `<fieldset>
				<label for="name">
					Name:
					<input type="text" id="name"  name="name" value = "${roommate.name}" placeholder="First Last" required>
				</label>
			</fieldset>
			<fieldset>
				<label for="birthday">
					Birthday:
					<input type="text" id="birthday"  name="birthday" value = "${roommate.birthday}" placeholder="mm/dd/yyyy" pattern="\\d\\d/\\d\\d/\\d\\d\\d\\d" required>
				</label>
			</fieldset>
			<fieldset>
				<label for="hobbies">
					Hobbies:
					<input type="text" id="hobbies"  name="hobbies" value = "${roommate.hobbies}" placeholder="hobby, hobby, etc.">
				</label>
			</fieldset>
			<fieldset>
				<label for="notes">
					Notes:
					<input type="text" id="notes"  name="notes" value = "${roommate.notes}" placeholder="...">
				</label>
			</fieldset>
			<button type="submit" id="save_button">SAVE</button>`;

      // when submit button is clicked, submit the form and update the roommate, hide the popup
      updateForm.addEventListener("submit", () => {
        updateRoommate(new FormData(updateForm), event.target.id);
        initPage(readRoommate());
      });

      // when the a card is clicked, show the popup
      updatePopup.style.display = "block";

      // when the close button is clicked, hide the popup
      closeBtn.onclick = function close() {
        updatePopup.style.display = "none";
      };

      // when the delete button is clicked, delete the roommate, hide the popup
      delBtn.onclick = function () {
        updatePopup.style.display = "none";
        deleteRoommate(event.target.id);
        initPage(readRoommate());
      };
    });
  });
}
