import React, { useRef, useState } from 'react'
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap'
import userAPI from 'actions/accounts'
import { toast } from 'react-toastify'
import { NOTIFY } from 'constant'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from 'redux/user/user.selectors'
// import { networkType } from "../index";
import { signRandomMessage } from 'services/contracts/accounts'
const Withdraw = ({ network, setNetwork, addTransaction, transactionType }) => {
  const recipientRef = useRef(null)
  const valueRef = useRef(null)
  const user = useSelector(selectCurrentUser)
  console.log(user)
  const [, setAmountReceived] = useState(0)
  const [inputValue, setInputValue] = useState(null)
  const handleInput = (event) => {
    console.log(event)
    console.log(event.target.value)
    if (+event.target.value === 0) {
      console.log('da chay')
      setInputValue('')
    } else {
      setInputValue(event.target.value)
    }
  }
  const withdrawKaby = async () => {
    try {
      const sign = await signRandomMessage()
      const body = {
        toAddress: recipientRef.current.value,
        value: Number(valueRef.current.value),
        networkId: network,
      }
      const header = {
        sign: sign.data?.signature,
        message: sign.data?.message,
      }
      const res = await userAPI.addWithdrawTransaction(header, body)
      if (res.status === 'success') {
        toast.info(NOTIFY.SUCCESS.default)
        addTransaction({
          amount: res.data?.amountReceived,
          from: res.data?.fromAddress,
          fee: res.data?.fee,
          to: res.data?.toAddress,
          transactionType: transactionType.withdraw,
          transactionHash: res.data?.tx,
        })
        setAmountReceived(res.data?.amountReceived)
      } else {
        toast.error(res.data)
      }
    } catch (e) {
      console.error(e)
      toast.error(NOTIFY.ERROR.default)
    }
  }

  return (
    <div className="column-flex-center  ">
      <div className="column-flex-left width-600 "></div>
      <div className="system-address">
        <div className=" column-flex-right">
          <Form>
            <Form.Label> Recipient </Form.Label>
            <InputGroup>
              <FormControl ref={recipientRef} defaultValue={user?.address} disabled />
            </InputGroup>
          </Form>
          <Form>
            <Form.Label> Amount (2000 - 100000 KGT) </Form.Label>
            <InputGroup>
              <FormControl
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key) || event.target.value === 0) {
                    event.preventDefault()
                  }
                }}
                onInput={(event) => handleInput(event)}
                value={inputValue}
                type="number"
                ref={valueRef}
              />
            </InputGroup>
          </Form>
          <div className="column-flex-right-children">
            <span>FEES: 60 KGT</span>
            {/* <span>Amount Received : {amountReceived} KGT</span> */}
            <Button onClick={withdrawKaby} className="wallet-action-btn color-btn mt-3">
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Withdraw
