import React, { useEffect, useState } from 'react'
import './pagination.scss'
const Pagination = (props) => {
  const setPaginationArray = (totalPage, currentPage) => {
    if (totalPage === 0) {
      return []
    }
    let tmp = [
      {
        value: 1,
        active: false,
      },
      {
        value: 2,
        active: false,
      },
      {
        value: 3,
        active: false,
      },
      {
        value: 4,
        active: false,
      },
      {
        value: 5,
        active: false,
      },
      {
        value: 6,
        active: false,
      },
      {
        value: 7,
        active: false,
      },
    ]
    if (totalPage <= 7) {
      tmp = tmp.slice(0, +totalPage)
      if (tmp[currentPage - 1]) {
        tmp[currentPage - 1].active = true
      } else {
        tmp[0].active = true
      }
      return tmp
    }
    if (+currentPage < 5) {
      tmp[currentPage - 1].active = true
      tmp[5].value = '...'
      tmp[6].value = totalPage
      return tmp
    }
    if (+currentPage + 4 > +totalPage) {
      tmp[1].value = '...'
      tmp[6].value = totalPage
      tmp[5].value = +totalPage - 1
      tmp[4].value = +totalPage - 2
      tmp[3].value = +totalPage - 3
      tmp[2].value = +totalPage - 4
      if (tmp[6 - totalPage + currentPage]) {
        tmp[6 - totalPage + currentPage].active = true
      } else {
        tmp[0].active = true
      }
      return tmp
    }
    tmp[1].value = '...'
    tmp[2].value = +currentPage - 1
    tmp[3].value = currentPage
    tmp[4].value = +currentPage + 1
    tmp[5].value = '...'
    tmp[6].value = totalPage
    tmp[3].active = true
    return tmp
  }
  const [pagination, setPagination] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(props.totalPage)
  useEffect(() => {
    setPagination(() => {
      return setPaginationArray(props.totalPage, props.currentPage)
    })
    setTotalPage(props.totalPage)
    setCurrentPage(props.currentPage)
  }, [props.totalPage, props.currentPage])
  return (
    <div className="common-pagination">
      <span
        onClick={() => {
          if (currentPage === 1) {
            return
          }
          setPagination(() => {
            return setPaginationArray(totalPage, +currentPage - 1)
          })
          setCurrentPage(+currentPage - 1)
          props.handlePageChange(currentPage - 1)
        }}
        className="common-pagination-button"
      >
        PREV
      </span>
      {pagination.map((pagi, index) => (
        <React.Fragment key={`common-pagination${index}`}>
          <span
            value={pagi.value}
            onClick={() => {
              if (pagi.value === '...') {
                return
              }
              setCurrentPage(pagi.value)
              setPagination(() => {
                return setPaginationArray(totalPage, +pagi.value)
              })
              props.handlePageChange(pagi.value)
            }}
            style={{ color: pagi.active && 'yellow' }}
            className="common-pagination-page"
          >
            {pagi.value}
          </span>
        </React.Fragment>
      ))}

      <span
        onClick={() => {
          if (+currentPage >= totalPage) {
            return
          }
          setPagination(() => {
            return setPaginationArray(totalPage, +currentPage + 1)
          })

          setCurrentPage(+currentPage + 1)
          props.handlePageChange(currentPage + 1)
        }}
        className="common-pagination-button"
      >
        NEXT
      </span>
    </div>
  )
}
export default Pagination
