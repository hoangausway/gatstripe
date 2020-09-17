import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { aMessageUpdated } from '../state/message-reducer'
import style from './drawer.module.scss'

const HEIGHT = '2rem'

const MessageDrawer = props => {
  const dispatch = useDispatch()
  const [text, level] = useSelector(state => state.message)
  const [h, setH] = React.useState(props.h || 0)

  React.useEffect(() => {
    setH(text === '' ? '0' : HEIGHT)
  }, [text])

  return (
    <div className={style.drawer} style={{ height: `${h}` }}>
      <p className={level && level > 0 ? style.error : style.normal}>{text}</p>
      <div
        className={style.button}
        onClick={() => dispatch(aMessageUpdated(['', 0]))}
      >
        Dismiss
      </div>
    </div>
  )
}

export default MessageDrawer
