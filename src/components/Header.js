import React, { useContext } from 'react';
import APIContext from '../providers/APIcontext';

function Header() {
  const { query, value, handleValue, handleNumericFilter,
    setComparison, setValue, setColumn,
    numericFilters } = useContext(APIContext);

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
        <label htmlFor="column">
          Select a column
          <select
            onChange={ ({ target }) => setColumn(target.value) }
            id="column"
            data-testid="column-filter"
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="operator">
          Select an operator
          <select
            onChange={ ({ target }) => setComparison(target.value) }
            id="operator"
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="igual a">igual a</option>
            <option value="menor que">menor que</option>
          </select>
        </label>
        <label htmlFor="filter-by-number">
          Filter by number
          <input
            onChange={ ({ target }) => setValue(target.value) }
            type="number"
            value={ value }
            data-testid="value-filter"
            id="filter-by-number"
            placeholder="20000"
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
      {/* {numericFilters.map(
        (filter, index) => (
          <tr
            key={ index }
          >
            {`${filter.column} ${filter.comparison} ${filter.value}`}
          </tr>),
      )} */}
    </div>
  );
}

export default Header;