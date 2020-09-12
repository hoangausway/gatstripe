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

  const handler = selected => dispatch(aLocationUpdate(toLocation(selected)))

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
const toOption = loc => ({ value: loc.locId, label: loc.address })

const toLocation = option => ({ locId: option.value, address: option.label })

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
