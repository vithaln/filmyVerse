import React, { useEffect, useState } from "react";
import ReactStars from 'react-stars'
import {TailSpin, ThreeDots} from 'react-loader-spinner'
import { addDoc, getDoc, getDocs } from "firebase/firestore";
import { moviesref } from "./firebase/firebase";
import { Link } from "react-router-dom";

const Cards = () => {


  const [data, setData] = useState([
    // {
    //   name: "Pathan",
    //   year: "2023",
    //   rating: 3,
    //   img: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/pathan/pathan-poster-10.jpg",
    // },
    // {
    //   name: "Pathan",
    //   year: "2023",
    //   rating: 5,
    //   img: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/pathan/pathan-poster-10.jpg",
    // },{
    //   name: "Pathan",
    //   year: "2023",
    //   rating: 2,
    //   img: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/pathan/pathan-poster-10.jpg",
    // },{
    //   name: "Pathan",
    //   year: "2023",
    //   rating: 5,
    //   img: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/pathan/pathan-poster-10.jpg",
    // },{
    //   name: "Pathan",
    //   year: "2023",
    //   rating: 5,
    //   img: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/pathan/pathan-poster-10.jpg",
    // },{
    //   name: "Pathan",
    //   year: "2023",
    //   rating: 5,
    //   img: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/pathan/pathan-poster-10.jpg",
    // },{
    //   name: "Pathan",
    //   year: "2023",
    //   rating: 5,
    //   img: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/pathan/pathan-poster-10.jpg",
    // },{
    //   name: "Pathan",
    //   year: "2023",
    //   rating: 5,
    //   img: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/pathan/pathan-poster-10.jpg",
    // },{
    //   name: "Pathan",
    //   year: "2023",
    //   rating: 5,
    //   img: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/pathan/pathan-poster-10.jpg",
    // },{
    //   name: "Pathan",
    //   year: "2023",
    //   rating: 5,
    //   img: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/pathan/pathan-poster-10.jpg",
    // },{
    //   name: "Pathan",
    //   year: "2023",
    //   rating: 5,
    //   img: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/pathan/pathan-poster-10.jpg",
    // },{
    //   name: "Pathan",
    //   year: "2023",
    //   rating: 5,
    //   img: "https://cdn.bollywoodmdb.com/fit-in/movies/largethumb/2022/pathan/pathan-poster-10.jpg",
    // },
  ]);

  const[loading,setLoading]=useState(false);

useEffect(()=>{

  async function getData(){
setLoading(true);

const _data=await getDocs(moviesref);

_data.forEach((doc)=>{

  setData((prev)=>[...prev,{...(doc.data()),id:doc.id}])
})

setLoading(false);
  }
getData();
},[])


  return (
    <div className="flex flex-wrap justify-between px-3 mt-3">
      { loading? <div className="w-full flex  justify-center items-center h-96"> <ThreeDots/> </div>:
      data.map((e, i) => {

        return (
<Link to={`/detail/${e.id}`}>
          <div
            key={i}
            className="card cursor-pointer hover:-translate-y-2 p-3  mt-6 transition-all duration-500 "
          >
            <img className="h-60 md:h-72 card shadow-lg p-2 " src={e.img} />
            <h1>
              {/* <span className="text-gray-500">Name: </span>  */} {e.title}
            </h1>
            <h1>
              <span className="text-gray-500">Year: </span> {e.year}
            </h1>
            <h1 className="flex items-center">
              <span className="text-gray-500 mr-1">Rating: </span> 
              <ReactStars 
              size={20}
              half={true}
              edit={false}
              value={e.rating/e.rated }
              />
            </h1>
          </div>
          </Link>
        )
      })}

    </div>
  );
};

export default Cards;
