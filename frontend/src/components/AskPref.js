import './AskPref.css';
import Cardrate from './Cardrate';
import React, {Component, useState, useEffect} from 'react';
import axios  from 'axios';
import {useNavigate} from "react-router-dom";

function AskPref() {

    const [few, setFew] = useState(false);
    const [rate, setRating] = useState({});
    const navigate = useNavigate();
    const TopFewPage = ()=> {

        navigate("/topfew",{
            state: rate
        });
        // console.log(rate);
      }
    async function fetchfew() {
        try{
            const url = "http://localhost:8000/samplerecipes";
            // const cacheStorage = await caches.open("cacheSample");
            // const cachedResponse = await cacheStorage.match(url);

            // if (cachedResponse && cachedResponse.ok) {
            //     setFew(cachedResponse);
            // }
            // else{
            const response = await axios.get(url,{headers: { 
                
              }});
            //   console.log(response.data);
            setFew(response);
            // if ('caches' in window) {
                
            //     caches.open("cacheSample").then((cache) => {
            //       cache.put(url, response);
            //       alert('Data Added into cache!')
            //     });
            //   }
            // }
            
        }catch(error){
            console.log(error);
        }

    }
    const getFirst = (s1) => {
        let [first,second, ...rest] = s1.split('\'');
        return second;
    }

    const addStars = (s1) => {
        return s1+" stars";
    }
    
    //  const onRateChange =  function(name) {
    //     this.setState({
    //       name: name
    //     });
    //     console.log(this.name);
    //   }
    
    const setRate = function(name, rateval) {

        setRating(rate => ({
            ...rate,
            ...{[name] :rateval}
        }))
        // console.log(rate);

    }
    useEffect(() => {
        fetchfew();
    }, [])

    return (
       <div>
        <div className="heading"> Rate the following recipes, to understand your taste :)</div>
        
        <div className="page">

            {few && few.data.length>0 && few.data.map((topObj, index) =>
                (
                    
                    <Cardrate name = {topObj.Calories}
                    
                    title = {topObj.Name}
                    TotalTime={topObj.TotalTime}
                    image={getFirst(topObj.Images)}
                    description = {topObj.Description}
                    av_rating={addStars(topObj.av_rating)}
                    recipeId={topObj.RecipeId}
                    rating = "0"
                    setRating = {setRate}
                    // onChange={onRateChange} value={topObj.Name}
                    />
                ))}
        </div>
        <button className="done" onClick={()=>{TopFewPage()}}>Done rating</button>
        </div>
    );
}

export default AskPref;
