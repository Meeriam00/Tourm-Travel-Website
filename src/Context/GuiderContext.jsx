import { createContext,useEffect,useState } from "react";
import axios from "axios";

export const GuiderContext = createContext();


export const GuiderProvider = ({ children }) => {
    const [guider, setGuider] = useState([])
    useEffect(() => {
        axios.get('https://tourm-travel-backend-2.onrender.com/ad/tour/tour')
            .then(res => {
                console.log(res.data)
                setGuider(res.data)
            })
    }, [])


    return <GuiderContext.Provider value={[guider, setGuider]}>{children}</GuiderContext.Provider>
}

