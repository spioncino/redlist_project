import { Outlet } from 'react-router-dom';
import { Header } from '../components';

const Layout = () => {
  return (
    <>
      <Header />
      <div className="mainOutlet">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
