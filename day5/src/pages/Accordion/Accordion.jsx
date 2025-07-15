import { createContext, useContext, useState } from "react";

const AccordionContext = createContext();

//this would wrap the whole accordion component
function Accordion({children}){
    const [activeIndex,setActiveIndex] = useState(0);

    return(
    <AccordionContext.Provider value={{activeIndex,setActiveIndex}}>
            <div className="m-auto h-fit w-1/2">{children}</div>
    </AccordionContext.Provider>
    )
}

//takes the heading of the accordion as the child
Accordion.AccordionItem = function({index,children}){
    const {activeIndex,setActiveIndex} = useContext(AccordionContext);
    return(
        <div className="my-3 font-bold text-lg">
            <button 
            className="w-full flex justify-between"
            onClick={()=>{setActiveIndex(index)}}>
                {children}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 text-blue-900 ${activeIndex===index?"transition-transform duration-300 rotate-180":""}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>

            </button>
        </div>
    )
}

//has the result of accordion as the child prop
Accordion.AccordionAnswer = function({index,children}){
    const {activeIndex} = useContext(AccordionContext);
    const isOpen = activeIndex===index;

    return (<div
      className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
      `}
    >
      <p className="text-gray-400 pb-3">{children}</p>
    </div>
    )
}

export default Accordion;