import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'

import style from './location.module.scss'
import {
  locationInitialState,
  aLocationUpdate
} from '../state/location-reducer'

const Location = () => {
  const dispatch = useDispatch()
  const location = useSelector(state => state.location)
  const locations = useSelector(state => state.locations)
  const options = [toOption(locationInitialState)].concat(
    locations.map(toOption)
  )

  const handler = selected => dispatch(aLocationUpdate(toLocation(locations)(selected)))

  return (
    <div className={style.location}>
      <form>
        <Select
          styles={customStyles}
          value={toOption(location)}
          options={options}
          onChange={handler}
        />
      </form>
    </div>
  )
}

export default Location

// Helpers
const toOption = loc => ({ value: loc.id, label: loc.address })

const toLocation = locations => option => {
  const found = locations.find(l => l.id === option.value)
  if (!found) return locationInitialState
  return {
    id: found.id,
    address: found.address,
    phone: found.phone,
    email: found.email
  }
}

// Helpers - CSS
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.75rem',
    fontFamily: 'Helvetica, Arial, sans-serif'
  }),
  control: (provided, state) => ({
    ...provided,
    fontSize: '0.75rem',
    fontFamily: 'Helvetica, Arial, sans-serif'
  })
}
