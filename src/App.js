import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component';
import Home from "./routes/home/home.component";



const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}> {/*At base URL, render Navigation component*/}
        <Route index element={<Home />} />  {/* index tells react to render Home with the component at the parent route (navigation). It will render at the outlet tag */}
          {/* Nested routes are children, rather than siblings */} 
          {/* siblings can start with '/', but children must be '...parent/child_name' */}
      </Route>

      
    </Routes>
  );
}

export default App;
