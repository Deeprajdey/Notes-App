import {
  displayFilterNotes,
  displaySortedNotes,
  noteContent,
  notesArr,
  addNoteButton
} from "./notesElements";
import sortedNotesState, {
  filterNotes,
  displayNotes,
  addingNotesFunc
} from "./notesFunction";
("use strict");
// Main-Content

//Filtering Notes
displayFilterNotes.addEventListener("input", e => {
  let query = e.target.value;
  let searchArray = filterNotes(notesArr, query);
  noteContent.textContent = "";
  displayNotes(searchArray);
});

//Sorting Notes

displaySortedNotes.addEventListener("change", e => {
  sortedNotesState.sortBy = e.target.value;
  displayNotes(notesArr);
});

//Display Notes
displayNotes(notesArr);

//Adding new Note
addNoteButton.addEventListener("click", e => {
  let newNotes = "";
  let desc = "";
  if (newNotes === "") {
    addingNotesFunc(notesArr, newNotes, desc);
    displayNotes(notesArr);
    newNotes = "";
  }
});

// window Sync
window.addEventListener("storage", e => {
  if (e.key === "notes") {
    let notesArr = JSON.parse(e.newValue);
    let localData = JSON.stringify(notesArr);
    localStorage.setItem("notes", localData);
    displayNotes(notesArr);
  }
});
