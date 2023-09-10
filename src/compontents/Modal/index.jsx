import { useState } from 'react';
import CloseIcon from '../../assets/close.svg';
import { useMyContext } from '../../hooks/useMyContext';
import api from '../../services/Api';
import './style.css';

function Modal({open, setOpen}){
    const [form, setForm] = useState({
        nome: '',
        email: '',
        telefone: ''
    })
    const { user } = useMyContext();

    async function HandleSubmit(e){
        e.preventDefault();

        try {
            if(!form.nome || !form.email || !form.telefone){
                return alert('Todos os campos são obrigatórios!');
            }

            api.post('/contatos', form, {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            })
            
            setForm({
                nome: '',
                email: '',
                telefone: ''
            });
            
            setOpen(!open);

        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data)
        }

    }

    function HandleChange({target}){
        setForm({...form, [target.name]: target.value})
    }

    function HandleClearForm(){
        setForm({
            nome: '',
            email: '',
            telefone: ''
        });
    }

    return(
        <>
            {open &&
                <div className='modal backdrop'>
                    <div className="container-form">
                        <form onSubmit={HandleSubmit}>
                            <h1>Novo contato</h1>
                            <img 
                                src={CloseIcon} 
                                alt="Fechar" 
                                onClick={() => setOpen(!open)}
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
                                    Adicionar
                                </button>
                                <button 
                                    className='btn-red'
                                    type='button'
                                    onClick={HandleClearForm}
                                >
                                    Limpar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export default Modal;