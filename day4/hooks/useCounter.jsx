import { useState } from "react";

export default function useCounter(){
    const [count,setCount] = useState(0);

    function increment(){
        setCount((c)=>c+1);
    }

    function decrement(){
        setCount((c)=>c-1);
    }

    function reset(){
        setCount(0);
    }

    function setTo(val){
        setCount(val);
    }

    return [count,increment,decrement,reset,setTo];
}