import React, { ChangeEvent } from 'react'

interface Props {
  type?: string;
  label: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Field({type = 'text', label, value, onChange = () => {}}: Props) {
  return (
    <div className="form-control">
      <label htmlFor={label}>{label}: </label>
      <input type={type} name={label} value={value} onChange={onChange} />
    </div>
  )
}

export default Field
