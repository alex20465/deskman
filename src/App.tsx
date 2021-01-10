import './App.css';
import 'antd/dist/antd.css';
import Router from './Router';
import { HashRouter as BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
