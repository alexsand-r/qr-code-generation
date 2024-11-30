import './input-value.css'



function InputValue({ handleChange, value}) {
    return (
        <>
            <input className='input' type="text" placeholder='Add text ...' onChange={handleChange} value={value}/>
            
        </>
    )
}

export default InputValue;