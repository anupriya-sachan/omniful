import Card from "../Quotes/Card";

function Bookmark(){
    return(
        <>
        <div className="font-extrabold text-gray-800 p-4 text-3xl">Your Bookmarks!</div>
        <div className="grid grid-cols-3 gap-4 justify-center p-4">
            <Card quote={"The temptation to give up is strongest just before victory."} author={"Dieter Rams"}/>
        </div>
        </>
    )
}

export default Bookmark;