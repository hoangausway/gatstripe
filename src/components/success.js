import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from '@reach/router'

import style from './success.module.scss'
import { aCartReset } from '../state/cart-reducer'
import { aChkoutUpdate, getLatestChkout } from '../state/checkout-reducer'

class ErrorId extends Error {}
class ErrorRequest extends Error {}
const reject = err => Promise.reject(err)

const Success = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [successChkout, setSuccessChkout] = React.useState({})

  // reset cart
  React.useEffect(() => {
    dispatch(aCartReset())
  }, [])

  React.useEffect(() => {
    getLatestChkout()
      .then(chkout => chkout.id)
      .then(purchaseById(dispatch))
      .then(showPurchase(setSuccessChkout))
      .catch(err => console.log(err.message))
  }, [])

  return (
    <div className={style.success}>
      <h3>Success</h3>
      <div onClick={e => nav('../list')}>To List</div>
      <br />
      <div>
        <p>CART</p>
        <p>ID: {successChkout.id}</p>
        <br />
        <p>EMAIL: {successChkout.userEmail}</p>
        <br />
        <p>LOCATION: {successChkout.locAddress}</p>
        <br />
        <div>
          <p>ITEMS</p>
          <div>
            {successChkout.cart &&
              successChkout.cart.map(i => (
                <p key={i.productId}>{`${i.qty} x ${i.name}`}</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Success

// Helper - logics
const showPurchase = setSuccessChkout => chkout => setSuccessChkout(chkout)

// Helpers - API
// purchaseLatest:: email -> chkout or reject(error)
const purchaseById = dispatch => chkoutId => {
  return window.fetch(urlPurchaseById, reqPurchaseById(chkoutId)).then(res => {
    if (res.status === 200) {
      return res.json().then(chkout => {
        console.log('res.json', chkout)
        dispatch(aChkoutUpdate(chkout))
        return chkout
      })
    }
    if (res.status === 400) return reject(new ErrorId(res.statusText))
    return reject(new ErrorRequest(res.statusText))
  })
}

const urlPurchaseById = '/.netlify/functions/purchase-by-id'
const reqPurchaseById = id => ({
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  mode: 'cors',
  method: 'POST',
  body: JSON.stringify({ id })
})
