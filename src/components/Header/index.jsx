import styled from "styled-components"
import {Link} from "react-router-dom"
import { ThemeContext } from "../../utils/context"
import { useContext } from "react"

const NavContainer=styled.nav`
    padding:16px 70px;
    display:flex;
    justify-content:space-between; 
    align-items:center;
    background-color:white;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2); 
`

const Title=styled(Link)`    
    color:black;
    text-decoration: none;
    font-weight: bold;
    font-size:24px;
`

const DarkMode=styled.button`
    cursor:pointer;
    background-color: transparent;
    border: none;
    font-size:16px;
`


function Header() {
    const {toggleTheme,theme} =useContext(ThemeContext)

    return(
        <NavContainer id="navContainer">
            <Title to="/" id="title">
                 Where in the world ? 
            </Title>
       
            <DarkMode onClick={() => toggleTheme()}>
                {theme==="light" ? "🌞" : "🌙"} Dark Mode
            </DarkMode>
        </NavContainer>
        
    )
}

export default Header