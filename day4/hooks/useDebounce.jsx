import { useEffect, useState } from "react";

export default function useDebounce(func,val,delay=300){
    useEffect(()=>{
        let timer = setTimeout(()=>{func(val)},delay);

        return ()=>{clearTimeout(timer)};
    },[val,func,delay])

}

function useDebouncedValue(val,delay=300){
    const [value,setValue] = useState(val);
    useEffect(()=>{
        let timer = setTimeout(() => {
            setValue(val);
        }, delay);

        return ()=>{clearTimeout(timer)}
    },[val,delay])

    return value;
}