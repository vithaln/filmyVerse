import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewsref, db } from "./firebase/firebase";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import {
  addDoc,
  doc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import swal from "sweetalert";
import { AppState } from "../App";
import { useNavigate } from "react-router-dom";

const Reviews = ({ id, prevRating, userRated }) => {
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [form, setForm] = useState("");
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [data, setData] = useState([]);
const[newAdded,setNewAdded]=useState(0);
const navigate=useNavigate();
const useAppState=useContext(AppState);

  const sendReview = async () => {
    try {

      if(useAppState.login){
      setLoading(true);
      await addDoc(reviewsref, {
        movieid: id,
        namE: useAppState.userName,
        rating: rating,
        thought: form,
        timestamp: new Date().getTime(),
      });

      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1,
      });

      setRating(0);
      setForm("");
      setNewAdded(newAdded+1)
      swal({
        title: "Review sent successfully ",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
    }else{
      navigate('/login')
    }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }

    setLoading(false);
  };

  

  useEffect(() => {
    async function getData() {
        setReviewsLoading(true);
        setData([]);
        let quer = query(reviewsref, where('movieid', '==', id))
        const querySnapshot = await getDocs(quer);
        
        querySnapshot.forEach((doc) => {
            setData((prev) => [...prev, doc.data()])
        })

        setReviewsLoading(false);
    }
    getData();
},[newAdded])
  return (
    <div className="w-full mt-4">
      <ReactStars
        size={20}
        half={true}
        // value={rating}
        onChange={(rate) => setRating(rate)}
      />

      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder="Please Share Your thoughts..."
        className="w-full p-2 outline-none header"
      />
      <button
        onClick={sendReview}
        className="bg-green-600 w-full flex justify-center p-2 "
      >
        {loading ? <TailSpin height={15} color="white" /> : "Share"}
      </button>
      
          {/* //  reviewsLoading ? 
           
          //  <div className="mt-5 flex justify-center ">
          //  <ThreeDots height={10} /> 
          //  </div>
           
          //  :
          //  <div>

          //      {
          //           data.map((e,i)=>{
          //                 return(
          //                <p key={i}>{e.thought}</p> );
          //           })
          //      }
          //  </div> */}


    {
            reviewsLoading ? 
            <div className='mt-6 flex justify-center'><ThreeDots height={10} color="white" /></div>
        :
        <div className='mt-4'>
            {data.map((e, i) => {
                return(
                    <div className=' p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2' key={i}>
                        <div className='flex items-center'>
                            <p className='text-blue-500'>{e.namE}</p>
                            <p className='ml-3 text-xs'>({new Date(e.timestamp).toLocaleString()})</p>
                        </div>
                        <ReactStars
                            size={15}
                            half={true}
                            value={e.rating}
                            edit={false}
                        />

                        <p>{e.thought}</p>
                    </div>     
                )
            })}
            </div>

      }
      
    </div>
  );
};

export default Reviews;
