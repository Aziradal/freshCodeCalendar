import React, { Component } from 'react';
import DayCell from './DayCell/DayCell'
import styles from './Calendar.module.sass'
import moment from 'moment';
import arrowUp from './assets/chevron-up.png';
import arrowDown from './assets/chevron-down.png';

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calendarMode: "month",
            isHeaderSwitchHidden: true,
            selectedDate: moment(),
            eventsData: props.eventsData || null
        }
    }

    onPrevClick = () => {
        this.setState({
            selectedDate: moment(this.state.selectedDate).subtract(1, this.state.calendarMode)
        })
    };

    onNextClick = () => {
        this.setState({
            selectedDate: moment(this.state.selectedDate).add(1, this.state.calendarMode)
        })
    };

    onTitleClick = () => {
        this.setState({
            isHeaderSwitchHidden: !this.state.isHeaderSwitchHidden
        })
    };

    onCalendarModeChanged = (e) => {
        this.setState({
            calendarMode: e.target.name,
            isHeaderSwitchHidden: true,
            selectedDate: moment()
        });
    };

    renderHeader = () => {
        const date = this.state.selectedDate;
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        let prev = "PREV";
        let next = "NEXT";
        let title = "";

        if(this.state.calendarMode === "month"){
            prev = moment(date).subtract(1, "month").format("MMM");
            next = moment(date).add(1, "month").format("MMM");
            title = moment(date).format("MMMM");
        }
        else if(this.state.calendarMode === "week"){
            const startWeek = moment(date).startOf("week");
            const endWeek = moment(date).endOf("week");

            if(moment(startWeek).isSame(endWeek, "month")){
                title = moment(date).format("MMMM")
                    + " "
                    + moment(startWeek).format("D") + "-"
                    + moment(endWeek).format("D")
            }
            else{
                title = moment(startWeek).format("MMMM D")
                    + "-"
                    + moment(endWeek).format("MMMM D")
            }
        }
        return (
            <div className={styles.header}>
                <div className={styles.headerToolbar}>
                    <div className={styles.headerButton} onClick={this.onPrevClick}>
                        {prev.toUpperCase()}
                    </div>
                    <div className={styles.headerTitle} onClick={this.onTitleClick}>
                        <span>{title.toUpperCase()}</span>
                        <img src={this.state.isHeaderSwitchHidden ? arrowDown : arrowUp} alt="arrow"/>
                    </div>
                    <div className={styles.headerButton} onClick={this.onNextClick}>
                        {next.toUpperCase()}
                    </div>
                </div>
                {
                    this.state.isHeaderSwitchHidden ? null :
                    <div className={styles.headerSwitch}>
                        <button name="week" className={styles.headerSwitchButton} onClick={this.onCalendarModeChanged}>
                            This week
                        </button>
                        <button name="month" className={styles.headerSwitchButton} onClick={this.onCalendarModeChanged}>
                            This month
                        </button>
                    </div>
                }
                <div className={styles.headerDaysBar}>{days.map((e, i) => <span key={i}>{e}</span>)}</div>
            </div>
        )
    };

    renderWeek = (date) => {
        const firstDayOfMonth =  moment(this.state.selectedDate).startOf('month');
        const lastDayOfMonth = moment(this.state.selectedDate).endOf('month');
        const renderArray = [];
        for (let i=0; i<7; i++){
            let day = moment(date).weekday(i);

            if(moment(day).isBetween(firstDayOfMonth, lastDayOfMonth, "day", '[]')
                || this.state.calendarMode === "week") {
                    let dayProp = {
                        date: day,
                        isWeekday: false,
                        isCurrent: false,
                        eventData: false,
                    };

                    if(moment(day).isSame(moment(), "day")){
                        dayProp.isCurrent = true;
                    }
                    if(i === 0 || i === 6){
                        dayProp.isWeekday = true;
                    }

                    dayProp.eventData = this.getEvents(day);

                    renderArray.push(
                        <DayCell key={day} options = {dayProp} onDaySelected={this.props.onDaySelected}/>
                    )
            }
            else {
                renderArray.push(<DayCell key={day} />)
            }
        }
        return (
            <div key = {moment(date).week()} className={styles.weeksRow}>
                {renderArray}
            </div>
        );
    };

    calculateWeeks = (fDay, lDay) => {
        const firsWeek = moment(fDay).week();
        let lastWeek = moment(lDay).week();
        if(lastWeek < firsWeek){
            lastWeek += moment(lDay).weeksInYear();
        }
        return lastWeek - firsWeek;
    };

    getEvents = (day) => {
        return this.state.eventsData.find(e => e.date === moment(day).format("D.MM.YYYY"));
    };

    renderMonth = () => {
        const firsDayOfMonth = moment(this.state.selectedDate).startOf('month');
        const lastDayOfMonth = moment(this.state.selectedDate).endOf('month');
        const renderArray = [];

        const nWeeks = this.calculateWeeks(firsDayOfMonth, lastDayOfMonth);

        for(let i = 0; i<=nWeeks; i++){
            renderArray.push(
                this.renderWeek(moment(firsDayOfMonth).add(i, "week"))
            );
        }
        return renderArray;
    };

    renderCalendarBody = () => {
        let render = [];

        switch (this.state.calendarMode) {
            case "month":
                render = this.renderMonth();
                break;
            case "week":
                render = this.renderWeek(this.state.selectedDate);
                break;
            default:
                render = this.renderMonth();
                break;
        }

        return <div className={styles.calendarBody}>
            {render}
        </div>
    };

    render() {
        return (
            <div className={styles.container}>
                {this.renderHeader()}
                {this.renderCalendarBody()}
            </div>
        )
    }
}


export default Calendar