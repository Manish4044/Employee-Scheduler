import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { ref, getDownloadURL, uploadBytesResumable, getStorage } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
import { getFirestore,collection, onSnapshot,arrayUnion,arrayRemove,doc, updateDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAySzOQgBqnidWuq0CcMBCcC2AXmL6ZOfs",
    authDomain: "queueme-c58c1.firebaseapp.com",
    projectId: "queueme-c58c1",
    storageBucket: "queueme-c58c1.appspot.com",
    messagingSenderId: "787143636531",
    appId: "1:787143636531:web:c543ff1abd021b1513d546"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export const uploadFiles = async (data) => {
    if (!data.doc) return;
    const storageRef = ref(storage, `files/${data.doc.file.name}.pdf`);
    const uploadTask = uploadBytesResumable(storageRef, data.doc.file);
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
            console.log(downloadURL);
            console.log(data.doc);
            submitDocData(data.doc,data.id,downloadURL);
        });
    });
};

export async function getUserWithEmail(email)
{
    const q = query(collection(db, "users"), where("email", "==", email));
    let res = {};
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        res = {id:doc.id,...doc.data()}
    });
    return res;
}

export async function submitLeaveData(data,user_id){
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

export async function submitDocData(data,user_id,url){
    if(!data.file)
        return new Error("Pass doc url");
    // const docRef = doc(db, "users", "AjDiqZMuOXboRmVeWlFi");
    const docRef = doc(db, "users", user_id);

    console.log(data);
    await updateDoc(docRef, {
        documents: arrayRemove(data)
    });
    
    data.file=url;
    
    console.log(data);
    await updateDoc(docRef, {
        documents: arrayUnion(data)
    });
    console.log("Done");
}

export const userSnapshot = function(){
    return onSnapshot(doc(db, "users",'AjDiqZMuOXboRmVeWlFi'), (doc) => {
        const data = doc.data(); 
        console.log(data);
    });
}
