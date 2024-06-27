
import Add from "./components/Add";
import Header from "./components/Header";
import Table from "./components/Table";
import { Routes, Route, BrowserRouter } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Table />} />
          <Route path='add' element={<Add />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
