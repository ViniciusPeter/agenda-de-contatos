import CloseIcon from '../../assets/close.svg';
import { useMyContext } from '../../hooks/useMyContext';
import './style.css';
import api from '../../services/Api';

function ModalDelete({openDelete, setOpenDelete, contactLocal, setContactLocal}){
    const { user } = useMyContext();
    const { token } = user;

    async function HandleSubmit(e){
        e.preventDefault();

        try {
            await api.delete(`/contatos/${contactLocal.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setContactLocal({});
        } catch (error) {
            console.log(error.response.data);
        }

        setOpenDelete(!openDelete)
    }

    return(
        <>
            {openDelete &&
                <div className='modal-delete backdrop'>
                    <div className="container-form">
                        <form onSubmit={HandleSubmit}>
                            <img 
                                src={CloseIcon} 
                                alt="Fechar" 
                                onClick={() => setOpenDelete(!openDelete)}
                                />
                            <h1>Confirma a exclusão?</h1>
                            <p>Deseja excluir o contato {contactLocal.nome}?</p>

                            <div className='container-buttons'>
                                <button 
                                    className='btn-green'
                                    type='submit'
                                >
                                    Excluir
                                </button>
                                              
                                <button 
                                    className='btn-red'
                                    type='button'
                                    onClick={() => setOpenDelete(!openDelete)}
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

export default ModalDelete;