import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Questions = () => {
    const [questions, setQuestions] = useState([]);

    const [loader, setLoader] = useState(false)

    const options = { 
        method: 'GET',
        withCredentials: true,
        url: `${process.env.REACT_APP_BASE_URL}/user/questions`,
    }

    useEffect(() => {

        setLoader(true)

        const fetchData = async () => {
            try {
                const res = await axios.request(options);
                console.log('API response:', res.data);
                setLoader(false)
                setQuestions(res.data);
            } catch (error) {
                console.log(error);
            }

        }
        fetchData();
    }, [])

    return (
        <div className='bg-[#000D15] w-full h-[1080px]'>
            <div className=' pt-48 mx-[8%] text-3xl text-white'>
                {/* Heading  */}
                Questions
            </div>
            <div className='mx-[8%] mt-6 text-[1.075rem] '>
                <div className='flex text-left mx-2 text-[#949494]'>
                    {/* Question Headings -> No.   Title   Difficulty   Tags */}
                    <div className='w-[11%] pl-2'>No.</div>
                    <div className='w-[44%]'>Title</div>
                    <div className='w-[20%]'>Difficulty</div>
                    <div className='w-[25%]'>Tags</div>
                </div>
                <div className='w-full h-[0.1px] bg-[#949494] mt-3 opacity-60'>
                    {/* Line  */}
                </div>
                <div>
                    {/* Questions */}
                    {loader ? <Loader bg={'bg-[#000D15]'} alignment={'top-[70%]'} />
                        :
                        questions.map((question, index) => (

                            <div key={index} className={`${((index + 1) % 2 === 0) ? 'bg-[#01080E]' : ''} flex text-left px-2 py-3 font-[400] text-white`}>
                                <div className='w-[11%] pl-2'>
                                    {/* No.  */}
                                    {index + 1}.
                                </div>
                                <Link to={`./${question.qname}`} className='w-[44%]'>
                                    <div className='w-full hover:text-[#1AA2D9]'>
                                        {/* Title.  */}
                                        {question.qname}
                                    </div>
                                </Link>
                                <div className={`w-[20%]`}>
                                    {/* Difficulty  */}

                                    {(() => {
                                        if (question.difficulty === 'Easy') {
                                            return <p className='text-[#00FF38]'>{question.difficulty}</p>
                                        }
                                        else if (question.difficulty === 'Medium') {
                                            return <p className='text-[#FFC700]'>{question.difficulty}</p>
                                        }
                                        else {
                                            return <p className='text-[#E30000]'>{question.difficulty}</p>
                                        }
                                    })()}
                                </div>
                                <div className='w-[25%] hidden 
                                md:flex text-white'>
                                    {/* Tags  */}

                                    {question.tags.slice(0, 3).map((tag, index) => (

                                        <div key={index} className='text-white font-light bg-[#616568] rounded-lg px-[0.35rem] mr-2 '>
                                            {tag}
                                        </div>
                                    ))}

                                </div>
                            </div>
                        ))

                    }

                </div>
            </div>
        </div>
    )
}

export default Questions
