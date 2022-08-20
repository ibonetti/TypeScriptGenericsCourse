import React from 'react';
import Moment from 'react-moment';

// import { Container } from './styles';
export interface IPerson {
  firstName: string;
  lastName: string;
  birthday: Date;
  eyeColor: string;
}

export function PeopleRenderer(props: IPerson) {
  const { firstName, lastName, birthday, eyeColor } = props;
  return (
    <div className='col-12 p-3'>
      <div className='card'>
        <div className='card-body'>
          <h3>
            👤 {firstName} {lastName}
            <ul>
              <li>
                Has <b>{eyeColor}</b> eyes
              </li>
              <li>
                🎂 Birthday:{' '}
                <b>
                  <Moment date={birthday} format='MMMM D, YYYY' />
                </b>
              </li>
            </ul>
          </h3>
        </div>
      </div>
    </div>
  );
}
