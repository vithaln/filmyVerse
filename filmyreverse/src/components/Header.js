import React, { createContext, useContext } from 'react'
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AppState } from '../App';

const Header = () => {
const useAppState=useContext(AppState);

  return (
    <div className=' sticky z-10 header top-0 bg text-3xl p-3 flex justify-between items-center text-red-600 font-bold border-b-2 border-b-gray-500' >
      <Link to={'/'}> <span> Filmy<span className='text-white' >Verse</span></span></Link>
      

      {useAppState.login ?
        <Link to={'/addmovie'}><h1 className='text-lg cursor-pointer flex items-center'>
          <Button><AddIcon className='mr-1' color='secondary' /> <span className='text-white'>Add New</span></Button>
      </h1></Link>
      :
      <Link to={'/login'}><h1 className='text-lg bg-green-500 cursor-pointer flex items-center'>
          <Button><span className='text-white font-medium capitalize'>Login</span></Button>
      </h1></Link>
      }

    </div>
  )
}

export default Header