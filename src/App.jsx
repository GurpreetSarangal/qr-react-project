import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";


import BarcodeScanner from './components/BarcodeScanner'

function App() {
  return (
    <div className="App">
      <div className="App-header">
      
        <Router>
          <div>

            <Routes>
              
              <Route path="/" element={<BarcodeScanner />} >
              
              </Route>
            </Routes>

          </div>
        </Router>

      </div>
    </div>
  );
}

export default App;