import React, { useContext, useState, useEffect } from "react";
import db from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";

const ApplicationContext = React.createContext()
export function useApplicationContext(){
    return useContext(ApplicationContext)
}

export function ApplicationProvider({children}){
    const [applicationInfo,setApplicationInfo] = useState()
    useEffect(() => {
        onSnapshot(collection(db,"Application"),(snapshot) => {
            setApplicationInfo(snapshot.docs.map(doc => doc.data())[0]);
        });
    },[])

    return(
        <ApplicationContext.Provider value={applicationInfo}>
            {children}
        </ApplicationContext.Provider>
    )
}