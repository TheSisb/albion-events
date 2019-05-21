import React from 'react';
import moment from 'moment';
import {db} from './db';
import './App.css';


const DEFAULT_VALUE = "2019-05-20T22:00";

// https://momentjs.com/docs/#/displaying/calendar-time/
function fromNow(time) {
  const localTime = moment.utc(time).local();
  return `${localTime.calendar(null, {
    sameDay: '[Today] [at] LT',
    nextDay: '[Tomorrow] [at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday] [at] LT',
    lastWeek: '[Last] [at] LT',
    sameElse: 'DD/MM/YYYY [at] LT'
  })} (${localTime.fromNow()})`;
}

const EventItem = ({title, details, dayOfSeason, date}) => (
  <li className="event-item">
    <div className="event-title">{title}</div>
    <div className="event-details">{details}</div>
    <div className="event-time">
      When: {fromNow(date)}
      <br />
      Day of Season: {dayOfSeason}
    </div>
  </li>
)

class ConverterSection extends React.Component {
  state = {
    localTime: fromNow(moment.utc(DEFAULT_VALUE)),
  }

  handleTimeChange = (event) => {
    const { value } = event.target;
    console.log(value);
    this.setState({
      localTime: fromNow(moment.utc(value))
    });
  }

  render() {
    const {localTime} = this.state;
    return (
      <div className="converter">
        <h2>UTC to LocalTime Converter</h2>
        <p>
          <label>Enter a UTC time:</label>
          <input defaultValue={DEFAULT_VALUE} type="datetime-local" onChange={this.handleTimeChange} />
        </p>
        {localTime !== '' ? (
          <p>
            <label>LocalTime:</label>
            <span>{localTime}</span>
          </p>
        ) : null}
      </div>
    );
  }
}



const EventListSection = () => {
  return (
    <section className="events">
      <h2>Event List</h2>
      <ol>
        {db.map((event, i) => <EventItem key={i} {...event} />)}
      </ol>
    </section>
  );
}

function App() {
  return (
    <div className="App">
      <ConverterSection />
      <hr />
      <EventListSection />
    </div>
  );
}

export default App;
