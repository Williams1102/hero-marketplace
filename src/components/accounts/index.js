import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from 'redux/user/user.actions'
import { selectCurrentUser } from 'redux/user/user.selectors'
import { useWeb3React } from '@web3-react/core'
import { Button, Row } from 'react-bootstrap'
import Moment from 'react-moment'
import TableScrollbar from 'react-table-scrollbar'
import TransactionLog from 'components/Popup/TransactionLog'
import Accounts from 'actions/accounts'
import './accounts.scss'
import Deposit from './deposit'
import Withdraw from './withdraw'
import { getKabyGameTokenAddress, getKabyGameTokenABI } from 'constant/contract/kabyGameToken'
import { getInfoWallet } from 'services/contracts/wallet'
import { systemDepositWallet, systemDepositWalletProduction } from 'constant/contract/usersSystem'
import Web3 from 'web3'
import Pagination from 'components/common/pagination/Pagination'
const transactionType = {
  deposit: 'deposit',
  withdraw: 'withdraw',
}

export const networkType = {
  bsc: 1,
  polygon: 0,
}
const pageInit = {
  networkId: networkType.bsc,
  pageSize: 10,
  pageNumber: 1,
  loading: true,
  totalItem: 10,
}

const AccountPage = (props) => {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const [network, setNetwork] = useState(networkType.bsc)
  const { account } = useWeb3React()
  const [rowNum] = useState(5)
  const [log, setLog] = useState(-1)
  const [transfers, setTransfers] = useState([])

  const [pagination, setPagination] = useState(pageInit)
  const [action, setAction] = useState(transactionType.deposit)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  // const [isPageChange, setIsPageChange] = useState(false);
  const tBodyRef = useRef()
  const emitterRef = useRef(null)
  const { REACT_APP_ENVIRONMENT } = process.env
  useEffect(() => {
    // const handleBottomScroll = async () => {
    //   if (tBodyRef.current) {
    //     const { scrollTop, scrollHeight, clientHeight } =
    //       tBodyRef.current?.container;
    //     tBodyRef.current.tableclone.style.top = scrollTop + "px";

    //     if (
    //       scrollTop &&
    //       scrollTop + clientHeight === scrollHeight &&
    //       pagination.loading
    //     ) {
    //       const res = await Accounts.getAllTransactions({
    //         networkId: network,
    //         pageSize: pagination.pageSize,
    //         pageNumber: pagination.pageNumber + 1,
    //         transactionType: action,
    //         address: account,
    //       });

    //       const data = [...transfers, ...res.data?.data];
    //       if (data.length <= res.data.pagination.totalItem) setTransfers(data);
    //       const newPageInfo = {
    //         ...pagination,
    //         pageNumber: pagination.pageNumber + 1,
    //       };
    //       if (data.length < res.data.pagination.totalItem) {
    //       } else {
    //         newPageInfo.loading = false;
    //       }
    //       setPagination(newPageInfo);
    //     }
    //   }
    // };
    // if (!transfers.length) return;

    // const nodeRef = tBodyRef.current;
    // if (nodeRef) {
    //   ReactDOM.findDOMNode(nodeRef)?.addEventListener(
    //     "scroll",
    //     handleBottomScroll,
    //   );
    // }
    listen()
  }, [transfers, pagination, network, account]); // eslint-disable-line

  useEffect(() => {
    getAllTransactions(1)
    setCurrentPage(1)
  }, [action, user]); // eslint-disable-line
  // useEffect(() => {
  //   if (!isPageChange) {
  //     return;
  //   }
  //   getAllTransactions(1);
  //   setCurrentPage(1);
  // }, [transfers]); // eslint-disable-line
  // useEffect(() => {
  //   getAllTransactions(currentPage);
  // }, [currentPage]); // eslint-disable-line
  // useEffect(()=>{})
  const getAllTransactions = async (currentPage) => {
    try {
      const res = await Accounts.getAllTransactions({
        networkId: network,
        pageSize: pageInit.pageSize,
        pageNumber: currentPage,
        transactionType: action,
        address: account,
      })
      if (res.status === 'success') {
        setTransfers([...res.data?.data])
        setPagination({
          pageNumber: res.data?.pagination.pageNumber,
          pageSize: pageInit.pageSize,
          totalItem: res.data?.pagination.totalItem,
          loading: pageInit.pageSize < res.data?.pagination.totalItem,
        })
        setTotalPage(Math.ceil(res.data?.pagination.totalItem / pageInit.pageSize))
      }
    } catch (e) {}
  }
  const handlePageChange = (page) => {
    getAllTransactions(page)
    setCurrentPage(page)
  }
  const addTransaction = (data) => {
    const transfer = {
      amountReceived: data.amount,
      fee: data.fee || transfers[0]?.fee || 0,
      fromAddress: data.from,
      networkId: network,
      status: 'SUCCESS',
      timestamp: Date.now(),
      toAddress: data.to,
      transactionType: data.transactionType,
      tx: data.transactionHash,
    }
    if (transactionType.deposit === transfer.transactionType) {
      dispatch(
        setCurrentUser({
          ...user,
          amount: +user?.amount + +transfer?.amountReceived - transfer.fee,
        })
      )
    } else {
      dispatch(
        setCurrentUser({
          ...user,
          amount: user?.amount - transfer?.amountReceived - transfer.fee,
        })
      )
    }
    transfers.unshift(transfer)
    setTransfers([...transfers])
  }

  const listen = async () => {
    const { chainId, getContractAsync } = await getInfoWallet()
    const token = await getKabyGameTokenAddress(chainId)
    const { contract: tokenContract } = await getContractAsync(
      token,
      getKabyGameTokenABI(chainId).KABY_GAME_TOKEN_ABI
    )
    if (emitterRef.current) {
      emitterRef.current.unsubscribe()
    }
    if (action !== transactionType.deposit) {
      emitterRef.current = null
      return
    }
    emitterRef.current = tokenContract.events.Transfer({
      filter: {
        from: account,
        to:
          REACT_APP_ENVIRONMENT === 'development'
            ? systemDepositWallet
            : systemDepositWalletProduction,
      },
    })
    const received = []
    emitterRef.current.on('data', (event) => {
      const { value, from, to } = event.returnValues
      console.log('Receive event', event)
      const existed = received.find(
        (e) => e.transactionHash === event.transactionHash && e.id === event.id
      )
      if (existed) {
        return
      }
      received.push(event)
      addTransaction({
        amount: Web3.utils.fromWei(value),
        from,
        to: to,
        transactionType: transactionType.deposit,
        transactionHash: event.transactionHash,
      })
    })
  }

  return (
    <>
      {account && (
        <TransactionLog
          tx={transfers[log] || null}
          showModal={log >= 0}
          handleCloseModal={() => setLog(-1)}
        />
      )}
      <div className="account-wrapper">
        <div className="bg-fade-layer1"></div>
        <div className="bg-fade-layer2"></div>
        <div className="bg-fade-layer3"></div>
        <div className="bg-head"></div>
        <div className="account-tab">
          <Row className="system-action">
            <div className="wallet-action">
              <div className="wallet-action-wrap">
                <h2
                  style={{ cursor: 'pointer' }}
                  onClick={() => setAction(transactionType.deposit)}
                  className={`wallet-action-title ${
                    action === transactionType.deposit ? 'active' : ''
                  }`}
                >
                  Deposit
                </h2>
                <h2
                  style={{ cursor: 'pointer' }}
                  onClick={() => setAction(transactionType.withdraw)}
                  className={`wallet-action-title ${
                    action === transactionType.withdraw ? 'active' : ''
                  }`}
                >
                  withdraw
                </h2>
              </div>
              {action === transactionType.withdraw && (
                <Withdraw
                  network={network}
                  setNetwork={setNetwork}
                  addTransaction={addTransaction}
                  transactionType={transactionType}
                />
              )}
              {action === transactionType.deposit && (
                <Deposit network={network} setNetwork={setNetwork} />
              )}
            </div>
          </Row>
          <div className="system-transaction">
            {/* <div className="title-table">TRANSACTION HISTORY</div> */}
            <TableScrollbar ref={tBodyRef} rows={rowNum} className="TableScrollbar">
              <table>
                <thead>
                  <tr>
                    {/* <th className="th1">TRANSACTION TYPE</th>
                    <th>TOTAL AMOUNT</th>
                    <th>TRANSACTION TIME</th>
                    <th>STATUS</th>
                    <th>DETAILS</th> */}
                    <th className="th1">TYPE</th>
                    <th className="th2">TOTAL AMOUNT</th>
                    <th>TIME</th>
                    <th>STATUS</th>
                    <th>DETAILS</th>
                  </tr>
                </thead>

                <tbody>
                  {transfers?.map((item, index) => (
                    <tr key={`row-transaction-${index}`}>
                      <td className="td1 capitalize">{item.transactionType}</td>
                      <td className="th2"> {item.amountReceived}</td>
                      <td>
                        <Moment format="YYYY-MM-DD h:mm:ss">
                          {new Date(item.timestamp).toString()}
                        </Moment>
                      </td>
                      <td className="capitalize"> {item.status?.toLowerCase()} </td>
                      <td>
                        <Button className="more-btn" onClick={() => setLog(index)}>
                          More
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableScrollbar>
            <Pagination
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPage={totalPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountPage
