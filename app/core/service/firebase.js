import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { ref, getDownloadURL, uploadBytesResumable, getStorage,uploadString } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";
import { getFirestore,collection, onSnapshot,arrayUnion,arrayRemove,doc, updateDoc, query, where, getDocs,getDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAySzOQgBqnidWuq0CcMBCcC2AXmL6ZOfs",
    authDomain: "queueme-c58c1.firebaseapp.com",
    projectId: "queueme-c58c1",
    storageBucket: "queueme-c58c1.appspot.com",
    messagingSenderId: "787143636531",
    appId: "1:787143636531:web:c543ff1abd021b1513d546"
};

// Firebase Configuration
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

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

export const uploadFiles = async (data) => {
    if (!data.doc) return;
    try{
        const storageRef = ref(storage, `files/${Math.random()}`);
        // const uploadTask = await uploadBytesResumable(storageRef, data.doc.file);
        // const url = await getDownloadURL(uploadTask.ref)
        // console.log(url);
        // return url;
        const snapshot = await uploadString(storageRef, data.doc.file, 'data_url');
        const url = await getDownloadURL(snapshot.ref)
        console.log("File Uploaded",url);
        return (url);
    }catch(err){
        console.log(err);
    }
};

export async function submitDocData(data,user_id,url){
    if(!data.file)
    return new Error("Pass doc url");
    const docRef = doc(db, "users", user_id);

    //Find the already stored document if any
    let to_be_removed = null;
    let docSnap = await getDoc(docRef);
    docSnap = docSnap.data();
    docSnap = docSnap.documents;
    for(let i=0; i<docSnap.length; i++)
    {
        if(docSnap[i].name == data.name)
        {
            to_be_removed = docSnap[i];
            break;
        }
    }

    // Delete the already stored document if any
    await updateDoc(docRef, {
        documents: arrayRemove(to_be_removed)
    });
    
    data.file=url;
    
    console.log(data);
    // Add the updated or new document
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
