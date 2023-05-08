// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiUU8fNzQFBMXyduGL_WcQ2cH0YJqf3-Y",
  authDomain: "mdzr-art-station.firebaseapp.com",
  projectId: "mdzr-art-station",
  storageBucket: "mdzr-art-station.appspot.com",
  messagingSenderId: "874459410781",
  appId: "1:874459410781:web:2608cb365e41a1b002b8b4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

onAuthStateChanged(auth, user =>{
    if(user != null){
        alert('loggen in!');
    }else{
        alert('No user');
    }
})

function openCity(evt, cityName) {
    var i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(cityName).style.display = "block";
    if(evt != null)
    {
        evt.currentTarget.className += " active";
    }
}

function openProfile() {

    if(userHasAuthorized)
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

function IsRegistered()
{
    if(IsRegisterValid())
    {
        document.forms.sign_up.onsubmit = function() {
            var user_name = this.user_name.value;
            var email = this.email.value;
            var reg_password = this.reg_password.value;

            

          };
    }
    return false;
}

function IsRegisterValid()
{
    document.forms.sign_up.onsubmit = function() {
        var user_name = this.user_name.value;
        var email = this.email.value;
        var reg_password = this.reg_password.value;
        var reg_c_password = this.reg_c_password.value;
        
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
      };
}