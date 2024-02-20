import React from 'react'
import HighlightText from '../homePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-richblack-5 text-center text-4xl font-semibold'>
        " We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText text={"combines technology"}/>,
        <span className='text-brown-600'>
            expertise
        </span>
        , and community to create an
        <span className='text-brown-600'> unparalleled educational experience.</span> "
    </div>
  )
}

export default Quote