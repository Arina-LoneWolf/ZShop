import React from 'react';
import NewProducts from './NewProducts';
import Banner from './Banner';

function HomePage() {
  return (
    <React.Fragment>
      <Banner />
      <NewProducts />
    </React.Fragment>
  );
}

export default HomePage;