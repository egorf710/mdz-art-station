// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiUU8fNzQFBMXyduGL_WcQ2cH0YJqf3-Y",
  authDomain: "mdzr-art-station.firebaseapp.com",
  databaseURL: "https://mdzr-art-station-default-rtdb.firebaseio.com",
  projectId: "mdzr-art-station",
  storageBucket: "mdzr-art-station.appspot.com",
  messagingSenderId: "874459410781",
  appId: "1:874459410781:web:2608cb365e41a1b002b8b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

var cur_user = auth.currentUser;

var userHasAuth = false;

onAuthStateChanged(auth, user =>{
    if(user != null){
      cur_user = user;
      userHasAuth = true;      
      OpenProfile(true);
    }else{
      userHasAuth = false;
      OpenProfile(false);
    }
})

//set(ref(database, '/posts/'+ user.uid +'/likes/' + _uid), true);

const elementSignOut = document.getElementById('SignOutButton');
elementSignOut.onclick = function () {
  auth.signOut();
};

function OpenProfile(b) {

  if(b)
  {
      document.getElementsByClassName("sing")[0].style.display = "none";
      document.getElementsByClassName("profile")[0].style.display = "block";
  }
  else
  {
      document.getElementsByClassName("sing")[0].style.display = "block";
      document.getElementsByClassName("profile")[0].style.display = "none";
  }
}

function SignInUser(form){
  var email = form.email.value;
  var password = form.log_password.value;


  signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
  });

}

function RegUser(username, email, pass){
  createUserWithEmailAndPassword(auth, email, pass)
  .then((userCredential) => {
   // Signed in 
    const user = userCredential.user;

    set(ref(database, 'users/' + user.uid),{
      username: username,
      email: email,
      reputation: 0,
    });

    

    alert('user created! ' + user.uid);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert(errorMessage);
  // ..
  });
}

function RegisterNewUser(form)
{
    if(IsRegisterValid(form))
    {
        var user_name = form.user_name.value;
        var email = form.email.value;
        var reg_password = form.reg_password.value;
        var reg_c_password = form.reg_c_password.value;

        RegUser(user_name, email, reg_password);

        alert("user has registered");

    }
}

function IsRegisterValid(form)
{
    var user_name = form.user_name.value;
    var email = form.email.value;
    var reg_password = form.reg_password.value;
    var reg_c_password = form.reg_c_password.value;
    
    if(user_name.length < 4)
    {
        alert("min user name length is 4");
        return false;
    }
    if(reg_password.length < 8)
    {
        alert("min password length is 8");
        return false;
    }
    if(reg_password != reg_c_password)
    {
        alert("passwords don't match");
        return false;
    }

    return true;
}
document.forms.sign_up.onsubmit = function() {
    RegisterNewUser(this);
  };

  document.forms.sign_in.onsubmit = function() {
    SignInUser(this);
  };