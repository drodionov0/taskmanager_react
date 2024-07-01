
import Add from "./components/add";
import EditTask from "./components/EditTask";
import Header from "./components/header";
import Table from "./components/table";
import { Routes, Route, BrowserRouter } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Table />} />
          <Route path='add' element={<Add />} />
          <Route path="/edit/:taskId" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
