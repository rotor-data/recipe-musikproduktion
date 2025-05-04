import React from 'react'



const SimpleModal = ({ children, show, setShow }) => {
  const content = show && (
    <div className='modal is-active' style={{display: "flex"}}>
        <div className="modal-background"></div>
          <div className="">
            <div className="modal-content">{children}</div>
          </div>
        <button
              className="modal-close is-large"
              type="button"
              onClick={() => setShow(false)}
            >
              X
            </button>
    </div>
  )

  return content
}

export default SimpleModal

