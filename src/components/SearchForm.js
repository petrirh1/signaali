import React, { useState } from 'react';
import './css/search-form.css';

const SearchForm = ({ userFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleOnChange = e => {
    userFilter(e);
  };

  const handleClear = () => {
    setSearchTerm('');
    handleOnChange('');
  };

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