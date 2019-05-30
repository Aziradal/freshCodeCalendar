import React , {Component} from 'react';
import styles from './EventList.module.sass';
import moment from 'moment';

class EventList extends Component{

    renderEvents = (events) => {

        if(events){
           return events.map((element, index) =>
                <div key={index}
                     className={
                         [
                             styles.eventBox,
                             (index%2 === 0) ? styles.backgroundBlue : styles.backgroundGrey].join(' ')
                     }
                >
                    <div className={styles.eventTitleBox}>
                        <span>
                            {element.name.toUpperCase()}
                        </span>
                        <span>
                            {element.time}
                        </span>
                    </div>
                    <div className={styles.eventBody}>
                        <span>{element.body}</span>
                    </div>
                </div>
            )
        }
        else {
            return null
        }
    };


    render() {
        const selectedDay = this.props.selectedDay;

        return(
            <div className={styles.container}>
                <div className={styles.dayTextBox}>
                    <span>
                        {moment(selectedDay.data).format("dddd, DD MMMM").toUpperCase()}
                    </span>
                </div>
                {this.renderEvents(selectedDay.events)}
            </div>
        )
    }
}

export default EventList