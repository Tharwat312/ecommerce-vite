import { createContext, useState } from "react";

export let TokenContext = createContext();


export default function TokenContextProvider(props) {
    const [token, setToken] = useState(localStorage.getItem("UserToken"));
    return <>
        <TokenContext.Provider value={{ token, setToken }}>
            {props.children}
        </TokenContext.Provider>
    </>

}

