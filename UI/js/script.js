const BASE_URL = "http://192.168.0.108:6969/api";

// ---------- NAV ----------
function goLogin() { window.location = "login.html"; }
function goSignup() { window.location = "signup.html"; }
function logout() {
  localStorage.clear();
  window.location = "index.html";
}

// ---------- SIGNUP ----------
function signup() {
  fetch(BASE_URL + "/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: suUser.value,
      password: suPass.value,
      email: suEmail.value
    })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || "Signup Success");

      setTimeout(() => {
        window.location.href = "login.html";
      }, 500); // small delay
    })
    .catch(() => alert("Server Error"));
}


// ---------- LOGIN ----------
function login() {
  const usernameEl = document.getElementById("username");
  const passwordEl = document.getElementById("password");

  fetch(BASE_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: usernameEl.value,
      password: passwordEl.value
    })
  })
    .then(r => r.json())
    .then(data => {
      if (data.role === "admin") {
        window.location = "admin.html";
      } else {
        localStorage.setItem("user", data.user.username);
        localStorage.setItem("userId", data.user.id);
        window.location = "user.html";
      }
    });
}

// ================= ADMIN =================

let editId = null;

function loadUsers() {
  fetch(BASE_URL + "/users")
    .then(r => r.json())
    .then(data => {
      const tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";

      data.forEach(u => {
        tableBody.innerHTML += `
        <tr>
          <td>${u.id}</td>
          <td>${u.username}</td>
          <td>${u.email}</td>

          <td>
            <button onclick="editUser(${u.id},'${u.username}','${u.email}')">Edit</button>
            <button onclick="deleteUser(${u.id})">Delete</button>
          </td>
        </tr>`;
      });
    });
}

// ADD USER (FIXED)
function addUser() {
  fetch(BASE_URL + "/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: empName.value,
      password: "123",
      email: empEmail.value
    })
  })
    .then(r => r.json())
    .then(d => {
      alert(d.message);
      empName.value = "";
      empEmail.value = "";
      loadUsers();   // refresh table only
    });
}



function editUser(id, n, e) {
  editId = id;

  document.getElementById("empName").value = n;
  document.getElementById("empEmail").value = e;

  document.getElementById("addBtn").style.display = "none";
  document.getElementById("updateBtn").style.display = "block";
  document.getElementById("cancelBtn").style.display = "block"; // IMPORTANT
}



function updateUser() {
  if (!editId) { alert("Select user first"); return; }

  const empName = document.getElementById("empName");
  const empEmail = document.getElementById("empEmail");

  fetch(BASE_URL + "/users/" + editId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: empName.value,
      email: empEmail.value
    })
  })
    .then(r => r.json())
    .then(d => {
      alert(d.message);

      editId = null;
      empName.value = "";
      empEmail.value = "";

      // BUTTON RESET
      document.getElementById("addBtn").style.display = "block";
      document.getElementById("updateBtn").style.display = "none";
      document.getElementById("cancelBtn").style.display = "none"; // MISSING
      loadUsers();
    });
}

function cancelEdit() {
  editId = null;

  document.getElementById("empName").value = "";
  document.getElementById("empEmail").value = "";

  document.getElementById("addBtn").style.display = "block";
  document.getElementById("updateBtn").style.display = "none";
  document.getElementById("cancelBtn").style.display = "none";
}




function deleteUser(id) {
  fetch(BASE_URL + "/users/" + id, { method: "DELETE" })
    .then(loadUsers);
}

// ================= USER =================

function loadProfile(){
  const uname = localStorage.getItem("user");

  fetch(BASE_URL + "/users/" + uname)
    .then(r=>r.json())
    .then(d=>{
      viewUsername.innerText = d.username;
      viewEmail.innerText = d.email;

      uName.value = d.username;
      uEmail.value = d.email;
    });
}

function showOptions(){
  viewSection.style.display="none";
  optionSection.style.display="block";
}


function showProfileForm(){
  optionSection.style.display="none";
  profileSection.style.display="block";
}

function updateProfile(){
  const id = localStorage.getItem("userId");

  fetch(BASE_URL + "/users/"+id,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      username:uName.value,
      email:uEmail.value
    })
  })
  .then(r=>r.json())
  .then(d=>{
    alert(d.message);
    cancelAll();
    loadProfile();
  });
}
function showPasswordForm(){
  optionSection.style.display="none";
  passwordSection.style.display="block";
}

function updatePassword(){
  const id = localStorage.getItem("userId");

  if(newPass.value !== confirmPass.value){
    alert("Passwords do not match");
    return;
  }

  fetch(BASE_URL + "/users/password/"+id,{
    method:"PUT",
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify({
      password:newPass.value
    })
  })
  .then(r=>r.json())
  .then(d=>{
    alert(d.message);
    cancelAll();
  });
}

function cancelOption(){
  optionSection.style.display="none";
  viewSection.style.display="block";
}

function cancelAll(){
  profileSection.style.display="none";
  passwordSection.style.display="none";
  optionSection.style.display="none";
  viewSection.style.display="block";
}



// ---------- AUTO LOAD ----------
if (window.location.pathname.includes("admin.html")) loadUsers();
if (window.location.pathname.includes("user.html")) loadProfile();
