// Initial render
renderNotes();

function renderNotes() {
  const noteList = document.getElementById('noteList');
  noteList.innerHTML = '';
  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="note-content">
        <strong>${note.title}</strong><br>
        <span>${note.text}</span>
        <small>${note.timestamp}</small>
      </div>
      <div class="note-actions">
        <button onclick="startEditNote(${index})">Edit</button>
        <button onclick="deleteNote(${index})">Delete</button>
      </div>
    `;
    noteList.appendChild(li);
  });
}

function saveNote() {
  const noteTitle = document.getElementById('noteCategory').value.trim();
  const noteText = document.getElementById('noteInput').value.trim();

  if (noteTitle && noteText) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({
      title: noteTitle,
      text: noteText,
      timestamp: new Date().toLocaleString()
    });
    localStorage.setItem('notes', JSON.stringify(notes));

    // clear inputs
    document.getElementById('noteCategory').value = '';
    document.getElementById('noteInput').value = '';

    renderNotes();
  }
}

function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
}

function startEditNote(index) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  const noteList = document.getElementById('noteList');
  const li = noteList.children[index];

  li.innerHTML = `
    <input type="text" id="editNoteTitle${index}" value="${notes[index].title}" />
    <textarea id="editNoteText${index}" class="edit-note-text">${notes[index].text}</textarea>
    <div class="note-actions">
      <button onclick="saveEditNote(${index})">Save</button>
      <button onclick="renderNotes()">Cancel</button>
    </div>
  `;
}

function saveEditNote(index) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  const newTitle = document.getElementById(`editNoteTitle${index}`).value.trim();
  const newText = document.getElementById(`editNoteText${index}`).value.trim();

  if (newTitle && newText) {
    notes[index].title = newTitle;
    notes[index].text = newText;
    notes[index].timestamp = new Date().toLocaleString();
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
  }
}

document.getElementById('saveNote').addEventListener('click', saveNote);