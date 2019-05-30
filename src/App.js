import React , {Component} from 'react';
import styles from './App.module.sass';
import moment from 'moment';
import Calendar from './components/Calendar/Calendar';
import EventList from './components/EventList/EventList';


const eventsData = [
    {
        date: '30.05.2019',
        events: [
            {name:'event 1',body:'event body 1', time:'13:00'},
            {name:'event 2',body:'event body 2 event body 2 event body 2 event body 2 event body 2 event body 2', time:'11:00'},
            {name:'event 3',body:'event body 3', time:'11:00'}
        ]
    },
    {
        date: '1.06.2019',
        events:[
            {name:'event 4',body:'event 4', time:'9:00'}
        ]
    },
    {
        date: '5.06.2019',
        events:[
            {name:'Birthday',body:'Celebrate', time:'9:00'}
        ]
    },
    {
        date: '8.06.2019',
        events:[
            {name:'event 5',body:'event 5', time:'9:00'}
        ]
    }

];

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
        selectedDay: {
            data: moment(),
            events: (eventsData.find(e => e.date === moment().format("D.MM.YYYY"))).events
        }
    }
  }

  onDaySelected = (day, eventData) => {
      let events = {
          data: day,
          events: eventData ? eventData.events : null
      };

      this.setState({
          selectedDay: events
      })
  };

  render() {
      return (
        <div className={styles.container}>
            <Calendar eventsData={eventsData} onDaySelected={this.onDaySelected}/>
            <EventList selectedDay={this.state.selectedDay} />
        </div>
    )
  }
}

export default App;
