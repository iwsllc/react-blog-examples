import React, { useState, useEffect } from 'react'
import ModalContext from './context'
import Modal from './modal'

const ModalProvider = ({ children }) => {
  const [show, setShow] = useState(false)
  const [modalProps, setModalProps] = useState(null)
  const [handlers, setHandlers] = useState(null)
  const [disable, setDisable] = useState(false)

  function modal(content, props = {}, { ...options }) {
    const { title, close, confirm, header, footer } = options
    setHandlers({ close, confirm })
    setModalProps({
      title,
      content: {
        type: content,
        props
      },
      header,
      footer
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
          if (result == null) return onCloseModal()
          if (!result) {
            setDisable(false)
            return // when falsey, don't close the modal.
          }
          if (typeof result === 'object') {
            if (result.success) return onCloseModal()

            if (result.props != null) {
              const newProps = { ...modalProps }
              newProps.content.props = { ...newProps.content.props, ...result.props } // shallow copy in the originals, then override them with any new ones.
              setModalProps(newProps)
            }
            setDisable(false)
            return
          }
          onCloseModal()
        })
    } else onCloseModal() // close anyway; no confirm handler
  }

  function addModalBackdrop() {
    // add a div to the end of body with .modal-backdrop css; <div class="modal-backdrop fade show"></div>
    const backdropDom = document.createElement('div')
    backdropDom.className = 'modal-backdrop fade show'
    document.body.appendChild(backdropDom)
  }
  function removeModalBackdrop() {
    const backdropDom = document.querySelector('.modal-backdrop')
    if (backdropDom != null) backdropDom.remove()
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
      removeModalBackdrop()
    } else {
      addModalBackdrop()
    }
  }, [show])

  return (
    <ModalContext.Provider value={{
      modal
    }}
    >
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
