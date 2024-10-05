import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './css/LinkItems.css'


const LinkItems = () => {

    const location = useLocation();
  const getClassName = (path) => {
    if (location.pathname === path) {
      return 'color-button active';
    } else if (path !== '/' && location.pathname !== path && location.pathname !== '/') {
      return 'color-button inactive';
    } else {
      return 'color-button';
    }
  };

    return (
        <div className="button-container">
            <Link to={`/cars`} className={getClassName('/cars')}>Техника</Link>
            <Link to={`/to/`} className={getClassName('/to/')}>ТО</Link>
            <Link to={`/complaints/`} className={getClassName('/complaints/')}>Рекламации</Link>
        </div>
  );
};

export default LinkItems;