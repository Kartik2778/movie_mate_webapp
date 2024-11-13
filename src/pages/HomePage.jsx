import React from 'react'
import NavBar from '../components/NavBar'
import SimpleSlider from '../components/SimpleSlider'
import MovieContainer from '../components/MovieContainer'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <div className='mb-10'>
     <NavBar/>
     <SimpleSlider/>
     <MovieContainer/>
     <Footer/>
    </div>
  )
}

export default HomePage
