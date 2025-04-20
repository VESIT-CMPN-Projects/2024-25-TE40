import React from "react"
import { blog } from "../../../dummydata"
import "./footer.css"

const Footer = () => {
  return (
    <>
     
      <footer>
        <div className='container padding'>
          <div className='box logo'>
            <h1>AgrowFit</h1>
            <span>Smart Farming</span>
           
          
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>AgriHome</li>
              <li>Find Your Crop</li>
              <li>Crop Trends by region</li>
              <li>Ask Agribot</li>
          
            </ul>
          </div>
          
        
            
          </div>
          
       
      </footer>
      <div className='legal'>
        
      </div>
    </>
  )
}

export default Footer
