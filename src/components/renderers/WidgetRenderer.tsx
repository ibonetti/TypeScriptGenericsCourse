import React from 'react';
import Moment from 'react-moment';

// import { Container } from './styles';

export interface IWidgetRendererProps {
  isSpecialCard: boolean;
  title: string;
  description: string;
  rating: number;
  id: number;
  created: Date;
  updated: Date;
}

export function WidgetRenderer(props: IWidgetRendererProps) {
  const { isSpecialCard, title, description, rating, id, created, updated } =
    props;
  return (
    <div className='col-12 p-3'>
      <div className={isSpecialCard ? 'card specialCard' : 'card'}>
        <div className='card-body'>
          <h1 className='card-tittle'>{title}</h1>
          <p className='card-text'>{description}</p>
          <p className='card-text font-italic'>Rating: {rating}/10</p>
        </div>
        <div className='card-footer text-muted text-right'>
          <span className='floated-left'>#{id}</span>
          created:&nbsp;
          <Moment fromNow date={created} />
          &nbsp; updated:&nbsp;
          <Moment fromNow date={updated} />
        </div>
      </div>
    </div>
  );
}
