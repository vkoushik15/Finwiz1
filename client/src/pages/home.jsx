/*import React, { useState, useEffect } from "react";
import axios from "axios"
import green from './green.jpg'
import red from './red.jpg'
import '../styling/home.css'
import { auth } from "./firebase";
import {signOut,onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import News from "../components/news";

const Home = () => {
  const API = import.meta.env.VITE_STOCKAPI;

  const [stocks, setStocks] = useState([]);
  const[user,setUser]=useState('User')
  const navigate = useNavigate()
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth,(user)=>{
   if(user){
    console.log(user)
    setUser(user.displayName)
   }
   else{
    console.log('User')
   }
    })
    return()=>unsub()
  })
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login'); // Navigate to login page after logging out
      })
      .catch((error) => {
        console.error('Error during sign out:', error);
      });
  };

  // Fetch stock data
  const fetchStockPrices = async () => {
    console.log('the stock pruices are',API)
    try {
      // Replace with your API URL and key
      const response = await axios.get(
        `https://api.twelvedata.com/time_series?apikey=${API}`, //d
       // "https://api.twelvedata.com/stocks",
        {
          params: {
            symbol: "TSLA,META,MSFT,GOOGL,GS,BTC/USD,ETH/USD",
            //Sexchange:"NASDAQ", // Example stock symbols
            interval: "1min",
            
            // Replace with your API key
          },
        }
      );

      const stockData = Object.entries(response.data).map(([symbol, data]) => ({
        symbol,
        price: parseFloat(data.values[0].close),
        prevPrice: parseFloat(data.values[1].close),
      }));

      setStocks(stockData);
    } catch (error) {
      console.error("Error fetching stock prices:", error);
    }
  };

  useEffect(() => {
    fetchStockPrices();
    const interval = setInterval(fetchStockPrices, 60000); // Fetch data every minute
    return () => clearInterval(interval);
  }, []);

  return (

    <>
    <div className="home-container">
      <h1>Stock Prices</h1>
      <h1>welcome {user}</h1>
      <div className="stocks-container">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className="stock-card"
            style={{
              borderColor: stock.price > stock.prevPrice ? "green" : "red",
            }}
          >
            <h2>{stock.symbol}</h2>
            <p className="stock-price">${stock.price.toFixed(2)}</p>
            <img
              src={stock.price > stock.prevPrice ? green : red}
              alt={stock.price > stock.prevPrice ? "Profit chart" : "Loss chart"}
              className="stock-chart"
            />
          </div>
        ))}
      </div>
    </div>
    <div className="newsb">
      <News/>
    </div>
    <button onClick={handleLogout}>LOgout</button>
    </>
  );
};

export default <Home></Home>*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import green from './green.jpg';
import red from './red.jpg';
import '../styling/home.css';
import { auth } from "./firebase";
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import News from "../components/news";
import building from '../images/mainbuilding.jpg'

const Home = () => {
  const API = import.meta.env.VITE_STOCKAPI;

  const [stocks, setStocks] = useState([]);
  const [user, setUser] = useState('User');
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.displayName);
      }
    });
    return () => unsub();
  });

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login'); // Navigate to login page after logging out
      })
      .catch((error) => {
        console.error('Error during sign out:', error);
      });
  };

  // Fetch stock data
  const fetchStockPrices = async () => {
    try {
      const response = await axios.get(
        `https://api.twelvedata.com/time_series?apikey=${API}`,
        {
          params: {
            symbol: "TSLA,META,MSFT,GOOGL,GS,BTC/USD,ETH/USD",
            interval: "1min",
          },
        }
      );

      const stockData = Object.entries(response.data).map(([symbol, data]) => ({
        symbol,
        price: parseFloat(data.values[0].close),
        prevPrice: parseFloat(data.values[1].close),
      }));

      setStocks(stockData);
    } catch (error) {
      console.error("Error fetching stock prices:", error);
    }
  };

  useEffect(() => {
    fetchStockPrices();
    const interval = setInterval(fetchStockPrices, 60000); // Fetch data every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="home-container">
        <h1 className="welcome-user">Welcome {user}</h1>
        <div className="stocks-container">
          {stocks.map((stock) => (
            <div
              key={stock.symbol}
              className="stock-card"
            >
              <div className="stock-info">
                <h2>{stock.symbol}</h2>
                <p className="stock-price">${stock.price.toFixed(2)}</p>
              </div>
              <img
                src={stock.price > stock.prevPrice ? green : red}
                alt={stock.price > stock.prevPrice ? "Profit chart" : "Loss chart"}
                className="stock-chart"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="mainimg">
        <img src={building}/>
      </div>
      <div className="newsb">
        <News />
      </div>
      <button  className='logoutbutton'onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;
