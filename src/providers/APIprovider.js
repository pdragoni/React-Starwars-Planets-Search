import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import APIContext from './APIcontext';

const array = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];
function APIProvider({ children }) {
  const [data, setData] = useState([]); // results, da API.
  const [filteredPlanets, setFilteredPlanets] = useState([]); // Cópia de: useState(data);
  const [categories, setCategories] = useState([]); // categorias/caracteríticas dos planetas
  const [query, setQuery] = useState(''); // console.log(query); -> busca digitada pelo usuário

  // // Lida com o filtro numérico //
  const [numericFilters, setNumericFilters] = useState([]); // array de filtros numéricos
  const [comparison, setComparison] = useState('maior que');
  const [column, setColumn] = useState('population');
  const [value, setValue] = useState(0);

  const [parameters, setParameters] = useState(array);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
        const responseJson = await response.json();
        // console.log(responseJson.results);
        setData(responseJson.results);
        setFilteredPlanets(responseJson.results);
        setCategories(Object.keys(responseJson.results[2]));
      } catch (error) {
        // console.log(error);
      }
    };
    fetchPlanets();
    // console.log(data);
  }, []);

  const handleValue = ({ target }) => { // determina que query é o que o usuário está digitando
    setQuery(target.value.toLowerCase());
  };

  const handleNumericFilter = () => {
    const numericFilter = {
      column,
      comparison,
      value,
    };
    // console.log(numericFilters);

    setParameters(parameters.filter((elemento) => elemento !== column));

    const result = filteredPlanets.filter((planet) => {
      if (comparison === 'maior que') {
        // console.log(planet.comparison);
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      return Number(planet[column]) === Number(value);
    });
    setFilteredPlanets(result);
    setNumericFilters([...numericFilters, numericFilter]);
  };

  useEffect(() => { // Acontecerá sempre que query for modificado.
    const filterByQuery = data.filter((planet) => planet // filtra pelo mecanismo de busca escrito pelo usuário
      .name.toLowerCase() // o nome do planeta em minúsculas
      .includes(query)); //  inclui o que o usuŕio digitou?
    // console.log(filterByQuery);

    // const resultArray = numericFilters.reduce((acc, filter) => acc.filter((planet) => {
    //   switch (filter.comparison) {
    //   case 'igual a':
    //     return Number(planet[filter.column]) === Number(filter.value);
    //   case 'maior que':
    //     return Number(planet[filter.column]) > Number(filter.value);
    //   case 'menor que':
    //     return Number(planet[filter.column]) < Number(filter.value);
    //   default:
    //     return true;
    //   }
    // }), filteredPlanets);

    setFilteredPlanets(filterByQuery); //  o array retornado
  }, [data, query]);

  const ProvidedInfo = { // Objeto com as informaões a serem enviadas para os outros componentes;
    filteredPlanets,
    categories,
    query,
    value,
    parameters,
    numericFilters,
    handleValue,
    handleNumericFilter,
    setColumn,
    setComparison,
    setValue,
  };

  return (
    <APIContext.Provider // Envia para todos os componetes as informações presentes no objeto
      value={ ProvidedInfo }
    >
      { children }
    </APIContext.Provider>
  );
}

APIProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default APIProvider;
