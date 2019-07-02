/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import useDownshift from 'use-downshift';

function Autocomplete({ items, label, onChange }) {
  const itemToString = item => item || '';

  const {
    isOpen,
    getRootProps,
    getMenuProps,
    getItemProps,
    getLabelProps,
    getInputProps,
    highlightedIndex,
    inputValue,
    selectedItem,
    clearSelection,
  } = useDownshift({
    itemToString,
    onChange,
  });

  return (
    <label className="block mt-4" {...getRootProps()}>
      <span className="text-gray-700" {...getLabelProps()}>
        {label}
      </span>
      <br />
      <input
        className="form-input mt-1 block w-half inline-block"
        {...getInputProps({ placeholder: 'search...' })}
      />
      {inputValue && (
        <button type="button" onClick={() => clearSelection()}>
          <span className="bg-gray-300 rounded p-4">x</span>
        </button>
      )}

      {isOpen && (
        <div {...getMenuProps()}>
          <ul style={{ overflow: 'hide' }}>
            {items
              .filter(
                item =>
                  !inputValue ||
                  inputValue === itemToString(selectedItem) ||
                  item.toLowerCase().includes(inputValue.toLowerCase()),
              )
              .map((item, index) => (
                <li
                  {...getItemProps({
                    key: index,
                    item,
                    active: highlightedIndex === index,
                    selected: selectedItem === item,
                  })}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      )}
    </label>
  );
}

Autocomplete.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Autocomplete;
