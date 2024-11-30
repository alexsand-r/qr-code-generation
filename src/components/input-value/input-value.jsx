import './input-value.css'



function InputValue({ handleChange}) {
    return (
        <>
            <input className='input' type="text" placeholder='Add text ...' onChange={handleChange}  />
        </>
    )
}

export default InputValue;