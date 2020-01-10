import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './css/search-form.css';

const SearchForm = ({ userFilter, data }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleOnChange = value => {
    userFilter(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    handleOnChange('');
  };

  useEffect(() => {
    handleClear();
  }, []);

  return (
    <div className='search-form-container'>
      <div className='search-form'>
        <input
          type='text'
          onChange={e => {
            setSearchTerm(e.target.value);
            handleOnChange(e.target.value);
          }}
          value={searchTerm}
          placeholder='Hae paikkakunnalla'
        />
        <button onClick={handleClear} className='clear-btn'>
          Tyhjennä
        </button>
      </div>
    </div>
  );
};

export default SearchForm;

SearchForm.propTypes = {
  userFilter: PropTypes.func,
  data: PropTypes.array
};
