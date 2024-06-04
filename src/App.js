import { Routes, Route } from 'react-router-dom'
import Navigation from './routes/navigation/navigation.component';
import Home from "./routes/home/home.component";
import Authentication from './routes/authentication/authentication.components';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';

const App = () => {

  return (
    <Routes>
      <Route path='/' element={<Navigation />}> {/*At base URL, render Navigation component*/}
        {/* Index tells react to render this component with the component at the parent route (navigation) [sibling routes require a unique url]. It will render at direct parent's outlet tag */}
        <Route index element={<Home />} />  
        <Route path='shop' element={<Shop />}/>
        <Route path='auth' element={<Authentication />}/>
        <Route path='checkout' element={<Checkout />} />

          {/* Nested routes are children, rather than siblings */} 
          {/* siblings can start with '/', but children must be '...parent/child_name' */}
      </Route>

      
    </Routes>
  );
}

export default App;
