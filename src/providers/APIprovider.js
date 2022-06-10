import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import APIContext from './APIcontext';

function APIProvider({ children }) {
  const [data, setData] = useState([]); // results, da API.
  const [filteredPlanets, setFilteredPlanets] = useState([]); // Cópia de: useState(data);
  const [categories, setCategories] = useState([]); // categorias/caracteríticas dos planetas
  const [query, setQuery] = useState(''); // console.log(query); -> busca digitada pelo usuário

  // // Lida com o filtro numérico //
  const [numericFilters, setNumericFilters] = useState([]); // array de filtros numéricos
  const [operator, setOperator] = useState('maior que');
  const [column, setColumn] = useState('population');
  const [queryNumber, setQueryNumber] = useState(0);

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
      operator,
      queryNumber,
    };
    // console.log(numericFilter);
    setNumericFilters([...numericFilters, numericFilter]);
  };

  useEffect(() => { // Acontecerá sempre que query for modificado.
    const filterByQuery = data.filter((planet) => planet // filtra pelo mecanismo de busca escrito pelo usuário
      .name.toLowerCase() // o nome do planeta em minúsculas
      .includes(query)); //  inclui o que o usuŕio digitou?
    // console.log(filterByQuery);

    const resultArray = numericFilters.reduce((acc, filter) => acc.filter((planet) => {
      switch (filter.operator) {
      case 'igual a':
        return planet[filter.column] === Number(filter.queryNumber);
      case 'maior que':
        return planet[filter.column] > Number(filter.queryNumber);
      case 'menor que':
        return planet[filter.column] < Number(filter.queryNumber);
      default:
        return true;
      }
    }), filteredPlanets);

    setFilteredPlanets(resultArray);
    // setFilteredPlanets(filterByQuery); //  o array retornado
  }, [query, numericFilters]);

  const ProvidedInfo = { // Objeto com as informaões a serem enviadas para os outros componentes;
    filteredPlanets,
    categories,
    query,
    queryNumber,
    numericFilters,
    handleValue,
    handleNumericFilter,
    setColumn,
    setOperator,
    setQueryNumber,
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
