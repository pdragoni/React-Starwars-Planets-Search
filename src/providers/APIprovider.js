import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import APIContext from './APIcontext';

function APIProvider({ children }) {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState(''); // console.log(query);
  const [filteredPlanets, setFilteredPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
        const responseJson = await response.json();
        // console.log(responseJson.results);
        setData(responseJson.results);
        setFilteredPlanets(responseJson.results);
        setCategories(Object.keys(responseJson.results[2]));
      } catch {
        // console.log(error);
      }
    };
    fetchPlanets();
    // console.log(data);
  }, []);

  const handleValue = ({ target }) => {
    setQuery(target.value.toLowerCase());
  };

  useEffect(() => {
    const filterByQuery = data.filter((planet) => planet
      .name.toLowerCase()
      .includes(query));
    setFilteredPlanets(filterByQuery);
  }, [query]);

  return (
    <APIContext.Provider
      value={ { categories, query, handleValue, filteredPlanets } }
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
