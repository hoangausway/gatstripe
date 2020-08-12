import React from 'react'
import { useDispatch } from 'react-redux'
import { Subject } from 'rxjs'
import {
  map,
  startWith,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators'

export const useDispatchKeyUp = actionCreate => {
  const dispatch = useDispatch()
  // useMemo to not call everytime component rerenders
  const keyup$ = React.useMemo(() => new Subject(), [])
  const chars$ = React.useMemo(() => {
    return keyup$.pipe(
      map(e => e.target.value),
      debounceTime(300),
      distinctUntilChanged(),
      map(chars => chars.toLowerCase()),
      startWith('')
    )
  }, [])

  const keyupEmit = React.useCallback(e => keyup$.next(e), [])

  React.useEffect(() => {
    const sub = chars$.subscribe(chars => dispatch(actionCreate(chars)))
    return () => sub.unsubscribe()
  }, [])

  return keyupEmit
}
