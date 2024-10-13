import React from 'react';

function Header() {
  return (
    <header className='Header'>
      <div className="logo">
        <img src="/logo.png" alt="Logo de Mi Día de Trabajo" />
      </div>
      <div className="user-profile">
        <img src="/user-profile.png" alt="Perfil " />
      </div>
    </header>
  );
}

export default Header;
