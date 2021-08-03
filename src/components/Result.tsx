import React from 'react'
import './Result.css'

interface Props {
  city: string;
  country: string;
  weather: string;
  data: {label: string, value: string}[]
}

function Result({city, country, weather, data}: Props) {
  return (
    <div className="result">
      <p className="city-country">{city}, {country}</p>
      <p className="weather">{weather}</p>
      <table>
        <tbody>
          {data.map(d => <tr key={d.label}>
            <td>{d.label}: </td>
            <td>{d.value}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Result
