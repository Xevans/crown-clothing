import { Outlet } from 'react-router-dom'; // for rendering nested route components
import Directory from '../../components/directory/directory.component';

const Home = () => {
    return (
      <div>
        <Directory />
      </div>
    );
  }

  export default Home;