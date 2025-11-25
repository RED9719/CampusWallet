const curated = [
  { title: "Notion Templates", url: "https://www.notion.so/templates/students" },
  { title: "Buddy4Study Scholarships", url: "https://www.buddy4study.com/" },
  { title: "Study Playlist", url: "https://www.youtube.com/playlist?list=PL..." },
  { title: "Coursera for Students", url: "https://www.coursera.org/" }
];

// Render curated list
const curatedList = document.getElementById('curatedList');
curated.forEach(item => {
  let li = document.createElement('li');
  li.innerHTML = `<a href="${item.url}" target="_blank">${item.title}</a>`;
  curatedList.appendChild(li);
});

// Save resource
function saveResource() {
  const title = document.getElementById('resourceTitle').value.trim();
  const url = document.getElementById('resourceURL').value.trim();
  const category = document.getElementById('resourceCategory').value.trim();

  if (title && url) {
    let resources = JSON.parse(localStorage.getItem('resources')) || [];
    resources.push({ title, url, category, timestamp: new Date().toLocaleString() });
    localStorage.setItem('resources', JSON.stringify(resources));

    // clear inputs
    document.getElementById('resourceTitle').value = '';
    document.getElementById('resourceURL').value = '';
    document.getElementById('resourceCategory').value = '';

    renderResources();
  }
}

// Render resources with edit/delete buttons
function renderResources() {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  let resources = JSON.parse(localStorage.getItem('resources')) || [];

  resources.forEach((res, index) => {
    const li = document.createElement('li');
    li.className = 'resource-item';

    li.innerHTML = `
      <div class="resource-content">
        <strong>${res.title}</strong><br>
        <a href="${res.url}" target="_blank">${res.url}</a>
        <small>${res.category} • ${res.timestamp}</small>
      </div>
      <div class="resource-actions">
        <button onclick="editResource(${index})">Edit</button>
        <button onclick="deleteResource(${index})">Delete</button>
      </div>
    `;

    userList.appendChild(li);
  });
}

// Delete resource
function deleteResource(index) {
  let resources = JSON.parse(localStorage.getItem('resources')) || [];
  resources.splice(index, 1);
  localStorage.setItem('resources', JSON.stringify(resources));
  renderResources();
}

// Inline edit resource
function editResource(index) {
  let resources = JSON.parse(localStorage.getItem('resources')) || [];
  const userList = document.getElementById('userList');
  const li = userList.children[index];

  // Replace content with editable inputs
  li.querySelector('.resource-content').innerHTML = `
    <input type="text" id="editTitle${index}" value="${resources[index].title}" />
    <input type="text" id="editURL${index}" value="${resources[index].url}" />
    <input type="text" id="editCategory${index}" value="${resources[index].category}" />
    <button onclick="saveEdit(${index})">Save</button>
    <button onclick="renderResources()">Cancel</button>
  `;
}

function saveEdit(index) {
  let resources = JSON.parse(localStorage.getItem('resources')) || [];
  const newTitle = document.getElementById(`editTitle${index}`).value.trim();
  const newURL = document.getElementById(`editURL${index}`).value.trim();
  const newCategory = document.getElementById(`editCategory${index}`).value.trim();

  if (newTitle && newURL) {
    resources[index].title = newTitle;
    resources[index].url = newURL;
    resources[index].category = newCategory;
    resources[index].timestamp = new Date().toLocaleString();

    localStorage.setItem('resources', JSON.stringify(resources));
    renderResources();
  }
}

document.getElementById('saveResource').addEventListener('click', saveResource);

// Initial render
renderResources();
showDailySpotlight();