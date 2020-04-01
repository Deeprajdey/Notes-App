import {
  noteTitleId,
  editingNote,
  noteDescId,
  updatedSpan,
  notesArr,
  removeNotesButton
} from "./notesElements";
import {
  updatedTimestampFunc,
  updatingNotesTitleFunc,
  updatingNotesDescFunc,
  hashValueMatching
} from "./notesFunction";
import * as moment from "moment";
("use strict");
noteTitleId.value = editingNote.title;
noteDescId.value = editingNote.description;
if (editingNote.createdAt != editingNote.updatedAt) {
  updatedSpan.textContent = `Last edited ${moment(
    editingNote.updatedAt
  ).fromNow()}`;
}
noteTitleId.addEventListener("input", e => {
  let title = e.target.value;
  let timestamp = updatedTimestampFunc();
  updatedSpan.textContent = `Last edited ${moment(timestamp).fromNow()}`;
  updatingNotesTitleFunc(notesArr, editingNote, title, timestamp);
});
noteDescId.addEventListener("input", e => {
  let desc = e.target.value;
  let timestamp = updatedTimestampFunc();
  updatedSpan.textContent = `Last edited ${moment(timestamp).fromNow()}`;
  updatingNotesDescFunc(notesArr, editingNote, desc, timestamp);
});

//Remove button

removeNotesButton.addEventListener("click", e => {
  let index = notesArr.findIndex(notes => {
    return notes.id === editingNote.id;
  });
  if (index !== -1) {
    notesArr.splice(index, 1);
  }
  let localData = JSON.stringify(notesArr);
  localStorage.setItem("notes", localData);
  location.assign("./index.html");
});

window.addEventListener("storage", e => {
  if (e.key === "notes") {
    let notesArr = JSON.parse(e.newValue);
    let editingNote = hashValueMatching(notesArr, hashValue);
    noteTitleId.value = editingNote.title;
    noteDescId.value = editingNote.description;
    let timestamp = updatedTimestampFunc();
    updatedSpan.textContent = `Last edited ${moment(timestamp).fromNow()}`;
    let localData = JSON.stringify(notesArr);
    localStorage.setItem("notes", localData);
  }
});
