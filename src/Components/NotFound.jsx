import React from 'react';
import RemindersItem from './RemindersItem';

const NotFound = () => {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>The requested page could not be found.</p>
      <h1>OOOPSZZZ</h1>
      <p>The page you are looking for does not exist.</p>
      <RemindersItem />
    </div>
  );
};

export default NotFound;
