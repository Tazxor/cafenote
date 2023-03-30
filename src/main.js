const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});


addNoteButton.addEventListener("click", () => addNote());
//ici on recupere la note 
function getNotes() {
  return JSON.parse(localStorage.getItem("cafenote") || "[]");
}
//

//ici on saugarde les notes sur le local storage 
function saveNotes(notes) {
  localStorage.setItem("cafenote", JSON.stringify(notes));
}
//

//ici on crée la note 
function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "note vide";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });
//ici on demande de supprimer 
  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "souhaitez vous supprimer la note ?"
    );
//ici on utilise deleteNote pour supprimer la note 
    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}


// genere un id aleatoire 
function addNote() {
  const notes = getNotes();
  const noteObject = {
    // 
    id: Math.floor(Math.random() * 1000000),
    content: ""
  };
//
//
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
//
//
  notes.push(noteObject);
  saveNotes(notes);
}
// ici on update les notes 
function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}
// ici on supprime la note 
function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}
