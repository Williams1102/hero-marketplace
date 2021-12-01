export const formatNumber = (num) => {
  const tmp = num.toFixed(2).replace(/./g, function (c, i, a) {
    return i > 0 && c !== '.' && (a.length - i) % 3 === 0 ? ',' + c : c
  })

  return `${tmp}`.split('.')[0]
}

export const NOTIFY = {
  WARNING: {
    LOGIN: 'You must connect wallet first !',
    LOAD_DATA: 'waiting to load data !',
    APPROVING: 'Approving',
    default: 'Have a transaction is pending!',
  },
  SUCCESS: {
    APPROVED: 'Approve successful!',
    OK: 'OK !',
    CANCEL_OFFER: 'Cancel Offer Successful!',
    OFFER: 'Offered Successful!',
    TAKE_OFFER: 'Accepted Offer!',
    DELIST: 'Delist Hero Successful!',
    LIST: 'List Hero Successful!',
    BUY: 'Bought Hero Successful!',
    default: 'Transaction is successful!',
    ITEMBUY: 'Bough Item Successful!',
    ITEMLIST: 'List Item Successful!',
    ITEMDELIST: 'Delist Item Successful!',
    STAKE: 'Stake Token Successful!',
    UNSTAKE: 'Unstake Token Successful!',
    CLAIM_REWARD: 'Claim reward Successful!',
    WITHDRAW: 'Withdraw Successful!',
  },
  ERROR: {
    default: 'ERROR !',
    LOAD_APPROVE_ERROR: 'Loading Approve info is error !',
  },
}

export const UnlockDay = new Date('10/15/2021')
