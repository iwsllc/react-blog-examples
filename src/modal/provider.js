import React, {useState, useEffect} from 'react'
import ModalContext from './context'
import Modal from './modal'

const ModalProvider = ({children}) => {
  const [show, setShow] = useState(false)
  const [modalProps, setModalProps] = useState(null)
  const [handlers, setHandlers] = useState(null)
  const [disable, setDisable] = useState(false)

  function modal(content, props = {}, {...options}) {
    let {title, close, confirm, header, footer} = options
    setHandlers({close, confirm})
    setModalProps({
      title,
      content: {
        type: content,
        props,
      },
      header,
      footer,
    })
  }

  function onCloseModal() {
    setShow(false)
    setDisable(false)
  }
  function onConfirmModal() {
    if (handlers?.confirm) {
      setDisable(true)
      handlers.confirm()
        .then((result) => {
          if (!result) {
            setDisable(false)
            return // when falsey, don't close the modal.
          }
          onCloseModal()
        })
    } else onCloseModal() // close anyway; no confirm handler
  }

  useEffect(() => {
    if (!modalProps || !handlers) return
    setShow(true)
  }, [modalProps, handlers])

  useEffect(() => {
    if (!show) {
      // NOTE: closed, call close handler if avail.
      if (handlers?.close) {
        handlers.close() // may be async, we'll push through this one. Not expecting a result
      }

      // NOTE: clear state
      setModalProps(null)
      setHandlers(null)
    }
  }, [show])

  return (
    <ModalContext.Provider value={{
      modal,
    }}>
      <>
        {children}
        <Modal
          show={show}
          disabled={disable}
          close={onCloseModal}
          confirm={onConfirmModal}
          {...modalProps}
        />
      </>
    </ModalContext.Provider>
  )
}


export default ModalProvider
