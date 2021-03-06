import { v4 as uuidv4 } from 'uuid'
import { set, get } from 'idb-keyval'

const ChkoutStatus = {
  CHKOUT_CREATED: 'created',
  CHKOUT_UPDATED: 'updated'
}

// checkout shape:
export const chkoutInitialState = {}
export const createChkout = (contact, location, items) => ({
  chkoutId: uuidv4(),
  contact,
  location,
  items, // [..., {itemId, qty, extras, options, priceId, productId}]
  tsCreated: Date.now(), // timestamp
  tsCharged: null,
  tsCharging: null
})

const aChkoutCreated = chkout => ({
  type: ChkoutStatus.CHKOUT_CREATED,
  payload: chkout
})

const aChkoutUpdated = chkout => ({
  type: ChkoutStatus.CHKOUT_UPDATED,
  payload: chkout
})

// async util function
export const getLatestChkout = () => {
  return getChkouts().then(ret => ret[0])
}

// asynchronous action creators
export const aChkoutCreate = chkout => dispatch =>
  setChkout(chkout).then(chkout => dispatch(aChkoutCreated(chkout)))

export const aChkoutUpdate = chkout => dispatch =>
  update(chkout).then(chkout => dispatch(aChkoutUpdated(chkout)))

export default (state = chkoutInitialState, { type, payload }) => {
  switch (type) {
    case ChkoutStatus.CHKOUT_CREATED:
    case ChkoutStatus.CHKOUT_UPDATED:
      return payload
    default:
      return state
  }
}

// Helpers
// getChkouts:: () -> Promise.resolve(chkouts)
const getChkouts = () => {
  return get('chkouts').then(ret => {
    if (!ret) {
      return set('chkouts', [chkoutInitialState]).then(() =>
        Promise.resolve([chkoutInitialState])
      )
    }
    return Promise.resolve(ret)
  })
}

// setChkout:: chkout -> Promise.resolve(chkout)
const setChkout = chkout => {
  return getChkouts()
    .then(chkouts => set('chkouts', [chkout].concat(chkouts)))
    .then(() => Promise.resolve(chkout))
}

const update = chkout =>
  getChkouts()
    .then(ret =>
      ret.map(c =>
        c.id !== chkout.id ? c : { ...c, tsCharged: chkout.tsCharged }
      )
    )
    .then(newArr => set('chkouts', newArr))
    .then(_ => chkout)
