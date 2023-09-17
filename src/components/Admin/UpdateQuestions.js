import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'

import Loader from '../Loader/Loader'
import { toast } from 'react-toastify'

const UpdateQuestions = () => {
    const [questions, setQuestions] = useState([]);
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();

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
                setQuestions(res.data);
                setLoader(false);
            } catch (error) {
                console.log(error);
            }

        }
        fetchData();

    }, [])

    const handleEdit = async (question) => {
        navigate(`../editQuestions/${question.qname}`)
    }

    const handleDelete = async (question, index) => {
        const options = {
            method: 'DELETE',
            withCredentials: true,
            url: `${process.env.REACT_APP_BASE_URL}/admin/delete`,
            data: {
                qname: question.qname
            }
        }

        const response = await axios.request(options);

        if (response.status === 200) {
            toast.success('🦄 Deleted successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            const updatedQuestions = [...questions]
            updatedQuestions.splice(index, 1)
            setQuestions(updatedQuestions)
        }
        else {
            toast.error('🦄 There was some error!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <div className='bg-[#000D15] w-full h-[1080px]'>
            <div className=' flex justify-between pt-48 mx-[8%] text-3xl text-white'>
                {/* Heading  */}
                Questions
                <Link to='../addQuestions'><h1 className='text-2xl border border-[#0993D9] font-extralight px-4 text-[#0993D9] cursor-pointer'>Add+</h1></Link>
            </div>
            <div className='mx-[8%] mt-6 text-[1.075rem] '>
                <div className='flex text-left mx-2 text-[#949494]'>
                    {/* Question Headings -> No.   Title   Difficulty   Tags */}
                    <div className='w-[11%] pl-2'>No.</div>
                    <div className='w-[44%]'>Title</div>
                    <div className='w-[20%] hidden
                    lg:block'>Difficulty</div>
                    <div className='w-[25%] hidden
                    lg:block'>Tags</div>
                </div>
                <div className='w-full h-[0.1px] bg-[#949494] mt-3 opacity-60'>
                    {/* Line  */}
                </div>
                <div>
                    {/* Questions */}
                    {loader ?
                        <Loader bg={'bg-[#000D15]'} alignment={'top-[70%]'} />
                        :
                        questions.map((question, index) => (
                            <div key={index} className={`${((index + 1) % 2 === 0) ? 'bg-[#01080E]' : ''} flex text-left px-2 py-3 font-[400] text-white`}>
                                <div className='w-[11%] pl-2'>
                                    {/* No.  */}
                                    {index + 1}.
                                </div>
                                <Link to={`../questions/${question.qname}`} className='w-[44%]'>
                                    <div className='w-full hover:text-[#1AA2D9]'>
                                        {/* Title.  */}
                                        {question.qname}
                                    </div>
                                </Link>
                                <div className='w-[20%] hidden
                                lg:block'>
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
                                <div className='w-[20%] hidden
                                lg:flex text-white'>
                                    {/* Tags  */}

                                    {question.tags.slice(0, 3).map((tag, index) => (

                                        <div key={index} className='text-white font-light bg-[#616568] rounded-lg px-[0.35rem] mr-2 '>
                                            {tag}
                                        </div>
                                    ))
                                    }

                                </div>
                                <div className='sm:w-[10%] 
                                lg:w-[5%] flex'>
                                    {/* Edit & Delete Options  */}
                                    <AiOutlineEdit onClick={() => { handleEdit(question) }} size={23} className='mr-3 cursor-pointer hover:text-[#1AA2D9]' />
                                    <AiOutlineDelete onClick={() => { handleDelete(question, index) }} size={23} className='cursor-pointer hover:text-[#1AA2D9]' />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default UpdateQuestions
