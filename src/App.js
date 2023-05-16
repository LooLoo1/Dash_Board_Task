import * as React from 'react'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { fetchToDo } from './store/asyncActions/todo';
import Home from "./pages/Home";
import Forma from "./pages/Forma";


function App() {
	const dispatch = useDispatch()

	useEffect(()=>{
		dispatch(fetchToDo())
	},[])

  return (
    <Routes>
		<Route path='/' element={<Home/>}/>
		<Route path='/new' element={<Forma/>}/>
		<Route path='/new/:id' element={<Forma edit/>}/>
		<Route path='*' element={<Home/>}/>
	 </Routes>
  );
}

export default App;
