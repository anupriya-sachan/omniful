import WithModal from "./WithModal";

function ImplementModal(){
    return(
        <>
        <WithModal children={<SampleModal/>} title={" Lets Open a Sample Modal"}/>
        </>
    )
}

function SampleModal(){
   return(
    <div>
        <div>
            <p>This is a simple modal message.</p>
            <p className="text-sm text-gray-500 mt-2">You can put anything here.</p>
        </div>
    </div>
   )
}

export default ImplementModal;