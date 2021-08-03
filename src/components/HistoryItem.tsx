import React from 'react'
import './HistoryItem.css'
import { FaSearch, FaTrash } from 'react-icons/fa';

interface Props {
  index: number;
  city: string;
  country: string;
  date: string;
  onSearch: Function;
  onDelete: Function;
}

function HistoryItem({index, city, country, date, onSearch, onDelete}: Props) {
  return (
    <div className="history-item is-flex">
      <div className="history-number">
        {index}.
      </div>
      <div className="history-city-country">
        {city}, {country}
      </div>
      <div className="history-time">
        {date}
      </div>
      <div className="history-search">
        <button onClick={() => onSearch()} aria-label="Search"><FaSearch /></button>
      </div>
      <div className="history-delete">
        <button onClick={() => onDelete()} aria-label="Remove"><FaTrash /></button>
      </div>
    </div>
  )
}

export default HistoryItem
