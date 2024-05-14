import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = (props) => {
  if (props.stats.total === 0){
    return (<p>No feedback given</p>)
  }
  return (
    <>
    <StatisticLine text = "good" value = {props.stats.good}/>
    <StatisticLine text = "neutral" value = {props.stats.neutral}/>
    <StatisticLine text = "bad" value = {props.stats.bad}/>
    <StatisticLine text = "average" value = {props.stats.average}/>
    <StatisticLine text = "positive" value = {props.stats.positive + "%"}/>
    </>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    average: (good-bad)/total,
    positive: (total-neutral-bad)*100/total
  }

  const HandleGood = () => {
    const updatedGood = good+1 
    setGood(updatedGood)
    setTotal(updatedGood+bad+neutral)
  }
  const HandleNeutral = () => {
    const updatedNeutral = neutral+1 
    setNeutral(updatedNeutral)
    setTotal(good+bad+updatedNeutral)
  }
  const HandleBad = () => {
    const updatedBad = bad+1 
    setBad(updatedBad)
    setTotal(good+updatedBad+neutral)
  }


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick = {HandleGood} text ='good' />
      <Button onClick = {HandleNeutral} text ='neutral' />
      <Button onClick = {HandleBad} text ='bad' />
      <h2>statistics</h2>
      <Statistics stats={stats} />
    </div>
  )
}

export default App