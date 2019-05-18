import React from 'react';
import moment from 'moment';
import {db} from './db';
import './App.css';

// https://momentjs.com/docs/#/displaying/calendar-time/
function fromNow(time) {
  const localTime = moment.utc(time).local();
  return `${localTime.calendar()} (${localTime.fromNow()})`;
}

const EventItem = ({title, details, dayOfSeason, date}) => (
  <section className="event-item">
    <h3>{title}</h3>
    <p>{details}</p>
    <div>
      When: {fromNow(date)}
      <br />
      Day of Season: {dayOfSeason}
    </div>
  </section>
)

function App() {
  return (
    <div className="App">
      {db.map((event, i) => <EventItem key={i} {...event} />)}
    </div>
  );
}

export default App;
