import "./hotel.css"
import { useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Header from '../../components/header/Header';
import MailList from './../../components/mailList/MailList';
import Footer from './../../components/footer/Footer';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faCircleXmark, faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import useFetch from './../../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import { da } from "date-fns/locale";

const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [sliderNumber, setSliderNumber] = useState(0)
  const [open, setOpen] = useState(false)

  const { data, loading, error } = useFetch(`/hotels/find/${id}`)

  const handleOpen = (i) => {
    setSliderNumber(i);
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber;

    if(direction === 'l') {
      newSlideNumber = sliderNumber === 0 ? 5 : sliderNumber-1
    } else {
      newSlideNumber = sliderNumber === 5 ? 0 : sliderNumber+1
    }

    setSliderNumber(newSlideNumber)
  }

  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      {loading ? ("loading") : (<div className="hotelContainer">
        {open && <div className="slider">
          <FontAwesomeIcon icon={faCircleXmark} className="close"/>
          <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove("l")}/>
          <div className="sliderWrapper">
            <img src={data.photos[sliderNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove("r")}/>
          </div>}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img onClick={() => handleOpen(i)} key={i} src={photo} alt="" className="hotelImg"/>
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>$945</b> (9 nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
      </div>)}
    </div>
  )
}

export default Hotel