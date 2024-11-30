import { useState } from 'react'
import './App.css'
import InputValue from './components/input-value/input-value'
import Title from './components/title/title'
import Button from './components/button/button'
import QrCode from './components/qr-code/qr-code'

const title = "QR code generation"
const textBtn = "Click"

function App() {

  const [qrText, setQrText] = useState('');// состояние для значения инпута
  const [isVisibleQr, setIsVisibleQr] = useState(false); // состояние для видимости Qr кода
 

// получаю значение с инпута и присваию его qrText
  const handleChange = (event) => {
    setQrText(event.target.value);
   
  }

  const showQrCode = () => {
    setIsVisibleQr(true);
    //setQrText("")
  }






  return (
    <>
      <Title title={title} />
      <div className='block-inp'>
        <InputValue handleChange={handleChange} />
        <Button textBtn={textBtn } showQrCode={showQrCode}  />
      </div>
      {isVisibleQr ? <QrCode qrText={qrText} /> : null}
      

    </>
  )
}

export default App
