import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.css';


function Kkk() {
  return (
    <h1 className="underline">
      Hello world!
    </h1>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <Kkk />
  </React.StrictMode>,
)
