import { useContext, useState } from "react";
import { useLocalStorage } from "react-use";
import { MyContext } from "../context/MyContext";

export function useMyContextProvider(){
    const [openEdit, setOpenEdit] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [contactLocal, setContactLocal] = useState({});
    const [user, setUser, removeUser] = useLocalStorage('user', {});

    return {
        openEdit, setOpenEdit,
        user, setUser, removeUser,
        contacts, setContacts,
        contactLocal, setContactLocal
    }
};

export function useMyContext(){
    return useContext(MyContext);
}
