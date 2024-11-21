import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getRedirectResult, signInWithPopup, GithubAuthProvider, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { doc, deleteDoc, getFirestore, collection, addDoc, query, where, getDocs, getDoc, setDoc, documentId } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";




const auth = getAuth();
const db = getFirestore(app);

// subscript of https://github.com/sillyangel/playmusic/commit/ddeab620d5b6c76034edf26605caad56d7d07ef6#diff-515e869d34abbd1ae3372e11ec6c3b8d9647826ec16f9a18a3e2180fb33a055b






}
function handleresetpassword(event) {
  event.preventDefault();
  const email = ResetEmail.value; // Assuming you have an element with id "emailforreset"
  
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent. Check your inbox.");
    })
    .catch((error) => {
      alert("Error sending password reset email: " + error.message);
    });
}



// create playlist in firesotre
async function createPlaylistInFirestore() {
  const nameofplaylist = prompt("Name of new playlist?");
  const urltonewplaylistimg = prompt("URL for the playlist image");
  const user = auth.currentUser;
  if (nameofplaylist && urltonewplaylistimg) {
    // Check the user's authentication status using your preferred method

    if (user.uid) {
      // Replace 'userId123' with the actual user ID or identifier
      const userId = user.uid;

      const playlistData = {
        name: nameofplaylist,
        imageUrl: urltonewplaylistimg,
        // Add more properties as needed
      };

      const playlistsCollection = collection(db, "playlists");

      try {
        await addDoc(playlistsCollection, {
          userId: userId,
          data: playlistData,
        });
        alert("Playlist data saved in Firestore.");
        // Optionally, you can reload the page or update the UI here
      } catch (error) {
        alert("Error adding playlist data: " + error.message);
      }
    } else {
      alert("You need to be logged in to create a playlist.");
    }
  }
}





 // Check for user authentication when the page is loaded
 
 // Firebase initialization code (already defined)
 
 // Check for user authentication when the page is loadedMake sure 'app' is properly initialized

 auth.onAuthStateChanged(async (user) => {
   if (user) {
     // User is authenticated
     const userId = user.uid;
     // Check if the user has a playlist (assuming you have a 'playlists' collection)
     const playlistsCollection = collection(db, "playlists");
     const q = query(playlistsCollection, where("userId", "==", userId));
     try {
       const querySnapshot = await getDocs(q);
       if (!querySnapshot.empty) {
         // User has a playlist, load and display it
         querySnapshot.forEach((doc) => {
           const playlistData = doc.data();

          //  console.log("Loaded playlist:", playlistData);
         });
         playlistdatathn(user);         
       } else {
         // User doesn't have a playlist
         console.log("User doesn't have a playlist.");
       }
     } catch (error) {
       console.error("Error checking for playlist:", error);
     }
   } else {
     // User is not authenticated
     console.log("User is not authenticated.");
   }
 });

 // read the playlist data
async function playlistRead(user) {
  if (user) {
    const userId = user.uid;
    const playlistsCollection = collection(db, "playlists");
    const q = query(playlistsCollection, where("userId", "==", userId));
    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const playlistData = doc.data().data;
          const playlistName = playlistData.name;

          // create var for each thing on the playlist page
          const playlistpage = document.getElementById("playlistpage")
          const namepp = document.getElementById("h2pp")
          const playlistimage = document.getElementById("imagepp") 
          const creatorofplaylist = document.getElementById("artistpp");
          // const tracklist = document.getElementById("trackalbumpp")
          console.log(playlistData)
          namepp.innerHTML = playlistData.name;
          
          // user display name exist use it if not use email
          creatorofplaylist.innerHTML = "Created by: " + (user.displayName ? user.displayName : user.email);
          playlistimage.src = playlistData.imageUrl;
          playlistimage.alt = playlistName;

          // Button Creaton
          const showPlaylistButton = document.createElement("button");
          const buttonpimage = document.createElement("img");
          buttonpimage.src = playlistData.imageUrl;
          buttonpimage.alt = playlistName;
          showPlaylistButton.addEventListener("click", () => {
            playlistpage.style.display = "block"; // Show the selected playlist div
            document.getElementById("lilbrary").style.display = "none"; // Hide the library
          });
          showPlaylistButton.appendChild(buttonpimage);
          playlistContainer.appendChild(showPlaylistButton);

        });
      } else console.log("User doesn't have a playlist.");
    } catch (error) {
      console.error("Error checking for playlist:", error);
    }
  } else {
    console.log("User is not authenticated.");
  }};



// Profile Functions
async function updateProfileWithFormData() {
  const displayNameV = document.getElementById("displayname").value;
  const photoURLV = document.getElementById("PhotoUrl").value;

  let profileData = {};

  if (displayNameV) {
    profileData.displayName = displayNameV;
  }

  if (photoURLV) {
    profileData.photoURL = photoURLV;
  }

  updateProfile(auth.currentUser, profileData)
    .then(() => {
      alert("Updated Profile Details");
    })
    .catch((error) => {
      alert("a error happened when updatingProfile out ", error.message);
    });
}
savebutton.onclick = updateProfileWithFormData;