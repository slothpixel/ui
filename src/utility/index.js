/* eslint-disable no-param-reassign */
import React from 'react';
import store from '../store';
import { KDA } from '../components/Visualizations';

export function addCommas(val) {
  if (typeof val !== 'number') return val;
  while (/(\d+)(\d{3})/.test(val.toString())) {
    val = val.toString().replace(/(\d+)(\d{3})/, '$1,$2');
  }
  return val;
}

export function abbreviateNumber(num) {
  const { strings } = store.getState().app;
  if (!num) {
    return '-';
  } if (num >= 1000 && num < 1000000) {
    return `${Number((num / 1000).toFixed(1))}k`;
  } if (num >= 1000000 && num < 1000000000) {
    return `${Number((num / 1000000).toFixed(1))}${strings.abbr_million}`;
  } if (num >= 1000000000 && num < 1000000000000) {
    return `${Number((num / 1000000000).toFixed(1))}${strings.abbr_billion}`;
  } if (num >= 1000000000000) {
    return `${Number((num / 1000000000000).toFixed(1))}${strings.abbr_trillion}`;
  }

  return num.toFixed(0);
}

/*
* Get stats for games
* Pass a null in the fields array for a linebreak
 */
export const StatFields = ({ strings, fields, data }) => fields.map((field) => {
  if (field === null) {
    return <br />;
  }
  return (
    <p>
      <span style={{ fontWeight: 'bold' }}>{strings[`th_${field}`] || field}</span>
      <span>
        {`: ${addCommas(data[field])}`}
      </span>
    </p>
  );
});

/**
 * Transformations of table cell data to display values.
 * These functions are intended to be used as the displayFn property in table columns.
 * This is why they all take (row, col, field)
 * */
// TODO - these more complicated ones should be factored out into components
export const transformations = {
  kda: (row, col, field) => <KDA kills={field} deaths={row.deaths} assists={row.assists || 0} />,
};

export const defaultSort = (array, sortState, sortField, sortFn) => array.sort((a, b) => {
  const sortFnExists = typeof sortFn === 'function';
  const aVal = (sortFnExists ? sortFn(a) : a[sortField]) || 0;
  const bVal = (sortFnExists ? sortFn(b) : b[sortField]) || 0;
  const desc = aVal < bVal ? 1 : -1;
  const asc = aVal < bVal ? -1 : 1;
  return sortState === 'desc' ? desc : asc;
});

export const SORT_ENUM = {
  0: 'desc',
  1: 'asc',
  asc: 1,
  desc: 0,
  next: state => SORT_ENUM[(state >= 1 ? 0 : state + 1)],
};

// handles table cell custom and default styling
export function getColStyle(column) {
  return {
    textAlign: column.textAlign || 'initial',
    paddingRight: column.paddingRight !== undefined ? column.paddingRight : 8,
    paddingLeft: column.paddingLeft !== undefined ? column.paddingLeft : 8,
    width: column.key === 'heroTd' && !column.width ? '1px' : column.width,
    borderLeft: column.borderLeft,
    borderRight: column.borderRight,
    backgroundColor: column.backgroundColor,
    direction: column.textAlign === 'right' && 'rtl',
  };
}

export function isLeapYear(date) {
  const year = date.getFullYear();
  if ((year & 3) !== 0) { // eslint-disable-line no-bitwise
    return false;
  }
  return ((year % 100) !== 0 || (year % 400) === 0);
}

// Get Day of Year
export function getDOY(date) {
  const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const mn = date.getMonth();
  const dn = date.getDate();
  let dayOfYear = dayCount[mn] + dn;
  if (mn > 1 && isLeapYear(date)) {
    dayOfYear += 1;
  }
  return dayOfYear;
}

export function getLocalizedDate(date) {
  const navigatorLanguage = (navigator.languages && navigator.languages.length)
    ? navigator.languages[0]
    : navigator.userLanguage
    || navigator.language
    || navigator.browserLanguage;
  const langCode = navigatorLanguage || window.localStorage.getItem('localization') || 'en-US';
  return new Date(date).toLocaleDateString(langCode, { hour: 'numeric', minute: 'numeric', second: 'numeric' });
}

export function getLocalizedWeekdayStrings() {
  const langCode = window.localStorage.getItem('localization') || 'en-US';
  const d = new Date();
  return [...Array(7)].map((_, i) => new Date(d.setDate(d.getDate() - d.getDay() + i)).toLocaleDateString(langCode, { weekday: 'short' }));
}

export function getLocalizedMonthStrings() {
  const langCode = window.localStorage.getItem('localization') || 'en-US';
  const d = new Date();
  return [...Array(12)].map((_, i) => new Date(d.setMonth(i)).toLocaleDateString(langCode, { month: 'short' }));
}
