import PropTypes from 'prop-types';
import React from 'react';
import Autosuggest from 'react-autosuggest';
import { fuzzyFindAndSort, fuzzyHighlight } from '../AsyncMock';
import styled from 'styled-components';
import './style.css';

const Wrapper = styled.div`
  margin: 16px 32px;
`

export const getSuggestions = value => {
  if (typeof value !== 'string') return [];
  const trimmedValue = value.trim();
  return trimmedValue.length === 0 ? [] : fuzzyFindAndSort(trimmedValue);
};

export const getSuggestionValue = suggestion => (suggestion && suggestion.target) || '';

// NOTE/REFACTORING: avoid using dangerouslySetInnerHTML here
export const renderSuggestion = suggestion => (
  <span className="suggestion-content " dangerouslySetInnerHTML={{ __html: fuzzyHighlight(suggestion) }} />
);


class AutocompleteTextField extends React.PureComponent {
  state = {
    value: '',
    suggestions: [],
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({ suggestions: getSuggestions(value) });
  };

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] });
  };

  render() {
    const { value, suggestions } = this.state;
    const { placeholderText } = this.props;

    const inputProps = {
      placeholder: placeholderText,
      onChange: this.onChange,
      value,
    };

    return (
      <Wrapper>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
      </Wrapper>
    );
  }
}

AutocompleteTextField.propTypes = {
  placeholderText: PropTypes.string,
};

AutocompleteTextField.defaultProps = {
  placeholderText: "Type to search...",
};

export default AutocompleteTextField;
