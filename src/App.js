import React, { useEffect, useState } from 'react';
import './App.css'
import Content from './Content'

//Note: You must run yarn install for the project to run
function App() {
  const title = "My Startup Progress"
  return (
    <div className="App">
      <header className="App-header">
        <div style={{width:'50%', textAlign: 'left'}}><h2>{title}</h2></div>
        <Content/>
      </header>
    </div>
  )
}



export default App