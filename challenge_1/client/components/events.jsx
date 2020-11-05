import React from 'react';

const Events = (props) => {

  return (
    <div>
      {props.events.map((event) =>
        <div className='event'>
          <h3 className='title'>{event.category2}: <span className='date'> {event.date}</span> </h3>
          <p className='text'>{event.description}</p>
        </div>

      )}
    </div>
  )
};

export default Events;