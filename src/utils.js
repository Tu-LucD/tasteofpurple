import db from'./firebase'
import {collection, setDoc, doc, addDoc, query, where, getDocs, deleteDoc} from "firebase/firestore"
export const insertMultiple = async(collectionName,payload) =>{
    const collectionRef = collection(db,collectionName);
    payload.forEach(async item => await addDoc(collectionRef,item))
}

export const insertSingle = async(collectionName,payload) =>{
    const collectionRef = collection(db,collectionName);
    await await addDoc(collectionRef,payload)
}

export const editMultiple = async(collectionName,payload,id) =>{

}

export const editSingle = async(collectionName,payload,id) =>{
    console.log(collectionName)
    console.log(payload)
    console.log(id)
    const docRef = doc(db,collectionName,id)
    setDoc(docRef,payload)
}

export const deleteQuery = async(collectionName,queryArgs) =>{
    const collectionRef = collection(db,collectionName);
    const q = query(collectionRef,where(queryArgs[0],queryArgs[1],queryArgs[2]))
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => ({ ...doc.data(), DBID: doc.id }))

    results.forEach(async (result) => {
        const docRef = doc(db,collectionName,result.DBID)
        await deleteDoc(docRef)
    })
}