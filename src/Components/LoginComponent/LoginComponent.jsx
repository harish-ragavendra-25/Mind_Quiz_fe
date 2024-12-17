import axios from 'axios'
import React, { useState } from 'react'

const loginComponent = () => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const emailHandler = (event) => {
        // Handle email Value
        setEmail(event.target.value);
    }

    const passwordHandler = (event) => {
        //Handle Password Value
        setPassword(event.target.value);
    }

    const onSubmitHandler = (event) => {
        //handle submit Function
        axios
        .post(`http://localhost:3000/mind_quiz/v1/login`,
          {email : email,
          password : password})
        .then((response) => {
            if (response.status == 201)
            {
              alert(`Welcome ${response.data.firstName} ${response.data.lastName} !`)
              window.localStorage.setItem('token',response.data.token)
              window.location.href = '/userdata'
            }
        })
        .catch((error) => {
          alert(`Status : ${error.response.status} - ${error.response.data.message}`)
      })}
    return (
    <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="email">Email</label>

                <input 
                type="text"
                className='email'
                placeholder='Enter your Email'
                value={email}
                onChange={emailHandler}
                required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password">password</label>

                <input 
                type="text"
                className='password'
                placeholder='Enter your password'
                value={password}
                onChange={passwordHandler}
                required
                />
            </div>

            <div className="mb-3">
                <div className='custom-checkbox custom-control'>
                    <input 
                    type='checkbox'
                    className='custom-control-input'
                    id='customCheck1'
                    />

                    <label className='custom-control-label' htmlFor='customCheck1'>
                        Remember me?
                    </label>
                </div>
                <div className='d-grid'>
                    <button type='submit' className='btn btn-primary' >Submit</button>
                </div>
                <p className='forgot-password text-right'>
                    <a href='#'>Forgot Password?</a>
                </p>

                <p className='text-right'>
                    {/* New User? <Link to='/signup'>Register here!</Link> */}
                </p>
            </div>
        </form>
    </React.Fragment>
    )
}

export default loginComponent