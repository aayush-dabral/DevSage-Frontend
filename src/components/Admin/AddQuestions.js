import React, { useState } from 'react'
import { BsCheck2Square } from 'react-icons/bs'
import { MdOutlineCancel } from 'react-icons/md'
import axios from 'axios';
import { toast } from 'react-toastify';

import { IoArrowBackOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom';

const AddQuestions = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [content, setContent] = useState("")
    const [input, setInput] = useState("")
    const [difficulty, setDifficulty] = useState("Easy")

    const [tags, setTags] = useState([]);
    const [currTag, setCurrTag] = useState("");

    const [adding, setAdding] = useState(false);

    const updateName = (e) => {
        setName(e.target.value)
    }

    const updateContent = (e) => {
        setContent(e.target.value)
    }

    const updateInput = (e) => {
        setInput(e.target.value)
    }

    let initialCurrTest = Object.freeze({
        input: "",
        expected: ""
    })

    const [tests, setTests] = useState([])
    const [currTest, setCurrTest] = useState(initialCurrTest)

    const handleTagChange = (e) => {
        // console.log(e.target.value)
        setCurrTag(e.target.value);
    }

    const addTag = (e) => {
        let length = tags.length;
        if (length < 5) {
            let updatedTags = [...tags, currTag]
            setTags(updatedTags)
        }
        else {
            //Flash Error
            console.log("Max value of tags reached")
        }
    }

    const removeTag = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    }

    const handleTestChange = (e) => {
        setCurrTest({
            ...currTest,

            [e.target.name]: e.target.value
        })
        // console.log(currTest)
    }


    const addTest = (e) => {
        if (currTest.input !== '' && currTest.expected !== '') {
            let updatedTests = [...tests, currTest];
            setTests(updatedTests);
        }
    }

    const removeTest = (index) => {
        const updatedTests = [...tests];
        updatedTests.splice(index, 1);
        setTests(updatedTests);
    }

    const addRequest = async () => {
        setAdding(true);

        const options = {
            method: 'POST',
            withCredentials: true,
            url: `${process.env.REACT_APP_BASE_URL}/admin/create`,
            data: {
                qname: name,
                qbody: content,
                difficulty: difficulty,
                inpFormat: input,
                tags: tags,
                testCases: tests
            }
        }

        const res = await axios.request(options);
        if (res.status === 202) {
            toast.error('A question with this name already exists', {
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
        else {
            toast.success('🦄 Question added successfully!', {
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

        setAdding(false);

    }

    return (
        <>
            <div className={`bg-[#000D15] w-full pb-36 hidden md:block`}>
                <div className=' flex justify-between pt-40 mx-[8%] text-3xl text-white'>
                    {/* Heading  */}
                    Add Question
                </div>
                <form className='mt-6 w-[84%] mx-auto'>
                    <div className='h-[0.1px] bg-[#949494] mt-3 opacity-60 mx-auto'>
                        {/* Line  */}
                    </div>
                    <label className=' flex bg-[#01080E] mt-5 py-1 pr-1 font-light'>
                        {/* Name  */}
                        <div className='text-[1.35rem] text-white text my-auto ml-4 w-[13%]'>
                            Name
                        </div>
                        <input onChange={updateName} className='text-[1.35rem] text-white bg-[#0E141A] w-[87%] px-2 py-1'></input>
                    </label>

                    <div className='h-[0.1px] bg-[#949494] mt-3 opacity-60 w-[40%] mx-auto' />

                    <label className=' flex bg-[#01080E] mt-5 py-1 pr-1 font-light'>
                        {/* Name  */}
                        <div className='text-[1.35rem] text-white text my-auto ml-4 w-[13%] mt-0'>
                            Content
                        </div>
                        <textarea onChange={updateContent} className='text-[1.35rem] text-white bg-[#0E141A] w-[87%] px-2 py-1 h-56'
                            wrap={'soft'}
                        ></textarea>
                    </label>

                    <div className='h-[0.1px] bg-[#949494] mt-3 opacity-60 w-[40%] mx-auto' />

                    <label className=' flex bg-[#01080E] mt-5 py-1 pr-1 font-light text-[1.35rem] w-[60%]'>
                        {/* Difficulty  */}
                        <div className=' text-white text my-auto ml-4 w-[13%] mt-0'>
                            Difficulty
                        </div>
                        <div className='flex justify-between w-[40%] ml-[30%]'>
                            <div onClick={() => setDifficulty("Easy")} className={`text-[#00FF38] cursor-pointer px-3 rounded-lg ${difficulty === 'Easy' ? 'bg-[#1c2833] ' : ''}`}>Easy</div>
                            <div onClick={() => setDifficulty("Medium")} className={`text-[#FFC700] cursor-pointer px-3 rounded-lg ${difficulty === 'Medium' ? 'bg-[#0E141A]' : ''}`}>Medium</div>
                            <div onClick={() => setDifficulty("Hard")} className={`text-[#E30000] cursor-pointer px-3 rounded-lg ${difficulty === 'Hard' ? 'bg-[#0E141A]' : ''}`}>Hard</div>
                        </div>
                    </label>

                    <div className='h-[0.1px] bg-[#949494] mt-5 opacity-60 w-[40%] mx-auto' />

                    <label className=' flex bg-[#01080E] mt-5 py-1 pr-1 font-light'>
                        {/* Name  */}
                        <div className='text-[1.35rem] text-white text my-auto ml-4 w-[13%] mt-0'>
                            Input <br /> Format
                        </div>
                        <textarea onChange={updateInput} className='text-[1.35rem] text-white bg-[#0E141A] w-[87%] px-2 py-1 h-44'
                            wrap={'soft'}
                        ></textarea>
                    </label>

                    <div className='h-[0.1px] bg-[#949494] mt-3 opacity-60 w-[40%] mx-auto' />

                    <label className=' flex bg-[#01080E] mt-5 py-1 pr-1 font-light text-white text-[1.35rem]'>
                        {/* Name  */}

                        <div className='text-[1.35rem] text-white text my-auto ml-4 w-[13%] mt-0'>
                            Tags<br /><span>(Upto 5)</span>
                        </div>

                        <div className="w-full">

                            <div className='flex mb-4 '>
                                {tags.map((tag, index) => (
                                    <div key={index} className='flex bg-[#0E141A] px-4 py-1 text-lg font-light text-opacity-60 mr-2 rounded-lg'>
                                        {tag}

                                        <MdOutlineCancel size={20} onClick={() => { removeTag(index) }} className='text-white my-auto ml-2 cursor-pointer' />
                                    </div>

                                ))}

                            </div>

                            <div className='w-[35%] flex'>
                                <input type='text' onChange={handleTagChange} placeholder='Enter Tag Name' className='text-lg text-white bg-[#0E141A] w-[100%] py-1 pl-2'></input>
                                <BsCheck2Square onClick={addTag} size={30} className='text-white ml-2 cursor-pointer' />
                            </div>
                        </div>

                    </label>

                    <div className='h-[0.1px] bg-[#949494] mt-3 opacity-60 w-[40%] mx-auto' />

                    <label className=' flex bg-[#01080E] mt-5 py-1 pr-1 font-light text-white text-[1.35rem]'>
                        {/* Test Cases  */}

                        <div className='text-[1.35rem] text-white my-auto ml-4 w-[13%] mt-3'>
                            Test Cases
                        </div>

                        <div className="w-full">

                            <div className='flex flex-wrap mb-4 max-h-[400px] overflow-y-auto'>
                                {tests.map((testCase, index) => (
                                    <div key={index} className='flex flex-col items-center bg-[#0E141A] px-2 py-1 text-lg font-light text-opacity-60 mr-2 rounded-lg w-[30%]'>
                                        <div className='w-full border border-white px-2 mt-2 mb-4'>{testCase.input}</div>
                                        <div className='w-full border border-white px-2 mb-4'>{testCase.expected}</div>
                                        <MdOutlineCancel size={20} onClick={() => { removeTest(index) }} className='text-white ml-2 cursor-pointer' />

                                    </div>

                                ))}

                            </div>

                            <div className='w-[35%] flex'>
                                <div>
                                    <input type='text' name='input' onChange={handleTestChange} placeholder='Input' className='text-lg text-white bg-[#0E141A] w-[100%] py-1 pl-2 mb-2'></input>
                                    <input type='text' name='expected' onChange={handleTestChange} placeholder='Expected Output' className='text-lg text-white bg-[#0E141A] w-[100%] py-1 pl-2 mb-2'></input>

                                </div>
                                <BsCheck2Square onClick={addTest} size={30} className='text-white ml-2 cursor-pointer my-auto' />
                            </div>
                        </div>

                    </label>
                    <div className={`${adding ? 'bg-[#3c4245] cursor-not-allowed' : ''} w-full flex justify-end mt-8`}>
                        <div onClick={addRequest} className={` ${adding ? 'bg-[#3c4245] cursor-' : ''}w-fit border border-[#1AA2D9] text-[#1AA2D9] text-2xl px-2 cursor-pointer`}>Submit</div>
                    </div>
                </form>
            </div>
            <div className='h-screen w-full bg-[#000D15] pb-24 md:hidden'>
                <h1 className='mx-auto text-white text-4xl pt-72 w-[80%]'> Switch to larger screen to access this section </h1>
                <Link to='/questions'>
                    <div className='flex w-[80%] mx-auto'>
                        <IoArrowBackOutline onClick={() => {navigate(-1)}} size={30} className='text-[#1AA2D9] mt-4' />
                        <p onClick={() => {navigate(-1)}} className='text-[#1AA2D9] text-2xl w-[80%] mt-4'>Back to questions</p>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default AddQuestions
