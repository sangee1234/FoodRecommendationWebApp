import { useEffect, useState } from 'react';
import './TopFew.css';
import axios from 'axios';
import Card from './Card';
import {useNavigate, useLocation} from "react-router-dom";


function TopFew() {

    const navigate = useNavigate();
    const {state} = useLocation();
    const recipePage = ()=>{
      navigate("/recipe");
    }

    const [top, setTop] = useState(false);
    const [loading, setLoading] = useState(true);

    async function fetchtop() {
        try{
            //console.log(state);
            const response = await axios.post("http://44.229.144.62:8000/getrecommendations/",{data: { 
                state
              }});
            console.log(response);
            setTop(response);
            setLoading(false);
          
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
    useEffect(() => {
        fetchtop();
    }, [])

    return (
        <div className="page2">
            <div className="heading">HERE ARE SOME RECIPES YOU MIGHT LIKE!!</div>
        <div className="page">
            {/* {loading && <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" /> } */}
            {!loading && top && top.data.length>0 && top.data.map((topObj, index) =>
                (
                    
                    <Card name = {topObj.Calories}
                    
                    title = {topObj.Name}
                    TotalTime={topObj.TotalTime}
                    image={getFirst(topObj.Images)}
                    description = {topObj.Description}
                    av_rating={addStars(topObj.av_rating)}
                    />
                ))}
                {loading && <div className="page3"><center><br/>Your fav recipes will be up in 5-10mins. Thanks for your patience !!</center></div>}
        </div>
        </div>
    );
}
export default TopFew;