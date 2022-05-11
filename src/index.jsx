import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Description from "./pages/Description"
import Home from "./pages/Home"
import Header from "./components/Header"
import Error from "./components/Error"
import GlobalStyle from "./utils/style/GlobalStyle"
import { ThemeProvider } from "./utils/context"

ici c(es le test )
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ThemeProvider>
                <GlobalStyle/>
                <Header/> 
                <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/:countryName" element={<Description/>}/>
                        <Route path="*" element={<Error/>}/>        
                </Routes>
            </ThemeProvider>
        </Router>
    
    </React.StrictMode>,
    document.getElementById("root")
)