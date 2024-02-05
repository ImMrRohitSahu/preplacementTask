import { createContext, useEffect, useState } from "react";

export const ApiContext = createContext()

// eslint-disable-next-line react/prop-types
const ApiContextProvider = ({children}) => {
    const [products, setProducts] = useState([])

    useEffect(()=>{
        fetch("https://fakestoreapi.com/products")
        .then((res)=>res.json())
        .then((data)=>setProducts(data))
        .catch(()=>alert("Server Error!!!"))
    },[])

    return <ApiContext.Provider value={{products}}>{children}</ApiContext.Provider>
}

export default ApiContextProvider
