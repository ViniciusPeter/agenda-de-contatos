import { useEffect, useState } from 'react';
import CloseIcon from '../../assets/close.svg';
import { useMyContext } from '../../hooks/useMyContext';
import api from '../../services/Api';
import './style.css';

function ModalEdit(){
    const {openEdit, setOpenEdit, user, contactLocal, setContactLocal } = useMyContext();

    const [form, setForm] = useState({
        nome: contactLocal.nome,
        email:  contactLocal.email,
        telefone: contactLocal.telefone
    });

    useEffect(()=>{

        if(contactLocal){
            setForm({
                nome: contactLocal.nome,
                email:  contactLocal.email,
                telefone: contactLocal.telefone
            })
        }

    },[contactLocal])

    const { token } = user;

    async function HandleSubmit(e){
        e.preventDefault();


        try {
            if(!form.nome && !form.email && !form.telefone){
                return alert('Ao menos um campo deve ser preenchido!')
            }

            await api.put(`/contatos/${contactLocal.id}`, form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setContactLocal({});
            setOpenEdit(!openEdit)
            
        } catch (error) {
            console.log(error)
        }

    }

    function HandleChange({target}){
        return setForm({...form, [target.name]: target.value});
    }

    return(
        <>
            {openEdit &&
                <div className='modal-edit backdrop'>
                    <div className="container-form">
                        <form onSubmit={HandleSubmit}>
                            <h1>Editar contato</h1>
                            <img 
                                src={CloseIcon} 
                                alt="Fechar" 
                                onClick={() => setOpenEdit(!openEdit)}
                            />
                            <div className='container-inputs'>
                                <input 
                                    type="text" 
                                    name='nome'
                                    value={form.nome}
                                    placeholder='Nome'
                                    onChange={HandleChange}
                                />
                                <input 
                                    type="text" 
                                    name='email'
                                    value={form.email} 
                                    placeholder='E-mail'
                                    onChange={HandleChange}
                                />
                                <input 
                                    type="text" 
                                    name='telefone' 
                                    value={form.telefone}
                                    placeholder='Telefone'
                                    onChange={HandleChange}
                                />
                            </div>

                            <div className='container-buttons'>
                                <button 
                                    className='btn-green'
                                    type='submit'
                                >
                                    Salvar
                                </button>
                                <button 
                                    className='btn-red'
                                    type='button'
                                    onClick={() => setOpenEdit(!openEdit)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export default ModalEdit;
