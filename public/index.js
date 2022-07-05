//console.log('Hello! from index.js');


// Import the functions you need from the SDKs you need
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import { getDatabase, ref, set, get, onValue, child, update, push} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdMuVVZKXm9zcC3YjB6Tt0SyqCdbPkrnI",
    authDomain: "test-project-6f3b6.firebaseapp.com",
    databaseURL: "https://test-project-6f3b6-default-rtdb.firebaseio.com",
    projectId: "test-project-6f3b6",
    storageBucket: "test-project-6f3b6.appspot.com",
    messagingSenderId: "556179870515",
    appId: "1:556179870515:web:95942af7e734c810236446"
  };

window.addEventListener('DOMContentLoaded', function () {
        init();
        
    });

function init () {

  // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      const auth = getAuth(app);
      //console.log("init started");
      var user;
      const loginButton = document.getElementById("loginBtn");

      loginButton.addEventListener("click", function () {
            const userEmail = document.getElementById('email').value;
            const userPassword = document.getElementById('password').value;
            register(userEmail, userPassword);
      });
      
      //login skip
      //document.getElementById('loginSkip').addEventListener("click", function () {register('crbs1234@gmail.com', 'curtisBrauner');});

      function login (email, password) {
        console.log('signing in ' + email);
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
          user = userCredential.user;
          console.log('signed in ' + user.email);
          signedIn ();
          console.log(user);
            })
          .catch((INVALID_PASSWORD) => {
            alert('Wrong Password, please try again');
            document.getElementById('password').value = "";
          })
          .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            const errorMessage = error.message;
            console.log(errorMessage);
        });
      }

      function register (email, password) {
        if (email == "signedIn@email.com") {
          logout();
        } else {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          //signed in
          user = userCredential.user;
          console.log('new user ' + user.email);
          signedIn ();
        })
        .catch((EMAIL_EXISTS) => {
          login (email, password);
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          console.log(errorMessage);
        });
        if (email == "crbs1234@gmail.com") {
          admin(true);
        }
       }}

      function logout () {
        console.log('signing out');
        const email = user.email;
        signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log('signed out ' + email);
          signedOut ();
        }).catch((error) => {
          // An error happened.
          const errorCode = error.code;
          console.log(errorCode);
          const errorMessage = error.message;
          console.log(errorMessage);
        });
        admin(false);
      }

     
      
      admin(false);
      

      //adds test data (if needed)
      function addTestData (){
        get(ref(db, '/blurbTest')).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
          } else {
            console.log("No data available");
            set(ref(db, '/blurbTest'),{
              'testPage':{
              'name':'test page',
              'blurbs': 'contents'
              },
              'blurb1':{
              'content':"TEST",
              'toUse':true
              },
              'blurb2':{
              'content':"TESt TEST",
              'toUse':true
              }
            });
          }
        }).catch((error) => {
          console.error(error);
        });
      }

      
      //removes sign in options if signed it
      function signedIn (){
        document.getElementById('email').style.display = 'none';
          document.getElementById('email').value = 'signedIn@email.com';
        document.getElementById('emailLbl').style.display = 'none';
        document.getElementById('password').style.display = 'none';
          document.getElementById('password').value = 'signedIn';
        document.getElementById('passwordLbl').style.display = 'none';
        document.getElementById('loginFormLgd').innerHTML = '';
        document.getElementById('loginHdr').innerHTML = 'Logout';
        document.getElementById('loginBtn').value = 'Logout';
      }
      //shows sign in options if signed out
      function signedOut (){
        document.getElementById('email').style.display = 'initial';
          document.getElementById('email').value = '';
        document.getElementById('emailLbl').style.display = 'initial';
        document.getElementById('password').style.display = 'initial';
          document.getElementById('password').value = '';
        document.getElementById('passwordLbl').style.display = 'initial';
        document.getElementById('loginFormLgd').innerHTML = 'Login';
        document.getElementById('loginHdr').innerHTML = 'Login';
        document.getElementById('loginBtn').value = 'Login';
      }

      //shows admin options if user is Curtis 
      function admin(admin) {
        if (admin == true) {
          console.log('admin logged in');
          document.getElementById('adminNav').style = 'display:inline';
        } else if (admin == false) {
          console.log('no admin logged in');
          document.getElementById('adminNav').style = 'display:none';
          document.getElementById('admin').style = 'display:none';
        }
      }
      //fills in active blurbs on site
      

      function makeElements (newEl, id, inHTML, name, clss, rand, randVal, rand2, rand2Val) {
        if (id != undefined) {newEl.setAttribute('id', id); }
        if (inHTML != undefined) {newEl.innerHTML = inHTML; }
        if (name != undefined) {newEl.setAttribute('name', name); }
        if (clss != undefined) {newEl.setAttribute('class', clss); }
        if (rand != undefined) {newEl.setAttribute(rand, randVal); }
        if (rand != undefined) {newEl.setAttribute(rand2, rand2Val); }
      }

      

      

}