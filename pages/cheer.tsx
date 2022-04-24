import React, { ReactElement } from 'react';
import CheerCheeredList from '../components/CheerCheeredList';
import CheerProductList from '../components/CheerProductList';
import Layout from '../layouts/Layout';
import { useAuth } from '../utils/userContext';

const cheer = () => {
  const { user } = useAuth();
  return (
    <div>
      {user && <CheerProductList />}
      {user && <CheerCheeredList />}
    </div>
  );
};

export default cheer;
cheer.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
