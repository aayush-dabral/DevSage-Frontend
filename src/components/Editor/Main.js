import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Editor from '@monaco-editor/react'
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs'

import LanguageDropdown from './subComponents/LanguageDropdown'
import ThemeDropdown from './subComponents/ThemeDropdown'
import OutputWindow from './subComponents/OutputWindow'
import { defineTheme } from './utils/defineTheme'
import { languageOptions } from './utils/languageOptions'
import Loader from '../Loader/Loader';


const Main = () => {

    const [themeLoader, setThemeLoader] = useState(false)

    //Editor States
    const javascriptDefault = `// some comment`;
    const [code, setCode] = useState(javascriptDefault);
    const [value, setValue] = useState(code || "");
    const [theme, setTheme] = useState("cobalt")
    const [language, setLanguage] = useState(languageOptions[12])
    const [output, setOutput] = useState()
    const [compileResponse, setCompileResponse] = useState()

    //Compile and Submit Loaders
    const [compiling, setCompiling] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    //Other States
    const [consoleActivate, setConsoleActivate] = useState(false)
    const [consoleOption, setConsoleOption] = useState('Console')
    const [input, setInput] = useState(code)
    const [isChecked, setIsChecked] = useState(false)
    const [question, setQuestion] = useState(null)

    const { qname } = useParams();
    const options = {
        method: 'GET',
        withCredentials: true,
        url: `${process.env.REACT_APP_BASE_URL}/user/search`,
        params: {
            qname: qname
        },
    }

    const inputChange = (e) => {
        setInput(e.target.value);
    }

    useEffect(() => {

        if (!qname) {
            return; // Early return if qname is not available
        }

        const fetchQuestion = async () => {
            try {
                const response = await axios.request(options);
                // console.log(response.data);
                setQuestion(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchQuestion();

        //For the editor
        defineTheme('oceanic-next')
            .then((theme) => {
                setTheme({ value: 'oceanic-next', label: 'Oceanic Next' });
            })
            .catch((error) => {
                console.error('Error setting theme:', error);
            });

        //To prevent the editor from showing a white default background
        setThemeLoader(true);
        
    }, [])



    //To set Code
    const onChange = (action, data) => {
        switch (action) {
            case "code": {
                setCode(data);
                break;
            }
            default: {
                console.warn("case not handled!", action, data);
            }
        }
    };

    const handleEditorChange = (value) => {
        setValue(value);
        onChange("code", value);
    };

    const onSelectChange = (sl) => {
        console.log("selected Option...", sl);
        setLanguage(sl);
    };

    function handleThemeChange(th) {
        const theme = th;
        console.log("theme...", theme);

        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
        } else {
            defineTheme(theme.value).then((_) => setTheme(theme));
        }
    }

    const handleCompile = async () => {
        try {
            setCompiling(true)
            let response;

            if (input && isChecked) {
                const options = {
                    method: 'POST',
                    withCredentials: true,
                    url: `${process.env.REACT_APP_BASE_URL}/user/compile`,
                    data: {
                        qname: qname,
                        language: language.id,
                        code: code,
                        input: input
                    },
                };

                response = await axios.request(options)

            }
            else {
                const options = {
                    method: 'POST',
                    withCredentials: true,
                    url: `${process.env.REACT_APP_BASE_URL}/user/compile`,
                    data: {
                        qname: qname,
                        language: language.id,
                        code: code
                    },
                };

                response = await axios.request(options)
            }

            setCompileResponse(response.data.response);


            console.log(response)
            setOutput(response.data.output)
            setCompiling(false)
        } catch (error) {
            console.error(error);
        }

    }

    const handleSubmit = async () => {
        try {
            // const lang = languageOptions.find((lang) => {
            //     return lang.name === language
            // })
            // console.log(language)
            setSubmitting(true)
            const options = {
                method: 'POST',
                withCredentials: true,
                url: `${process.env.REACT_APP_BASE_URL}/user/submission`,
                data: {
                    qname: qname,
                    language: language.id,
                    code: code
                },
            };

            const response = await axios.request(options)
            setSubmitting(false)
            console.log(response)
            if (response.status === 200) {
                toast.success(`🦄 ${response.data.result} / ${question.testCases.length} passed!`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }

        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className='h-[100vh] 
        md:flex bg-[#01080E] w-full pt-12'>
            <div className='bg-[#000D15]  ml-2 h-full overflow-y-auto 
            w-full
            md:w-[45%]'>

                {question ?

                    <>
                        {/* Question  */}
                        <div className='w-full mt-8 '>
                            {/* Question Name  */}
                            <h1 className='text-white text-2xl text-center underline underline-offset-8 decoration-1'>
                                {question.qname}
                            </h1>
                        </div>
                        <div className='w-[88%] text-left mx-auto mt-8'>
                            {/* Question Body  */}
                            <p className='text-white text-[1.075rem]'>
                                {question.qbody}
                            </p>
                        </div>

                        <div className='h-[0.1px] bg-[#ffffff] mt-6 w-[40%] ml-10' />

                        <div className='w-[88%] text-left mx-auto mt-6'>
                            {/* Input Format  */}
                            <h3 className='text-white text-2xl underline underline-offset-8 decoration-1 '>Input Format</h3>
                            <p className='text-white text-[1.075rem] mt-6'>
                                {question.inpFormat}
                            </p>
                        </div>

                        <div className='h-[0.1px] bg-[#ffffff] mt-6 w-[40%] ml-10' />

                        <div className='w-[88%] text-left mx-auto mt-8 mb-4'>
                            {/* Test Cases  */}
                            <h3 className='text-white text-2xl underline underline-offset-8 decoration-1 mb-6'>Test Cases</h3>
                            {question.testCases.map((que, index) => (
                                <div key={index} className='flex text-white mt-4'>
                                    <div className='mr-2'>
                                        <p>{index + 1}.</p>
                                    </div>
                                    <div>
                                        <p className='mb-1'><span className='bg-[#616568] px-2 rounded-md'>Input</span> -&gt; {que.input}</p>
                                        <p><span className='bg-[#616568] px-2 rounded-md'>Output</span> -&gt; {que.expected}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                    :
                    //Add loader instead of this here.
                    <Loader bg={'bg-[#000D15]'} alignment={'left-[20%] top-[45%]'} />
                }


            </div>

            <div className=' ml-2 mr-2 h-full 
            w-full
            md:w-[55%]'>
                <div className='bg-[#000D15] flex h-[7%] mb-2 justify-end  pr-2 w-full'>
                    <LanguageDropdown onSelectChange={onSelectChange} className='' />
                    <div className='w-2' />
                    <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} className='left-2' />
                </div>

                <div className={`overlay overflow-hidden bg-[#000D15] ${consoleActivate ? 'h-[50%]' : 'h-[70%]'}  mb-2`}>
                    {/* Editor  */}
                    {themeLoader ?
                        <Editor
                            height={'100%'}
                            width={`100%`}
                            
                            language={language.value || "javascript"}
                            value={value}
                            theme={theme.value}
                            defaultValue="// some comment"
                            onChange={handleEditorChange}
                            className=''
                        />
                        :
                        <div className='relative h-full w-full'>
                            <Loader bg={'bg-[#000D15]'} alignment={'top-[45%]'}/>
                        </div> 
                    }




                </div>
                <div className={`bg-[#000D15] ${consoleActivate ? 'h-[39%]' : 'h-[20%]'} relative`}>
                    {consoleActivate ?
                        <BsFillArrowDownCircleFill size={30} onClick={() => setConsoleActivate(false)} className='absolute text-white left-1/2 transform -translate-x-1/2 -top-10 lg:-top-5 cursor-pointer' />
                        :
                        <BsFillArrowUpCircleFill size={30} onClick={() => setConsoleActivate(true)} className='absolute text-white left-1/2 transform -translate-x-1/2 -top-10 lg:-top-5 cursor-pointer' />
                    }

                    {/* Output  */}
                    <div className={`${consoleActivate ? 'h-[15%]' : 'h-[25%]'} flex justify-between w-full`} >
                        {/* Console Section Options  */}
                        <div className='flex'>
                            {/* Output  */}
                            <div onClick={() => { setConsoleOption('Console'); }} className='text-white ml-4 cursor-pointer'>Console</div>
                            {/* Custom Input  */}
                            <div onClick={() => { setConsoleOption('Input') }} className='text-white ml-4 md:ml-12 cursor-pointer flex bg-[#616568] h-6 px-2'>
                                Custom Input
                                <div className='ml-2'><input readOnly={true} type='checkbox' onClick={() => setIsChecked(!isChecked)} checked={isChecked} className='h-[100%] cursor-pointer' /></div>
                            </div>
                        </div>
                        <div className='flex'>
                            {/* Compile  */}
                            <div onClick={!submitting ? handleCompile : () => { }} className={`${compiling ? 'bg-[#3c4245] cursor-not-allowed' : ''} ${submitting ? 'cursor-not-allowed' : ''} text-white bg-[#1AA2D9] rounded-md h-7 px-2 mr-2 cursor-pointer`}>
                                <p>Compile</p>
                            </div>
                            {/* Submit  */}
                            <div onClick={!compiling ? handleSubmit : () => { }} className={`${submitting ? 'bg-[#3c4245] cursor-not-allowed' : ''} ${compiling ? 'cursor-not-allowed' : ''} text-white bg-[#1AA2D9] rounded-md h-7 px-2 mr-2 cursor-pointer`}>
                                <p>Submit</p>
                            </div>
                        </div>
                    </div>

                    <OutputWindow outputDetails={compileResponse} output={output ? output : ''} consoleOption={consoleOption} consoleActivate={consoleActivate}
                        className={` ${consoleActivate ? 'h-[85%]' : 'h-[75%]'}`} />

                    <textarea type='text' onChange={inputChange}
                        className={`${consoleOption === 'Console' ? 'hidden' : 'block'} ${consoleActivate ? 'h-[85%]' : 'h-[70%]'} w-2/3 max-h-[70%] bg-[#0E141A] text-white`} />

                </div>
            </div>
        </div>
    )
}

export default Main