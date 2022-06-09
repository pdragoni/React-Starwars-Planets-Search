import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import APIContext from './APIcontext';

function APIProvider({ children }) {
  const [data, setData] = useState([]); // results, da API.
  const [filteredPlanets, setFilteredPlanets] = useState([]); // Cópia de: useState(data);
  const [categories, setCategories] = useState([]); // categorias/caracteríticas dos planetas
  const [query, setQuery] = useState(''); // console.log(query); -> busca digitada pelo usuário

  // Lida com o filtro numérico //
  // const [numericFilters, setNumericFilters] = useState([]); // array de filtros numéricos
  // const [operator, setOperator] = useState('igual');
  // const [parameter, setParameter] = useState('population');
  // const [valueFilter, setValueFilter] = useState(0);

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

  useEffect(() => { // Acontecerá sempre que query for modificado.
    const filterByQuery = data.filter((planet) => planet // filtra pelo mecanismo de busca escrito pelo usuário
      .name.toLowerCase() // o nome do planeta em minúsculas
      .includes(query)); //  inclui o que o usuŕio digitou?
    setFilteredPlanets(filterByQuery); //  o array retornado
  }, [query]);

  const ProvidedInfo = { // Objeto com as informaões a serem enviadas para os outros componentes;
    categories,
    query,
    handleValue,
    filteredPlanets,
    operator,
    parameter,
    valueFilter,
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
