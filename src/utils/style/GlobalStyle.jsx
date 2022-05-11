import { useContext } from "react"
import {createGlobalStyle} from "styled-components"
import { ThemeContext } from "../context"


const StyledGlobalStyle=createGlobalStyle`
    *{
        font-family: Helvetica;
    }

    body{
        margin:0;    
    }
    body{
        background-color: ${({isDarkMode})=>
            isDarkMode ? "#212E37" : "#FAFAFA"};
    }

    select,input,#navContainer,#Card,#back{
        background-color: ${({isDarkMode})=>
            isDarkMode ? "#2B3743" : "#FAFAFA"};

    }

    h1,h2,h3,h4,p,button,nav,select,input,#title,#back{
        color: ${({isDarkMode})=>
            isDarkMode ? "white" : "black"};
    }

    h1{
        font-weight: bold;
        font-size:24px;
    }
    h2{
        font-size:20px;
    }
    h4{
        font-weight: 300;
        font-size:18px;
    }

    h3{
        font-weight: 700;
        font-size:20px;
    }


    p{
        font-size:16px;
    }
`

function GlobalStyle() {
    const {theme}=useContext(ThemeContext)
    return <StyledGlobalStyle isDarkMode={theme==="dark"}/>
}

export default GlobalStyle