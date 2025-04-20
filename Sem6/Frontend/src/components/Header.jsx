import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"
import { useAuth0 } from "@auth0/auth0-react";
const Header = () => {
  const [click, setClick] = useState(false)
  const {  isAuthenticated,user } = useAuth0();

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              {
              isAuthenticated && <p>
                Welcome
                {user.name}
                </p>
}
            </li>
            <li>
              <Link to='/'>AgriHome</Link>
            </li>
            <li>
  <a href="https://www.google.com/maps/d/edit?mid=1phyebBmPBuBIifS3DH8HGJt9zWYZqdM&usp=sharing" target="_blank" rel="noopener noreferrer">
     Live soil insights
  </a>
</li>

        
            <li>
              <Link to='/about'>Find Your Crop</Link>
            </li>
        
            <li>
            <a href="https://app.powerbi.com/links/_r8n4rQbFr?ctid=cca3f0fe-586f-4426-a8bd-b8146307e738&pbi_source=linkShare&bookmarkGuid=1e6dfb86-c2a9-4bb4-b5ab-9ef0ba113cb3">
            Crop Trends by region
            </a>
              
            </li>
            <li>
              <Link to='/pricing'>Ask Agribot</Link>
            </li>
            <li>
  <a href="https://www.google.com/maps/d/edit?mid=1FrVhHjxa0tX9bCpAOQy6xPAEkW9wISk&usp=sharing" target="_blank" rel="noopener noreferrer">
  Crop Transport finder
  </a>

</li>
            
            {
              isAuthenticated ? 
              <li>
              <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button>
              </li>
            :(
<li>
            <button onClick={() => loginWithRedirect()}>Log In</button>
              </li>
            )
              
            }
            
           
          </ul>
          <div className='start'>
            <div className='button'></div>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
