import { MATCHERS_ARRAY } from '../constants';
const fuzzysort = require('fuzzysort');

export const fuzzyFindAndSort = value => fuzzysort.go(value, MATCHERS_ARRAY).sort((a,b) => a.score > b.score);

export const fuzzyHighlight = suggestion => fuzzysort.highlight(suggestion, '<b>', '</b>');
