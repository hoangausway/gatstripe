import React from 'react'
import { Waypoint } from 'react-waypoint'

const Reveal = props => {
  const objIn = Object.keys(props.transProps).reduce(
    (prev, cur) => ({ ...prev, [cur]: props.transProps[cur][0] }),
    {}
  )
  const objOut = Object.keys(props.transProps).reduce(
    (prev, cur) => ({ ...prev, [cur]: props.transProps[cur][1] }),
    {}
  )
  // started with objOut state
  const [obj, setObj] = React.useState(objOut)

  return (
    <Waypoint onEnter={() => setObj(objIn)} onLeave={() => setObj(objOut)}>
      <div
        className={props.clsName}
        style={{ ...obj, transition: `${props.transition}` }}
      >
        {props.children}
      </div>
    </Waypoint>
  )
}
export default Reveal
