import React from 'react'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
  const history = useHistory()
  return (
    <div className="page-not-found">
      <h1 className="title-not-found">404 - Page Not Found</h1>
      <div className="btn-home-page">
        <div
          onClick={() => {
            history.push('/')
          }}
        >
          Go to HomePage
        </div>
      </div>
    </div>
  )
}

export default NotFound
