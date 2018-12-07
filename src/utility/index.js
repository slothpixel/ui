/* eslint-disable no-param-reassign */
import store from '../store';

export default function addCommas(val) {
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
