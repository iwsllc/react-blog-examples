import React from 'react'

export default function DefaultModalFooter({close, confirm, disabled}) {
  return <>
    <button className="btn btn-secondary" type="button" disabled={disabled} onClick={() => { if (close != null) close() }}>Cancel</button>
    <button className="btn btn-primary" type="button" disabled={disabled} onClick={() => { if (confirm != null) confirm() }}>OK</button>
  </>
}
