import React from 'react';
import classnames from 'classnames';

export default function () {
  return (
    <header>
      <div className={classnames('header','header-space')}>
        {/* <div className={classnames('logo', 'column-5')}>
          <center>CLARK</center>
        </div> */}
        <div className={classnames('navigation', 'column-12')}>
          <center><h4>CLARK's Questionnaire App</h4></center> 
        </div>
      </div>
    </header>
  )
}