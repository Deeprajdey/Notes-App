import { v4 as uuidv4 } from "uuid";
import * as moment from "moment";
("use strict");
let sortedNotesState = {
  sortBy: "alphabet"
};

// Notes data
function userJSONNotesArr() {
  try {
    let output = localStorage.getItem("notes");
    if (output === "" || output === null) {
      return [];
    } else {
      return JSON.parse(output);
    }
  } catch (e) {
    return [];
  }
}

//Add notes
function addingNotesFunc(notesArr, newNote, desc) {
  let timestamp = moment().valueOf();
  let myNote = {
    id: uuidv4(),
    title: newNote,
    description: desc,
    createdAt: timestamp,
    updatedAt: timestamp
  };
  notesArr.unshift(myNote);
  let localData = JSON.stringify(notesArr);
  localStorage.setItem("notes", localData);
  location.hash = myNote.id;
  location.assign("./edit.html" + location.hash);
}

function removeNote(notesArr, id) {
  let index = notesArr.findIndex(notes => {
    return notes.id === id;
  });
  if (index !== -1) {
    notesArr.splice(index, 1);
  }
  let localData = JSON.stringify(notesArr);
  localStorage.setItem("notes", localData);
  displayNotes(notesArr);
}

//Updating Notes Title
function updatingNotesTitleFunc(notesArr, newNote, title, timestamp) {
  newNote.title = title;
  newNote.updatedAt = timestamp;
  let localData = JSON.stringify(notesArr);
  localStorage.setItem("notes", localData);
}
//Updating Notes Desc

function updatingNotesDescFunc(notesArr, newNote, desc, timestamp) {
  newNote.description = desc;
  newNote.updatedAt = timestamp;
  let localData = JSON.stringify(notesArr);
  localStorage.setItem("notes", localData);
}
// Notes Functions
function filterNotes(notesArr, query) {
  return notesArr.filter(note => {
    let isTitle = note.title.toLowerCase().includes(query.toLowerCase());
    let isDesc = note.description.toLowerCase().includes(query.toLowerCase());
    return isTitle || isDesc;
  });
}

function sortedNotes(notesArr, sortBy) {
  if (sortBy === "alphabet") {
    let sortedArr = notesArr.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedArr;
  } else if (sortBy === "recent") {
    let sortedArr = notesArr.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedArr;
  } else if (sortBy === "last") {
    let sortedArr = notesArr.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
    return sortedArr;
  }
}

//hashValueMatching Function
function hashValueMatching(notesArr, value) {
  return notesArr.find(note => {
    return note.id === value;
  });
}

// Updated Timestamp function
function updatedTimestampFunc() {
  return moment().valueOf();
}

function displayNotes(arr) {
  noteContent.textContent = "";
  let sortedArr = sortedNotes(arr, sortedNotesState.sortBy);
  if (sortedArr.length >= 1) {
    sortedArr.forEach(note => {
      //Elements
      let noteEl = document.createElement("a");
      let setStatus = document.createElement("p");
      let noteCreate = document.createElement("p");

      //Elements Contents

      noteEl.setAttribute("href", `./edit.html#${note.id}`);
      noteEl.classList.add("list-item");
      noteCreate.textContent = note.title;
      noteCreate.classList.add("list-item__title");
      setStatus.textContent = moment(note.updatedAt).fromNow();
      setStatus.classList.add("list-item__subtitle");

      //append contents
      noteContent.appendChild(noteEl);
      noteEl.appendChild(noteCreate);
      noteEl.appendChild(setStatus);
    });
  } else {
    let noNotesMsgNode = document.createElement("p");
    noNotesMsgNode.textContent = "No Notes to display";
    noNotesMsgNode.classList.add("empty-message");
    noteContent.appendChild(noNotesMsgNode);
  }

  return true;
}

export {
  userJSONNotesArr,
  addingNotesFunc,
  removeNote,
  updatingNotesTitleFunc,
  updatingNotesDescFunc,
  filterNotes,
  hashValueMatching,
  updatedTimestampFunc,
  displayNotes,
  sortedNotesState as default
};
