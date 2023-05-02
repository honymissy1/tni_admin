import {createContext, useState, useEffect} from 'react';


export const Admin = createContext();

export const AdminProvider = ({ children }) =>{
   const [admin, setAdmin] = useState(null)
   const localAdmin = JSON.parse(localStorage.getItem('admin'))
    useEffect(() =>{
     if(localAdmin){
        logged(localAdmin)
     }
    }, [])

   const logged = (x) =>{
     setAdmin(x);
     localStorage.setItem('admin', JSON.stringify(x))
     console.log(x)
   }
    return(
        <Admin.Provider value={{admin, logged}}>
            {children}
        </Admin.Provider>
    )
}