import React, { useState } from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from '../../firebase';

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

function Login(props) {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting,
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = useState(true);

  async function authenticateUser() {
    const { name, email, password } = values
    const response = login ? await firebase.login(email, password) : await firebase.register(name, email, password);
    
  }

  return (
    <div>
      <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
      <form className="flex flex-column" onSubmit={handleSubmit}>
        {!login && (
          <input
            type="text"
            value={values.name}
            name="name"
            placeholder="Your name"
            autoComplete="off"
            onChange={handleChange}
          />
        )}
        <input
          className={errors.email && 'error-input'}
          type="email"
          value={values.email}
          name="email"
          placeholder="Your email"
          autoComplete="off"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input
          className={errors.password && 'error-input'}
          type="password"
          value={values.password}
          name="password"
          placeholder="Choose a secure password"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div className="flex mt3">
          <button type="submit" className="button pointer mr2" disabled={isSubmitting} style={{  background: isSubmitting ? 'grey' : 'orange' }}>
            Submit
          </button>
          <button
            type="button"
            className="pointer button"
            onClick={() => setLogin((prevLogin) => !prevLogin)}
          >
            {login ? "need to create new account" : "already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
