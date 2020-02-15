import React from 'react';
import './App.css';

import AutocompleteTextField from './packages/AutocompleteTextField'

function App() {
  return (
    <div className="App">
      <AutocompleteTextField placeholderText="Type to search..." />
    </div>
  );
}

export default App;
