import React, { useContext } from 'react';
import APIContext from '../providers/APIcontext';

function Header() {
  const { query, handleValue } = useContext(APIContext);

  const handleNumericFilter = () => {
    console.log(operator, 'operator');
  };

  return (
    <div>
      <h3>Star Wars Planets Search</h3>
      <form>
        <label htmlFor="filter-by-name">
          Filter By Name
          <input
            id="filter-by-name"
            type="text"
            onChange={ handleValue }
            value={ query }
            placeholder="Name"
            data-testid="name-filter"
          />
        </label>
        <label htmlFor="parameter">
          Select a parameter
          <select id="parameter" data-testid="column-filter">
            <option value="population">Population</option>
            <option value="orbital_period">Orbital_period</option>
            <option value="diameter">Diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="operator">
          Select an operator
          <select id="operator" data-testid="comparison-filter">
            <option value="maior">Maior que</option>
            <option value="menor">Menor que</option>
            <option value="igual">Igual a</option>
          </select>
        </label>
        <label htmlFor="filter-by-number">
          Filter by number
          <input
            type="number"
            data-testid="value-filter"
            id="filter-by-number"
            placeholder="0"
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleNumericFilter }
        >
          Filter
        </button>
      </form>
    </div>
  );
}

export default Header;
