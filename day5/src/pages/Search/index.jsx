import { useEffect, useRef, useState } from "react"

function Search(){
    const[data,setData] = useState([]);
    const [search,setSearch] = useState("");
    const [result,setResult] = useState([]);

    const inputRef = useRef();

    function handleChange(){
        setSearch(inputRef.current.value);
    }

    useEffect(()=>{        
        let timer = setTimeout(() => {
            let filteredData = data.filter((item)=>{
                return item.toLowerCase().includes(search.toLowerCase());
            })
            setResult(filteredData);
        }, 200);

        return () => {clearTimeout(timer)};
    },[search]);

    useEffect(()=>{
        async function fetchData(){
            const resp = await fetch("https://api.jikan.moe/v4/anime?type=movie&page=1");
            const json = await resp.json();
            const parsedData = json.data;
            let res=[];
            parsedData.map((item)=>{
                if(item.title_english){res.push(item.title_english)}
            });
            setData(res);
        }
        fetchData();
    },[])

    return(
        <div className="w-80 m-auto h-fit">
            <h1 className="font-extrabold text-3xl my-5 text-center">Search a keyword!</h1>
            <input 
                type="text" 
                ref={inputRef} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                placeholder="Search..." 
            />
            {search &&
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <ul className="max-h-44 overflow-auto w-full">
                {result.map((item, index) => (
                    <li className="hover:bg-gray-100 hover:rounded-lg px-3 py-2" key={index}>
                    {item}
                    </li>
                ))}
                </ul>
            </div>
            }
        </div>
    )
}

export default Search;