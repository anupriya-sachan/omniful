import { useEffect, useState } from "react";

export default function useFetch(link){
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    //three states to define all that we need to get 

    useEffect(()=>{
        //on start set loading to true
        setLoading(true);

        //prevent persistence of old states 
        setData(null);
        setError(null);

        //ensures that an unmounted item isnt being updated and causing errors.
        let isMounted = true;

            async function getData(){
                try{
                    let resp = await fetch(link);

                    if(!resp.ok) throw new Error(`Data fetch failed with status code - ${resp.status}`);

                    let data = await resp.json();
                    //only update if component exists
                    if(isMounted){
                        setData(data);
                    }
                }
                catch(err){
                    setError(err.message);
                }
                finally{
                    if(isMounted){
                        setLoading(false);
                    }
                }
                
            }
            getData();

            return () => {
                //returns false on unmounting to ensure component exists
                isMounted=false;
            }
        
    },[link])

    return {data,loading,error};
}