import React from 'react'

const Form = ({handlePassword, handleEmail, submit, error, innerText}) => {
  return (
    <form>
      <div className="input-group mb-3">
        {/* <span className="input-group-text" id="basic-addon1">Mail </span> */}
        <input type="text" className="form-control btn" placeholder="Ingresa tu mail..." aria-label="Email" aria-describedby="basic-addon1"
          onChange={handleEmail} />
      </div>
      <div className="input-group mb-3">
        {/* <span className="input-group-text" id="basic-addon1">Pass </span> */}
        <input type="text" className="form-control btn" placeholder="Ingresa tu password..." aria-label="Password" aria-describedby="basic-addon1"
          onChange={handlePassword} />
      </div>
      <div className='errorMessage'>{error}</div>

      <button className='btn' type="button" onClick={submit}>{innerText}</button>
    </form>
  )
}

export default Form;
