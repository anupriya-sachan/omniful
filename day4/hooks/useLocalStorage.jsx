import { useState } from "react";

export default function useLocalStorage(key,initialValue){
    const [value,setValue] = useState(()=>{
        const existingValue = localStorage.getItem(key);
        return existingValue??initialValue??""
    });
    
    function setLocalStorage(val){
        localStorage.setItem(key,val);
        setValue(val);
    }

    return [value,setLocalStorage];
}