import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimelineImage.png";

const timeLine = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success comapny"
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority"
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills"
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution"
    }
]
const TimeLineSection = () => {
  return (
    <div className='mt-16'>
        <div className='flex flex-row gap-14 items-center'>
          
            <div className='w-[45%] flex flex-col gap-10'>
                {
                    timeLine.map( (element, index) => {
                        return(
                            <div className='flex flex-row gap-7' key={index}>
                                  
                                <div className='w-[50px] h-[50px] rounded-full bg-white flex justify-center items-center'>
                                    <img src={element.Logo} alt='logo'/>
                                </div>

                                <div>
                                    <h2 className='font-semibold text-lg'>{element.Heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='relative shadow-blue-200'>
                <img src={timeLineImage} alt='timeLineImage' className='shadow-white object-cover h-fit '/>

                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[7.5%] -mt-12'>
                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-caribbeangreen-100 text-sm font-bold'>Years of Experience</p>
                    </div>

                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-caribbeangreen-100 text-sm font-bold'>Types of Courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimeLineSection