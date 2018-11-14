import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import * as router from '../utils/survey.constant';

export default function () {
  return (
    <header>
      <div className={classnames('header', 'header-space')}>
        {/* <div className={classnames('logo', 'column-5')}>
          <center>CLARK</center>
        </div> */}
        <div className={classnames('header-navigation', 'column-12')}>
          <center>
            <span>
              <Link
                to={router.HOME_PAGE}
                className={classnames('header-link')}
              >
                CLARKs
          </Link>
            </span>
          </center>
        </div>
      </div>
    </header>
  )
}