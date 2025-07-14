import { useState } from "react";

export default function useToggle(initial){

    const [bool,setBool] = useState(initial ?? false);

    function toggle(){
        setBool((bool)=>!bool);
    }
    
    return [bool,toggle];
}