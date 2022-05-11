import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { StyledLink } from "../../utils/style/Atoms";
import styled from "styled-components";

const Body=styled.body`
    margin:0px 70px;
`

const Button=styled.button`
    display:flex;
    margin-top:80px;
    width:140px;
    height:40px;
    underline:none;
    border:none;
    background-color:white;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    border-radius:5px;
    align-items:center;
    cursor:pointer;
`

const AllContainer=styled.div`
    height:405px;
    margin-top:80px;
    margin-bottom:200px;
    display:flex;
`
const Image=styled.img`
    height:100%;
    width:45%;
`


const TexteContainer=styled.div`
    margin-left:90px;
    padding:20px 0;
`

const Column=styled.div`
    display:grid;
    grid-template-columns:1fr 1fr;`

const Styledspan=styled.span`
box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
background-color:white;
width:30px;
height:30px;
padding:8px 22px;
border-radius:5px;
margin-left:2px;
`

const Description = () => {
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { countryName } = useParams();

  const borders = country.map((country) => country.borders);

  useEffect(() => {
    const getCountryByName = async () => {
      try {
        const res = await fetch(`https://restcountries.com/v2/name/${countryName}`);

        if (!res.ok) throw new Error("Could not found!");

        const data = await res.json();

        setCountry(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    getCountryByName();
  }, [countryName]);

  console.log(countryName)

  return (
    <Body>
          <StyledLink to="/" >
                <Button id="back">◀ Back</Button>
            </StyledLink> 

      {isLoading && !error && <h4>Loading........</h4>}
      {error && !isLoading && { error }}

      {country?.map((country, index) => (
        <AllContainer key={index}>  
            <Image src={country.flags.png} alt="" />
            <TexteContainer>
                <h1>{country.name}</h1>
                <Column>
                    <div>
                        <p><strong>Native Name:</strong> {country.nativeName}</p>
                        <p><strong>Population:</strong> {new Intl.NumberFormat().format(country.population)}</p>
                        <p><strong>Region:</strong> {country.region}</p>
                        <p><strong>Sub Region:</strong> {country.subregion}</p>
                        <p><strong>Capital:</strong> {country.capital}</p>
                    </div>
                    <div>
                        <p><strong>Top Level Domain:</strong> {country.topLevelDomain}</p>
                         <p><strong>Currencies:</strong> {country.currencies[0].name}</p> 
                        <p><strong>Languages:</strong> {country.languages[0].name}</p> 
                    </div>
                </Column>
            </TexteContainer>
        </AllContainer>
      ))}
    </Body>
  );
};

export default Description


/* {new Intl.NumberFormat().format(country.population)}
function Descriptio() {
   
 return(
        
                    
                   
                        
                    <Column>
                    <div>
                        <p><strong>Native Name: {nativeName}</strong></p>
                        <p><strong>Population: {population}</strong></p>
                        <p><strong>Region: {region}</strong></p>
                        <p><strong>Sub Region: {subregion}</strong></p>
                        <p><strong>Capital: {capital}</strong></p>
                    </div>            
                    <div>
                        <p><strong>Top Level Domain: {topLevelDomain}</strong></p>
                        <p><strong>Currencies: {currencies}</strong></p>
                        <p><strong>Languages: {languages}</strong></p>
                    </div>
                    </Column>
                    <div><p><strong>Border Countries:</strong><Styledspan>France</Styledspan> <Styledspan>France</Styledspan> <Styledspan>France</Styledspan></p></div>
                   
             
                
            ))}
        </Body>
    )
}




  */