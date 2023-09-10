import { useEffect, useState } from 'react';
import DeleteIcon from '../../assets/delete.svg';
import EditIcon from '../../assets/edit.svg';
import { useMyContext } from '../../hooks/useMyContext';
import ModalDelete from '../ModalDelete';
import './style.css';
import api from '../../services/Api';

function Table({open}){
    const [openDelete, setOpenDelete] = useState(false);
    const { openEdit, setOpenEdit, 
            contacts, setContacts, 
            user,
            contactLocal, setContactLocal 
          } = useMyContext();

    async function listContatos(){
        const { data } = await api.get('/contatos',{
            headers:{
                Authorization: `${user.token}`
            }
        });

        setContacts([...data]);
    }

    function HandleOpenModalDelete(contact){
        setOpenDelete(!openDelete);
        setContactLocal(contact);
    }

    function HandleOpenModalEdit(contact){
        setOpenEdit(!openEdit);
       return setContactLocal({...contact});
    }

    useEffect(() => {
    
        listContatos();

    }, [contacts, openDelete, openEdit]);

    return(
        <div className='container-table'>
            <div className='head-table'>
                <span>Nome</span>
                <span>Email</span>
                <span>Telefone</span>
                <span></span>
            </div>
            <div className='body-table'>

                {contacts.map( contact => {
                    return (
                        <div className="row-table" key={contact.id}>
                            <span>{contact.nome}</span>
                            <span>{contact.email}</span>
                            <span>{contact.telefone}</span>
                            <span>
                                <img 
                                    src={EditIcon} 
                                    alt="edit" 
                                    onClick={() => HandleOpenModalEdit(contact)}
                                />
                                <img 
                                    src={DeleteIcon} 
                                    alt="delete"
                                    onClick={() => HandleOpenModalDelete(contact)} 
                                />
                            </span>
                        </div>
                    );
                })}
                
            </div>

            <ModalDelete
                contactLocal={contactLocal}
                setContactLocal ={setContactLocal}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
            />
        </div>
    );
}

export default Table;