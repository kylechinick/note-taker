import $ from 'jquery';
import './css/styles.css';

let noteBook = new NoteBook();

// Business Logic for NoteBook ---------
function NoteBook() {
  this.entries = {};
  this.currentId = 0;
}

NoteBook.prototype.addNote = function (note) {
  note.id = this.assignId();
  this.entries[note.id] = note;
};

NoteBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

NoteBook.prototype.findNote = function (id) {
  if (this.entries[id] != undefined) {
    return this.entries[id];
  }
  return false;
};

NoteBook.prototype.deleteNote = function (id) {
  if (this.entries[id] === undefined) {
    return false;
  }
  delete this.entries[id];
  return true;
};

// Business Logic for Notes ---------
function Note(title, date, topic, content) {
  this.title = title;
  this.date = date;
  this.topic = topic;
  this.content = content;
}

Note.prototype.title = function () {
  return this.title;
};

// User Interface Logic ---------


function displayNoteDetails(NoteBookToDisplay) {
  let entriesList = $("ul#entries");
  let htmlForNoteInfo = "";
  Object.keys(NoteBookToDisplay.entries).forEach(function (key) {
    const note = NoteBookToDisplay.findNote(key);
    htmlForNoteInfo += "<li id=" + note.id + ">" + note.title + " " + "</li>";
  });
  entriesList.html(htmlForNoteInfo);
}

function showNote(noteId) {
  const note = noteBook.findNote(noteId);
  $("#show-note").toggle();
  $(".title").html(note.title);
  $(".date").html(note.date);
  $(".topic").html(note.topic);
  $(".content").html(note.content);

  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + note.id + ">Delete</button>");
}

function saveEdits() {

  const editElem = document.getElementById("edit");
  const userVersion = editElem.innerHTML;
  localStorage.userEdits = userVersion;
  document.getElementById("update").innerHTML = "Edits saved!";
}

function checkEdits() {
  if (localStorage.userEdits != null)
    document.getElementById("edit").innerHTML = localStorage.userEdits;
}

function attachContactListeners() {
  $("ul#entries").on("click", "li", function () {
    showNote(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    noteBook.deleteNote(this.id);
    $("#show-note").hide();
    displayNoteDetails(noteBook);
  });
}


$(document).ready(function () {

  $("button#default-btn").click(function () {
    $("body").removeClass();
    $("body").addClass("default");
  });

  $("button#leopard-btn").click(function () {
    $("body").removeClass();
    $("body").addClass("leopard");
  });

  $("button#lisa-btn").click(function () {
    $("body").removeClass();
    $("body").addClass("lisa");
  });
  attachContactListeners();
  $("form#new-note").submit(function (event) {
    event.preventDefault();
    console.log(noteBook);
    const inputtedTitle = $("input#new-title").val();
    const inputtedDate = $("input#new-date").val();
    const inputtedTopic = $("select#new-topic").val();
    const inputtedContent = $("#new-content").val();
    console.log(inputtedContent);
    $("input#new-title").val("");
    $("input#new-date").val("");
    $("input#new-topic").val("");
    $("input#new-content").val("");

    const newNote = new Note(inputtedTitle, inputtedDate, inputtedTopic, inputtedContent);
    noteBook.addNote(newNote);
    displayNoteDetails(noteBook);
    checkEdits(this.id);
    saveEdits(this.id);

  });
});
