import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import Prediction from './components/Prediction';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>
    </Router>
  );
}

export default App;