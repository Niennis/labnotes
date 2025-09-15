import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

const Form = ({ handlePassword, handleEmail, submit, handleKeyDown, error, innerText }) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <form onKeyDown={handleKeyDown}>
      <div>
        <TextField
          style={{ marginBottom: '1rem', background: '#ffffff99' }}
          fullWidth
          type="email"
          label="Correo"
          variant="outlined"
          onChange={handleEmail}
        />
      </div>
      <div>
        <TextField
          style={{ background: '#ffffff99' }}
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Contraseña"
          variant="outlined"
          onChange={handlePassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className='errorMessage'>{error}</div>

      <button className='btn' type="button" onClick={submit} >{innerText}</button>
    </form>
  )
}

export default Form;
