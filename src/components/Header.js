import React, { useContext } from 'react';
import APIContext from '../providers/APIcontext';

function Header() {
  const { query, handleValue } = useContext(APIContext);
  return (
    <div>
      <h3>Star Wars Planets Search</h3>
      <form>
        <input
          type="text"
          onChange={ handleValue }
          value={ query }
          placeholder="Name"
          data-testid="name-filter"
        />
      </form>
    </div>
  );
}

export default Header;
