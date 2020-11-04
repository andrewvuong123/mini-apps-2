import React from 'react';

const Events = (props) => {

  return (
    <div>
      {props.events.map((event) =>
        <h3>{event.description}</h3>
      )}
    </div>
  )
};

export default Events;