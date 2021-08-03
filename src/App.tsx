import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Field from './components/Field'
import Result from './components/Result';
import Title from './components/Title'
import Response from './types/Response';
import moment from 'moment'
import History from './types/History';
import { v4 as generateId } from 'uuid';
import HistoryItem from './components/HistoryItem';

function App() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [history, setHistory] = useState<History[]>([]);
  const emptyResult = {
    city: '',
    country: '',
    weather: '',
    data: []
  }
  const [result, setResult] = useState({
    city: '',
    country: '',
    weather: '',
    data: [
      {label: 'Description', value: 'scattered clouds'},
      {label: 'Temperature', value: '303.15'},
      {label: 'Humidity', value: '58%'},
      {label: 'Time', value: '2021-03-16'},
    ]
  });
  const [error, setError] = useState('')

  useEffect(() => {
    setResult(emptyResult)
  }, [])

  async function fetchData(city: string, country: string) {
    let appid = import.meta.env.VITE_OPEN_WEATHER_API_KEY

    try {
      setResult(emptyResult)
      setError('')
      let data: Response = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appid}&units=metric`)).json()

      if (!!data) {
        if (data.weather.length > 0) {
          let weatherData = data.weather[0], mainData = data.main, date = moment(data.dt * 1000).format("YYYY-MM-DD hh:mm A")
  
          setResult({
            ...result,
            city,
            country,
            weather: weatherData.main,
            data: [
              {label: 'Description', value: weatherData.description},
              {label: 'Temperature', value: `${mainData.temp_min}\u00b0C ~ ${mainData.temp_max}\u00b0C`},
              {label: 'Humidity', value: mainData.humidity?.toString() + '%'},
              {label: 'Time', value: date},
            ]
          })
          setHistory([{
            city,
            country,
            date: moment(data.dt * 1000).format("hh:mm:ss A"),
            id: generateId()
          }, ...history])
  
        }
      }
    }
    catch(err) {
      setError("Not found")
    }
    
  }

  return (
    <div className="App">
      <Title title="Today's Weather" />
      <div className="is-flex">
        <Field label="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <Field label="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
        <button onClick={() => {
          fetchData(city, country)
        }}>Search</button>
        <button onClick={() => {
          setCity('')
          setCountry('')
          setResult(emptyResult)
          setError('')
        }}>Clear</button>
      </div>
      {result.data.length !== 0 && <Result {...result} />}
      {error.length > 0 && <div className="error">{error}</div>}
      <Title title="Search History" />
      {history.map((i, j) => <HistoryItem 
        key={i.id} 
        index={j + 1} 
        city={i.city} 
        country={i.country} 
        date={i.date}
        onSearch={() => {
          setCity(i.city)
          setCountry(i.country)
          fetchData(i.city, i.country)
        }}
        onDelete={() => {
          setHistory(history.filter(j => j.id !== i.id))
        }}
      />)}
      {history.length === 0 && <div className="no-history">No Record</div>}
    </div>
  )
}

export default App
