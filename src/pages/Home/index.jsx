import styled from "styled-components"
import { useState,useEffect,useRef } from "react"
import React from "react"
import { Loader, StyledLink } from "../../utils/style/Atoms"
import Card from "../../components/Card"
import { useNavigate } from "react-router-dom"
import { MediaQueries } from "../../utils/style/MediaQueries"

const Body=styled.div`
    margin:0px 70px;
`

const FilterContainer=styled.div`
    display:flex;
    justify-content:space-between;
    margin:50px 0px; 
    ${MediaQueries("tablet")`
    flex-wrap:wrap;
    `}
`
const SearchBar=styled.input`
    width:400px;
    height:50px;
    border-radius:5px;
    border:none;
    outline:none;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    padding:0 30px;
    ${MediaQueries("mobile")`
    width:300px;
    `}
    ${MediaQueries("mobil")`
    width:200px;
    `}
    

`
const Filter=styled.select`
    height:50px;
    width:150px;
    border:none;
    outline:none;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    border-radius:5px;
    padding-left:10px;
    ${MediaQueries("tablet")`
    margin-top:20px;
    `}
`
const AllCard=styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;  
    ${MediaQueries("table")`
    justify-content:center;
    `}
`




function Home() {

    const [isDataLoading, setDataLoading] = useState(false)
    const [error, setError] = useState(false)
    const [contryList, setContryList] = useState([])
    const contriesInputRef=useRef()
    const regionRef=useRef()
    const navigate=useNavigate()

    const noContries= contryList.status || contryList.message

    useEffect(() => {
        try {
            fetchData()
        }
        catch(error) {
            return(error)
        }
      }, [])
      
      const fetchData=async () => {
          const response = await fetch("https://restcountries.com/v2/all")
          const data = await response.json();

          setContryList(data)
      }

      const searchContries = () => {
        const searchValue = contriesInputRef.current.value
        if(searchValue.trim()) {
            const fetchSearch = async () => {
                const response = await fetch(
                    `https://restcountries.com/v2/name/${searchValue}`)
                    const data = await response.json()
                    setContryList(data)
            }
            try {
                fetchSearch()
            } catch(error) {
                console.log(error)
            }
        }else {
            fetchData()
        }
        } 
        
        
    const selectRegion = () => {
        const selectValue = regionRef.current.value

        if(selectValue.trim()) {
            const fetchSelect = async () => {
                const response = await fetch (
                    `https://restcountries.com/v2/region/${selectValue}`
                )
                const data = await response.json()

                if(selectValue==="ALL") {
                    try {
                        fetchData()
                    } catch(error) {
                        console.log(error)
                    }
                    return
                }

                setContryList(data)
            }

            try{
                fetchSelect()
            } catch (error) {
                console.log(error)
            }
        }
    }    
      
     if(error) {
        return <span>Oups il ya un eu un problème 🙈</span> 
    } 

    const showDetails = (code) =>{
        navigate (`/${code}`)
    }

    return(
        <React.Fragment>
            <Body>
                <FilterContainer>
                        <form action="" method="get">
                            <SearchBar 
                            ref={contriesInputRef}
                            onChange={searchContries}
                            type="text" name="searchbar" placeholder="🔍 Search for a country..."
                            />
                        </form>
                    <div>
                    <Filter ref={regionRef} onChange={selectRegion}>
                        <option value="ALL">Filter by region</option>
                        <option value="africa">Africa</option>
                        <option value="americas">America</option>
                        <option value="asia">Asia</option>
                        <option value="europe">Europe</option>
                        <option value="oceania">Oceania</option>
                    </Filter>
                    </div>
                </FilterContainer>




                {isDataLoading ?(
                    <Loader/>
                ) : (
                    <AllCard>
                        {!noContries ? (
                            contryList.map((country) => (
                            <StyledLink to={`/${country.name}`} key={country.name}>             
                                <Card 
                                    key={country.name}
                                    code={country.alpha3code}
                                    name={country.name}
                                    population={country.population}
                                    region={country.region}
                                    capital={country.capital}
                                    flags={country.flags.png}
                                    showDetails={showDetails}
                                />
                            </StyledLink>      
                        ))):(
                            <p>No countries found... </p>
                        )}
                    </AllCard>               
                )}     
            </Body>
        </React.Fragment>
        
    )
}

export default Home


/* code qui na pas fonctionner au niveau du fetxh a revoir 

import styled from "styled-components"
import { useState,useEffect } from "react"
import React from "react"
import { Loader, StyledLink } from "../../utils/style/Atoms"
import Card from "../../components/Card"

const Body=styled.body`
    margin:0px 70px;
`

const FilterContainer=styled.div`
    display:flex;
    justify-content:space-between;
    margin:50px 0px; 
`
const SearchBar=styled.input`
    width:400px;
    height:50px;
    border-radius:5px;
    border:none;
    outline:none;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    padding:0 30px;
    &:active{
        background: red;
    }
`
const Filter=styled.select`
    height:50px;
    width:150px;
    border:none;
    outline:none;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
    border-radius:5px;
    padding-left:10px;
`

const Option=styled.option`
    color:red;
`
const AllCard=styled.div`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;  
`

function Home() {

    const [isDataLoading, setDataLoading] = useState(false)
    const [error, setError] = useState(false)
    const [contryList, setContryList] = useState([])

    useEffect(() => {
        async function fetchHome() {
          setDataLoading(true)
          try {
            const response = await fetch(`https://restcountries.com/v2/all`)
            const { contryList } = await response.json()
            setContryList(contryList)
          } catch (err) {
            console.log(err)
            setError(true)
          } finally {
            setDataLoading(false)
          }
        }
        fetchHome()
      }, [])
      
     if(error) {
        return <span>Oups il ya un eu un problème 🙈</span> 
    } 

    return(
        <React.Fragment>
            <Body>
                <FilterContainer>
                        <form action="" method="get">
                            <SearchBar type="text" name="searchbar" placeholder="🔍 Search for a country..."/>
                        </form>
                    <div>
                    <Filter name="filter">
                        <Option value="">Filter by region</Option>
                        <Option value="africa">Africa</Option>
                        <Option value="america">America</Option>
                        <Option value="asia">Asia</Option>
                        <Option value="europe">Europe</Option>
                        <Option value="oceania">Oceania</Option>
                    </Filter>
                    </div>
                </FilterContainer>




                {isDataLoading ?(
                    <Loader/>
                ) : (
                <AllCard>
                    {contryList.map((country) => (
                        <Card
                            key={country.alpha3code}
                            name={country.name}
                            population={country.population}
                            region={country.region}
                            capital={country.capital}
                            flags={country.flags}
                        />       
                    ))}
                </AllCard>  )}
            </Body>
        </React.Fragment>
        
    )
}

export default Home

{/* <AllCard>
                    <StyledLink to="/description">
                        <Card>
                            <Image/>
                            <Texte>
                                <h3>United states of america</>
                                <p>Population: </p>
                                <p>Region: </p>
                                <p>Capital: </p>
                            </Texte>
                        </Card> 
                    </StyledLink> 
                </AllCard>  */


                 