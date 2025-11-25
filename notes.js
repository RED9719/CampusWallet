

renderNotes();

function renderNotes() {
  const noteList = document.getElementById('noteList');
  noteList.innerHTML = '';
  let notes = JSON.parse(localStorage.getItem('notes')) || [];

  notes.forEach((note, index) => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div>
        <span>${note.text}</span>
        <small style="display:block; font-size:12px; color:gray;">${note.timestamp}</small>
      </div>
      <div style="margin-top:8px;">
        <button onclick="editNote(${index})">Edit</button>
        <button onclick="deleteNote(${index})">Delete</button>
      </div>
    `;

    noteList.appendChild(li);
  });
}

function saveNote() {
  const noteText = document.getElementById('noteInput').value.trim();
  if (noteText) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ text: noteText, timestamp: new Date().toLocaleString() });
    localStorage.setItem('notes', JSON.stringify(notes));
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

function editNote(index) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  const newText = prompt("Edit your note:", notes[index].text);
  if (newText !== null && newText.trim() !== "") {
    notes[index].text = newText.trim();
    notes[index].timestamp = new Date().toLocaleString();
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
  }
}

document.getElementById('saveNote').addEventListener('click', saveNote);

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

function startEditNote(index) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  const noteList = document.getElementById('noteList');
  const li = noteList.children[index];

  li.innerHTML = `
    <textarea id="editNoteText${index}" class="edit-note-text">${notes[index].text}</textarea>
    <div class="note-actions">
      <button onclick="saveEditNote(${index})">Save</button>
      <button onclick="renderNotes()">Cancel</button>
    </div>
  `;
}

function saveEditNote(index) {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  const newText = document.getElementById(`editNoteText${index}`).value.trim();

  if (newText) {
    notes[index].text = newText;
    notes[index].timestamp = new Date().toLocaleString();
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
  }
}