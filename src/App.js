import './App.css';
import Routes from './routes'
import { DndProvider } from 'react-dnd'
import  HTML5Backend  from 'react-dnd-html5-backend'
function App() {
  return (
    <DndProvider backend={HTML5Backend} >
    <div className="app">
      <Routes/>
    </div>
    </DndProvider>
  );
}

export default App;
