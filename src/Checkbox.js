const Checkbox = ({ label, value, disabled, onChange }) => {
  return (
    <div>
      <label>
        <input 
          type="checkbox"
          checked={value}
          onChange={onChange}
          disabled={disabled}
          style={{marginRight: 20}}
        />
        {label}
      </label>
    </div>
  )
}

export default Checkbox