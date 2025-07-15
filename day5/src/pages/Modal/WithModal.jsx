import { useEffect, useRef, useState } from "react";
import {createPortal} from "react-dom";

function WithModal({children,title}){
    const [centreModal,setCentreModal] = useState(false);
    const [sideModal,setSideModal] = useState(false);

    const modalRef = useRef();
    const sideModalRef = useRef();

    function handleCentreModal(){
        setCentreModal((c)=>!c);
    }

    function handleSideModal(){
        setSideModal((c)=>!c);
    }


    return(
        <div className="h-screen w-screen flex justify-center items-center">
            <button className="border-2 border-gray-200 p-3 rounded-xl h-fit w-fit cursor-pointer hover:bg-blue-200 m-2" onClick={handleCentreModal} ref={modalRef}>Open Centre Modal</button>
            <button className="border-2 border-gray-200 p-3 rounded-xl h-fit w-fit cursor-pointer hover:bg-blue-200 m-2" onClick={handleSideModal} ref={sideModalRef}>Open Side Modal</button>

            {centreModal && createPortal(
                <CreateCentreModal children={children} title={title} closeModal={()=>setCentreModal(false)}/>,
                document.body
            )}

            {sideModal && createPortal(
                <CreateSideModal children={children} title={title} closeModal={()=>setSideModal(false)}/>,
                document.body
            )}
        </div>
    )
}

function CreateCentreModal({children,title,closeModal}){
    const closeRef = useRef();

    const handleKeyDown = (event) => {
        if(event.key=="Escape"){
            closeModal();
        }
        if(event.key=="Tab"){
            event.preventDefault();
            closeRef.current.focus();
            
        }
    }
    useEffect(()=>{
        closeRef.current.focus();
        window.addEventListener("keydown",handleKeyDown);

        return(()=>{
            window.removeEventListener("keydown",handleKeyDown);
        })
    },[])
    return(
        <>
            <div className="" role="dialog" aria-modal="true" >
                <div className="bg-gray-400/20 h-screen w-screen fixed top-0 left-0 z-10" onClick={closeModal}></div>
                <div className="bg-white p-5 rounded-lg border-2 border-gray-400 z-20 fixed m-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p>{title}</p>
                    {children}
                    <button onClick={closeModal} ref={closeRef} className="border-2 border-gray-100 px-2 py-1 rounded-xl h-fit w-fit cursor-pointer hover:bg-blue-200 m-2 active:border-2 active:border-blue-600">Close</button>
                </div>
            </div>
        </>
    )
}

function CreateSideModal({children,title,closeModal}){
    const closeRef = useRef();

    const handleKeyDown = (event) => {
        if(event.key=="Escape"){
            closeModal();
        }
        if(event.key=="Tab"){
            event.preventDefault();
            closeRef.current.focus();
            
        }
    }
    useEffect(()=>{
        closeRef.current.focus();
        window.addEventListener("keydown",handleKeyDown);

        return(()=>{
            window.removeEventListener("keydown",handleKeyDown);
        })
    },[])

    return(
        <div>
            <div className="bg-gray-400/20 h-screen w-screen fixed top-0 left-0 z-10" onClick={closeModal}></div>
            <div className="h-full min-w-72 bg-white right-0 top-0 absolute z-20">
                <p className="mx-5 my-2 p-2">{title}</p>
                <div className="flex p-2 hover:bg-green-100 mx-5 my-3 rounded-lg items-center"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                    Account Settings </div>
                <div className="flex p-2 hover:bg-green-100 mx-5 my-3 rounded-lg items-center"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    View Profile </div>
                <div className="flex p-2 hover:bg-green-100 mx-5 my-3 rounded-lg items-center"> 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
                    Documentation </div>
                <button onClick={closeModal} ref={closeRef} className="border-2 border-gray-100 px-3 py-1 mx-7 rounded-xl h-fit w-fit cursor-pointer hover:bg-green-100 m-2 active:border-2 active:border-green-600">Close</button>
            </div>
        </div>
    )
}

export default WithModal;