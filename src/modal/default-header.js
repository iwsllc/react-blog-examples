import React from 'react'

export default function DefaultModalHeader({ title, close, disabled }) {
  return (
    <div className="modal-header">
      <h5 className="modal-title">{title}</h5>
      <button type="button" className="close" data-dismiss="modal" disabled={disabled} aria-label="Close" onClick={close}><span aria-hidden="true">&times;</span></button>
    </div>
  )
}
