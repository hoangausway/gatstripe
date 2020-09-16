import React from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { Subject } from 'rxjs'
import {
  map,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators'

export const flattenNodes = nodes => nodes.map(n => n.node)

export const searchQuery = (index, needle) => {
  if (!index) return []
  return index.search(needle)
}

export const useKeyupAction = actionCreate => {
  const dispatch = useDispatch()
  // useMemo to not call everytime component rerenders
  const keyup$ = React.useMemo(() => new Subject(), [])
  const chars$ = React.useMemo(() => {
    return keyup$.pipe(
      map(e => e.target.value),
      debounceTime(300),
      distinctUntilChanged()
      // ,
      // map(chars => chars.toLowerCase()),
      // startWith('')
    )
  }, [])

  const keyupEmit = React.useCallback(e => keyup$.next(e), [])

  React.useEffect(() => {
    const sub = chars$.subscribe(chars => dispatch(actionCreate(chars)))
    return () => sub.unsubscribe()
  }, [])

  return keyupEmit
}

export const toCategories = items => {
  const cs = _.groupBy(items, item => item.category)
  return Object.keys(cs)
    .sort()
    .map(key => {
      const ps = cs[key].sort(sortProductName)
      return [key, ps]
    })
}

const sortProductName = (a, b) =>
  a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
