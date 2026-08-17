"use strict";

const $ = selector => document.querySelector(selector);

const UI = {
    dateContainer: $('.date'),
    weekDay: $('.week-day'),
    monthDay: $('.month-day'),
    year: $('.year'),
    timeContainer: $('.time'),
    currentTime: $('.current-time'),
    amPm: $('.am-pm'),
    toggleFormat: $('.toggle-format'),
};

const zerofy = data => String(data).padStart(2, '0');

const formatDay = timestamp => {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'long'
    }).format(timestamp);
};

const formatMonthDay = timestamp => {
    return Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric'
    }).format(timestamp);
};

const formatYear = timestamp => {
    return Intl.DateTimeFormat('en-US', {
        year: 'numeric'
    }).format(timestamp);
};

const formatHours = (hours, standard = true) => {
    if(standard) {
        hours = (hours % 12) || 12;
    }
    return zerofy(hours);
};

const formatMinutes = minutes => zerofy(minutes);

const formatSeconds = seconds => zerofy(seconds);

const formatAmPm = hours => hours >= 12 ? 'PM' : 'AM';

const updateDate = timestamp => {
    UI.weekDay.textContent = formatDay(timestamp);
    UI.monthDay.textContent = formatMonthDay(timestamp);
    UI.year.textContent = formatYear(timestamp);
    UI.dateContainer.dateTime = timestamp.toISOString().split('T')[0];
};

const updateTime = (clockDisplay, timestamp) => {
    UI.timeContainer.textContent = clockDisplay;
    UI.timeContainer.dateTime = timestamp.toISOString();
};

const showDateTime = () => {
    const timestamp = new Date();

    const currentTime = [
        formatHours(timestamp.getHours()),
        formatMinutes(timestamp.getMinutes()),
        formatSeconds(timestamp.getSeconds()),
    ];

    const clockDisplay = currentTime.join(':');
    
    updateDate(timestamp);
    updateTime(clockDisplay, timestamp);
};

showDateTime();
setInterval(showDateTime, 1000);
