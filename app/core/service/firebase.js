import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { ref, getDownloadURL, uploadBytesResumable, getStorage } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
import { getFirestore,collection,arrayUnion,setDoc,doc, updateDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB2qCblBPBwagMMDemIbu0AMflTsxVLC4k",
    authDomain: "queueme-1a08c.firebaseapp.com",
    projectId: "queueme-1a08c",
    storageBucket: "queueme-1a08c.appspot.com",
    messagingSenderId: "595267154558",
    appId: "1:595267154558:web:1ab07fcf235b147f2a1e2f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}.jpg`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
    "state_changed",
    (snapshot) => {
        const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
		console.log(prog);
    },
    (error) => console.log(error),
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        });
    }
    );
};

async function getUserWithEmail(email)
{
    const q = query(collection(db, "users"), where("email", "==", email));
    let res = {};
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        res = {id:doc.id,...doc.data()}
    });
    return res;
}

async function submitLeaveData(data,user_id){
    if(!data)
        return new Error("Pass form data");
    console.log(data);
    // const docRef = doc(db, "users", "AjDiqZMuOXboRmVeWlFi");
    const docRef = doc(db, "users", user_id);

    await updateDoc(docRef, {
        leaves: arrayUnion(data)
    });
    console.log("Done");
}

export { storage, app, uploadFiles, submitLeaveData, getUserWithEmail };