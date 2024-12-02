import { Outlet, useLocation } from 'react-router-dom';
import { Footer, Header } from '../components';

const Layout = () => {
  const url = useLocation();

  return (
    <>
      <Header />
      <div className="mainOutlet">
        <Outlet />
      </div>
      {url.pathname !== '/auth' &&
        url.pathname !== '/monitoring/request' &&
        url.pathname !== '/' &&
        url.pathname !== '/animal' &&
        url.pathname !== '/requestuser' && <Footer />}
    </>
  );
};

export default Layout;
