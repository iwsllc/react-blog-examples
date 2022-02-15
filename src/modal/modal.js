import React from 'react'
import PropTypes from 'prop-types'
import DefaultModalFooter from './default-footer'
import DefaultModalHeader from './default-header'

const ModalComponent = function Modal({ show, title, close, confirm, content, header, footer, disabled }) {
  return (
    <div className={`modal fade ${show ? 'show fade-in' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          {header?.type ? <header.type {...header.props} disabled={disabled} title={title} close={close} /> : null}
          <div className="modal-body">
            {content?.type ? <content.type {...content.props} disabled={disabled} close={close} confirm={confirm} /> : null}
          </div>
          {/* ...footer buttons here */}
          {footer?.type ? <div className="modal-footer"><footer.type {...footer.props} disabled={disabled} close={close} confirm={confirm} /></div> : null}
        </div>
      </div>
    </div>
  )
}

ModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  confirm: PropTypes.func,
  title: PropTypes.string,
  content: PropTypes.object,
  header: PropTypes.object,
  footer: PropTypes.object
}

ModalComponent.defaultProps = {
  title: '',
  header: { type: DefaultModalHeader, props: { showCloseButton: true } },
  footer: { type: DefaultModalFooter, props: {} }
}

export default ModalComponent
