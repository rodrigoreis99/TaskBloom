import React, { useEffect, useState } from 'react';
import * as S from './styles';
import logo from '../../assets/logo.png';
import bell from '../../assets/bell.png';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import isConnected from '../../utils/isConnected';


function Header({clickNotification}) {
  const [lateCount,setLateCount] = useState();
  

  async function LateVerify(){
    await api.get(`/task/filter/late/${isConnected}`)
    .then(response =>{
        setLateCount(response.data.length)
    })
  }

  useEffect(() =>{
    LateVerify();
  })

  async function Logout() {
    localStorage.removeItem('@TaskBloom/macaddress');
    window.location.reload();
  }

  return (
    <S.Container>
      <S.LeftSide>
        <img src={logo} alt="Logo"/>
      </S.LeftSide>

      <S.RightSide >
      <Link to="/">INÍCIO</Link>
      <span className='dividir'/>
      <Link to= "/task">NOVA TAREFA</Link>
      <span className='dividir'/>
      {!isConnected ?
        <Link to ="/qrcode">SINCRONIZAR CELULAR</Link>
        :
       <button type='button' onClick={Logout}>SAIR</button>
      }   
      {
        lateCount &&
        <>
          <span className='dividir'/>
          <button onClick={clickNotification}>
          <img src={bell} alt = "Notificação"/>
          <span>{lateCount}</span>
          </button>
        </>
      } 
      </S.RightSide >
    </S.Container>
  )
}

export default Header;
