import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLunr } from 'react-lunr'
import lrStripeIndex from '../../static/lr-stripe-index.json'

const { index, store } = lrStripeIndex


const LunrTest = () => {
  const needle = useSelector(state => state.needle)
  const results = useLunr(needle, index, store)

  React.useEffect(() => {
    console.log(results.length)
    console.log(results)
  }, [])

  return (
    <div>
      {results.map(result => (
        <p key={result.id}>{result.name}</p>
      ))}
    </div>
  )
}

export default LunrTest
