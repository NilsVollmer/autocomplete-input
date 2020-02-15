import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AutocompleteTextField, { getSuggestions, getSuggestionValue, renderSuggestion } from './index';
import { MATCHERS_ARRAY } from '../constants';

const fuzzysort = require('fuzzysort');

beforeEach(() => {
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

test('renders learn react link', () => {
  const { getByRole } = render(<AutocompleteTextField />);
  const linkElement = getByRole(/combobox/i);
  expect(linkElement).toBeInTheDocument();
});

test('renderSuggestion() returns a renderable element that includes the suggestion as text', () => {
  const suggestions = fuzzysort.go(MATCHERS_ARRAY[1], MATCHERS_ARRAY);
  const { getByText } = render(renderSuggestion(suggestions[0]));
  const linkElement = getByText(/Apple/i);
  expect(linkElement).toBeInTheDocument();
});

describe("getSuggestionValue(suggestion)", () => {
  test('returns suggestion.target', () => {
    expect(getSuggestionValue({ target: 42 })).toBe(42);
  });

  test('returns empty string when .target is not set', () => {
    expect(getSuggestionValue({ wrongKey: 42 })).toBe('');
  });

  test('does not break when suggestion is undefined and returns empty string', () => {
    expect(getSuggestionValue()).toBe('');
  });
});

describe("getSuggestions(value)", () => {
  test('returns empty array as default when value is not typeof "string"', () => {
    expect(getSuggestions(42)).toEqual([]);
  });

  test('correctly trims the string and returns empty array for empty trimmed string', () => {
    expect(getSuggestions('  ')).toEqual([]);
  });

  test('fuzzy-matches any valid string against the MATCHERS_ARRAY and returns a non-empty array', () => {
    const resultSuggestions = getSuggestions(MATCHERS_ARRAY[0]);
    expect(resultSuggestions.length > 0).toBe(true);
  });
});

test('change values via the fireEvent.change method', () => {
  const { container } = render(<AutocompleteTextField />);
  const input = container.firstChild.firstChild.firstChild; // grabbing the inout inside Autocomplete component
  fireEvent.change(input, { target: { value: 'test' } });
  expect(input.value).toBe('test');
  fireEvent.change(input, { target: { value: '' } });
  expect(input.value).toBe('');
})
