import React, { useState } from 'react'
import Header from './../market-layout/Header'
const ModalContext = React.createContext({
  isModalOpen: false,
})
export const AppLayout = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className="content-app">
      <Header
        setIsModalOpen={(value) => {
          setIsModalOpen(value)
        }}
      />
      <ModalContext.Provider
        value={{
          isModalOpen: isModalOpen,
          setIsModalOpen: (value) => setIsModalOpen(value),
        }}
      >
        <div style={{ filter: isModalOpen && 'blur(24px)' }} className="layout-content">
          {props.children}
        </div>
      </ModalContext.Provider>
      {/* <Footer /> */}
    </div>
  )
}

export default ModalContext
