import logo from './logo.svg';
import './App.css';
import FilteredPage from './pages/FilteredPage';
import FilteredData from './pages/FilteredData';

function App() {
  return (
    <div className="flex lg:flex-row flex-col justify-between tracking-wide bg-[#f3f3f8]">
     <FilteredPage />
     <FilteredData />
    </div>
  );
}

export default App;
