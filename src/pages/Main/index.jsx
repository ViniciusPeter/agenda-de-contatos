import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logout from '../../assets/logout.svg';
import Modal from '../../compontents/Modal';
import ModalEdit from '../../compontents/ModalEdit';
import Table from '../../compontents/Table';
import { useMyContext } from '../../hooks/useMyContext';
import './style.css';

function Main() {
  const [open, setOpen] = useState(false);
  const navegate = useNavigate()
  const {removeUser} = useMyContext()

  function HandleLogout(){
    removeUser();
    navegate('/');
  }

  return (
    <div className="container-main">
        <header>
          <div className='container-header'>
            <span className='logo'>KONTACTS</span>
            <img 
              src={Logout} 
              alt="logout"
              onClick={HandleLogout}
            />        
          </div>
        </header>

        <main>
          <div className="content-main">
            <button 
              className='btn-green'
              type='button'
              onClick={() => setOpen(!open)}
            >
              Adicionar
            </button>
            <Table          
              open={open}
            />
          </div>
        </main>

        <Modal
          open={open}
          setOpen={setOpen}
        />
        <ModalEdit />
    </div>
  );
}

export default Main;
