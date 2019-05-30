import React, { Component } from 'react';
import styles from './DayCell.module.sass'
import moment from 'moment';

class DayCell extends Component{

    render() {
        const options = this.props.options;

        if(options){
            return(
                <div className={[styles.cell, styles.action].join(' ')}
                     onClick={
                         () => this.props.onDaySelected(options.date, options.eventData)
                     }
                >

                    {options.isCurrent ? <div className={styles.currentDayLabel}/> : <div className={styles.emptyLabel}/>}

                    <span className={options.isWeekday ? styles.weekday : null}>
                        {moment(options.date).format("D")}
                    </span>

                    {options.eventData ? <div className={styles.eventDayLabel}/> : <div className={styles.emptyLabel}/>}
                </div>
            )
        }
        else {
            return (<div className={styles.cell}/>)
        }

    }
}

export default DayCell