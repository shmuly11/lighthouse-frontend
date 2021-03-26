import React from 'react'
import './FormTemplate.css'
/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'


const style = css`
  .stuff,
button {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -300%);
  display: block;
  width: 70vw;
  opacity: 0;
  pointer-events: none;
  transition: all 0.5s cubic-bezier(0.4, 0.25, 0.8, 0.3);
}

.stuff {
  padding: 0.25rem 0;
  border: 0;
  border-bottom: 1px solid #bb1515;
  outline: 0;
  background: transparent;
  color: rgb(31, 150, 56);
  font-size: 3rem;
  line-height: 4rem;
  letter-spacing: 0.125rem;
  transition: all 0.5s cubic-bezier(0.4, 0.25, 0.8, 0.3);
}

.stuff::-moz-selection {
  background: rgba(187, 21, 21, 0.25);
}

.stuff::selection {
  background: rgba(187, 21, 21, 0.25);
}

button,
.signup-button {
  padding: 0.25em 0;
  border: 0;
  outline: 0;
  background: #15bb23;
  color: rgba(255, 255, 255, 0.85);
  font-size: 2rem;
  line-height: 3.6rem;
  letter-spacing: 0.0625rem;
  box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.25);
  text-shadow: 0 -2px 0 rgba(0, 0, 0, 0.25), 0 1px 0 rgba(255, 255, 255, 0.2);
}

.stuff:focus,
button:focus {
  opacity: 1;
  transform: translate(-50%, -100%);
  pointer-events: auto;
  transition: all 0.4s cubic-bezier(0.1, 0.45, 0.1, 0.85) 0.5s;
  z-index: 10;
}

.stuff:focus ~ .stuff,
.stuff:focus ~ button {
  transform: translate(-50%, 500%);
  transition: all 0.5s ease-in;
}

.stuff:focus ~ label .label-text {
  transform: translate(-50%, 300%);
  transition: all 0.5s ease-in;
}

.stuff:focus ~ .tip {
  opacity: 1;
}

.stuff:focus ~ .signup-button,
button:focus ~ .signup-button {
  opacity: 0;
}

.stuff:focus + label .label-text {
  opacity: 1;
  transform: translate(-50%, -100%);
  transition: all 0.3s cubic-bezier(0.1, 0.45, 0.1, 0.85) 0.4s;
}

.stuff:focus + label .nav-dot:before {
  background: #a41212;
  box-shadow: 0 0 0 0.15rem #111, 0 0 0.05rem 0.26rem #bb1515;
}

.tip {
  position: fixed;
  top: 57%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  opacity: 0;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 300;
  letter-spacing: 0.125rem;
  text-transform: uppercase;
  text-align: right;
  transition: opacity 0.25s 0.5s;
}

.signup-button,
.signup-button-trigger {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 70vw;
  padding: 0.25rem 0;
  line-height: 3.6rem;
  text-align: center;
  pointer-events: none;
  cursor: pointer;
  transition: opacity 0.4s 0.3s;
}

.signup-button-trigger {
  opacity: 0;
  pointer-events: auto;
}

.label-text {
  position: fixed;
  top: calc(50% - 4rem);
  left: 75%;
  transform: translate(-50%, -300%);
  width: 70vw;
  padding: 3.125rem 0 1.5rem;
  text-transform: uppercase;
  color: black;
  opacity: 0;
  font-size: 4.125rem;
  font-weight: 300;
  letter-spacing: 0.125rem;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.4, 0.25, 0.8, 0.3) 0.05s;
}

.nav-dot {
  cursor: pointer;
  position: fixed;
  padding: 0.625rem 1.25rem 0.625rem 0.625rem;
  top: 52%;
  right: 1.25rem;
}
.nav-dot:before {
  content: "";
  display: inline-block;
  border-radius: 50%;
  width: 0.375rem;
  height: 0.375rem;
  margin-right: 0.625rem;
  position: fixed;
  background-color: #16272f;
  border: 0;
  transition: all 0.25s;
}
.nav-dot:hover:before {
  width: 0.625rem;
  height: 0.625rem;
  margin-top: -0.125rem;
  margin-left: -0.125rem;
  background-color: #a41212;
}

label[for=input-1] .nav-dot {
  margin-top: -150px;
}

label[for=input-2] .nav-dot {
  margin-top: -125px;
}

label[for=input-3] .nav-dot {
  margin-top: -100px;
}

label[for=input-4] .nav-dot {
  margin-top: -75px;
}

label[for=input-5] .nav-dot {
  margin-top: -50px;
}

label[for=input-6] .nav-dot {
    margin-top: -25px;
  }

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  /* background-image: linear-gradient(to bottom right, #111E25 0%, #111 100%); */
  font-family: "Lato", sans-serif;
}

form {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
`

function FormTemplate() {
    return (
        <div css={style}>
            <form>
  <input class="stuff" id="input-1" type="text" placeholder="John Doe"  autofocus />
  <label for="input-1">
    <span class="label-text">Full Name</span>
    <span class="nav-dot"></span>
    <div class="signup-button-trigger">Sign Up</div>
  </label>
  {/* <div class="stuff" id="input-2"   >
    <select>
  <option>option 1</option>
  <option>option 2</option>
  </select>
  </div> */}
  
  <input class="stuff" id="input-2" type="text" placeholder="john" />
  <input class="stuff" id="input-2" type="checkbox" placeholder="john" />
  {/* <label for="input-2">
    <span class="label-text">pizza</span>
    <span class="nav-dot"></span>
  </label> */}
  <div class="label-text">
    pizza
  </div>
  
  
  <input class="stuff" id="input-3" type="email" placeholder="email@address.com"  />
  <label for="input-3">
    <span class="label-text">Email</span>
    <span class="nav-dot"></span>
  </label>
  <input class="stuff" id="input-4" type="text" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"  />
  <label for="input-4">
    <span class="label-text">Password</span>
    <span class="nav-dot"></span>
  </label>
  <input class="stuff" id="input-5" type="text" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"  />
  <label for="input-5">
    <span class="label-text">Confirm Password</span>
    <span class="nav-dot"></span>
  </label>
  <input class="stuff" id="input-6" type="text" placeholder="age"  />
  <label for="input-6">
    <span class="label-text">Age</span>
    <span class="nav-dot"></span>
  </label>
  <button type="submit">Create Your Account</button>
  <p class="tip">Press Tab</p>
  <div class="signup-button">Sign Up</div>
</form>

        </div>
    )
}

export default FormTemplate
