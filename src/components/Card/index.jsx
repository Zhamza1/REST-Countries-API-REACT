import styled from "styled-components"
import React from "react"

const CardWrapper=styled.div`
    width:275px;
    height:340px;
    background-color:white;
    border-radius:5px;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    margin-top:50px;
    cursor:pointer;
`

const Image=styled.img`
    height:45%;
    border-radius:5px 5px 0px 0;
    width:100%;
`

const Texte=styled.div`
    margin:15px 20px;
`

function Card ({region,capital,population,name,flags,showDetails,code}) {

const showDetailsHandler= () => {
    showDetails(code)
}
    
    return(
        <React.Fragment>
            <CardWrapper onClick={showDetailsHandler} id="Card">
                <Image src={flags}/>
                            <Texte>
                                <h3>{name}</h3>
                                <p>Population:{population} </p>
                                <p>Region:{region} </p>
                                <p>Capital:{capital}  </p>
                            </Texte>
            </CardWrapper>
        </React.Fragment>            
    )} 

export default Card