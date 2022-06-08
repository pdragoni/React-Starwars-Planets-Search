import React, { useContext } from 'react';
import APIContext from '../providers/APIcontext';

function PlanetsTable() {
  const { filteredPlanets, categories } = useContext(APIContext);

  const filteredCategories = categories.filter((cat) => cat !== 'residents');
  // console.log('data', filteredPlanets, 'cat', filteredCategories);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              filteredCategories.map((cat, index) => (
                <th key={ index }>{ cat }</th>))
            }
          </tr>
        </thead>
      </table>
      <tbody>
        {
          filteredPlanets.map((planet, index) => (
            <tr key={ index }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films.map((film) => film) }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))
        }
      </tbody>
    </div>
  );
}

export default PlanetsTable;
