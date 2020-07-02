import React from 'react';
import spinner from '../../images/spinner.gif';

const Loading = () => {
  return (
    <div>
      <img src={spinner} alt='loading' />
    </div>
  );
};

export default Loading;
