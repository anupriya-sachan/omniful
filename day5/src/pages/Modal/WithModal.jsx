import { useEffect, useRef, useState } from "react";
import {createPortal} from "react-dom";

function WithModal({children,title}){
    const [modal,setModal] = useState(false);
    const modalRef = useRef();

    function handleModal(){
        setModal((c)=>!c);
        console.log(modal);
    }
    return(
        <div className="h-screen w-screen flex justify-center items-center">
            <button className="border-2 border-gray-200 p-3 rounded-xl h-fit w-fit cursor-pointer hover:bg-blue-200" onClick={handleModal} ref={modalRef}>Open Modal</button>
            {modal && createPortal(
                <CreateModal children={children} title={title} closeModal={()=>setModal(false)}/>,
                document.body
            )}
        </div>
    )
}

function CreateModal({children,title,closeModal}){
    const closeRef = useRef();
    useEffect(()=>{
        closeRef.current.focus();
    },[])
    return(
        <>
        <div className="">
            <div className="bg-gray-400/20 h-screen w-screen fixed top-0 left-0 z-10" onClick={closeModal}></div>
            <div className="bg-white p-5 rounded-lg border-2 border-gray-400 z-20 fixed m-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p>{title}</p>
                {children}
                <button onClick={closeModal} ref={closeRef} className="border-2 border-gray-100 px-2 py-1 rounded-xl h-fit w-fit cursor-pointer hover:bg-blue-200 m-2">Close</button>
            </div>
        </div>
        </>
    )
}

export default WithModal;