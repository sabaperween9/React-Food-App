import './App.css';
import {styled} from "styled-components"
import navLogo from './assets/navLogo.png';
import { useEffect, useState } from 'react';
import SearchResult from './Components/SearchResult';

export const BASE_URL = 'http://localhost:9000';

function App() {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedBtn, setSelectedBtn] = useState("all")
  useEffect(() => {
    const fetchFoodData = async () => {
        setLoading(true);
        try {
          const response = await fetch(BASE_URL);
          const json = await response.json(response);
          setData(json);
          console.log(json)
          setLoading(false);
        } catch (error) {
          setError("Unable to fetch Data");
          setLoading(true);
        }
    };
    fetchFoodData();
  },[selectedBtn,filteredData])
 
  const searchFood = (e) => {
    const searchValue = e.target.value;
    if(searchValue === "")
      setFilteredData(null);
    const filter = data?.filter((food) => (
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    ))
    setFilteredData(filter);
  };
  const filterFood = (type) => {
      if(type === 'all') {
        setFilteredData(data);
        setSelectedBtn("all");
        return;
      }
      const filter = data?.filter((food) => (
        food.type.toLowerCase().includes(type.toLowerCase())
      ))
      setFilteredData(filter);
  }

  const filterBtns = [
    {
       name : "All",
       type : "all"
    },
    {
      name : "Breakfast",
      type : "breakfast"
    },
    {
      name : "Lunch",
      type : "lunch"
    },
    {
      name : "Dinner",
      type : "dinner"
    }
  ];

  if(error) return <h1>{error}</h1>;
  if(loading) return <div>loading....</div>;
  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src={navLogo} />
        </div>
        <div className="search">
          <input type="text" placeholder='Search Food....' onChange={(e) => searchFood(e)} />
        </div>
      </TopContainer>
      <FilterContainer>
        {
          filterBtns.map((value) => (
            <Button key = {value.name} onClick={() => filterFood(value.type)}>{value.name}</Button>
          ))
        }
      </FilterContainer>
      <SearchResult data={filteredData?filteredData:data}/>
    </Container>
  );
}

export default App;

const Container =  styled.div`
    max-width: 100%;
    margin: 0 auto;
`;
const TopContainer = styled.div`
    min-height: 15vh;
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }
  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#f22f2f" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;

