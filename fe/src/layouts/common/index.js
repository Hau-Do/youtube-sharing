import Header from 'components/organisms/header';
import React from 'react';

const CommonLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default CommonLayout;
