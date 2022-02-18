import React from 'react'
import PropTypes from 'prop-types'

const JsonField = ({ name, label, onChange, value, valid }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <textarea name={name} id={name} className={`form-control w-100 ${!valid ? 'is-invalid' : ''}`} rows="25" value={value} onChange={onChange} />
    {!valid ? <div className="invalid-feedback">Broken JSON</div> : null}
  </>
)

JsonField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  valid: PropTypes.bool,
  value: PropTypes.string
}

export default JsonField
