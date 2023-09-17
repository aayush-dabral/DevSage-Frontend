import React from 'react'
import Select from 'react-select'
import { languageOptions } from '../utils/languageOptions'

const LanguageDropdown = ({onSelectChange}) => {

    // const onSelectChange = (sl) => {
    //     setLanguage(sl);
    // }

    return (
        <Select 
            placeholder={'Filter By Category'}
            options={languageOptions}
            
            defaultValue={languageOptions[12]}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
            className='height-full'
        />
    )
}

export default LanguageDropdown
