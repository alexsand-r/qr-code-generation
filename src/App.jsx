import { useState } from 'react'
import { QRCodeCanvas } from "qrcode.react"; // Импорт компонента для генерации QR-кода
import { useRef } from "react";
import './App.css'
import InputValue from './components/input-value/input-value'
import Title from './components/title/title'
import Button from './components/button/button'
import QrCode from './components/qr-code/qr-code'
import Warn from './components/warn/warn'
import DeleteBtn from './components/delete-btn/delete-btn'
import DownloadBtn from './components/download-btn/download-btn'

const title = "QR-code generation"
const textBtn = "Click"
const textDel = "Delete"
const textDown = "Download"

function App() {
 
  const [qrText, setQrText] = useState('');// состояние для значения инпута
  const [isVisibleQr, setIsVisibleQr] = useState(false); // состояние для видимости Qr кода
  const [isWarnVisible, setIsWarnVisible] = useState(false); // состояние для строки ошибки
  const [isDeleteVisible, setIsDeleteVisible] = useState(false) // состояние для кнопки удалить
  const [isDownloadVisible, setIsDownloadVisible] = useState(false) // состояние для кнопки скачать
  
  const qrRef = useRef(null); // Реф для ссылки на QR-код
  

// получаю значение с инпута и присваию его qrText
  const handleChange = (event) => {
    setIsWarnVisible(false);
    const inputValue = event.target.value;
    if (inputValue === "") {
   
      console.log("null");
      
      return
    } else {
      setQrText(inputValue);
    }
  }

  const showQrCode = () => {
    if (qrText === "") {
      setIsVisibleQr(false);
      showWarn();
      console.log("qr-code скрыт");
      
    } else {
      setIsVisibleQr(true);
      showDeleteAndDownload();
    }
  
  }
  // показываю тект Warn
  const showWarn = () => {
    setIsWarnVisible(true);
  }

  // показываю кнопки удалить и скачать
  const showDeleteAndDownload = () => {
    setIsDeleteVisible(true);
    setIsDownloadVisible(true);
  }

  //скрываю Qr код и кнопки удалить и скачать - при клике на delete
  const deleteBlock = () => {
    setIsDeleteVisible(false);
    setIsDownloadVisible(false);
    setIsVisibleQr(false);
    setQrText("");
  }

  // Скачивание QR-кода
  const downloadQrCode = () => {
    const canvas = qrRef.current.querySelector("canvas"); // Берём canvas элемент
    const pngUrl = canvas.toDataURL("image/png"); // Преобразуем его в формат PNG
    const downloadLink = document.createElement("a"); // Создаём ссылку
    downloadLink.href = pngUrl; // Указываем ссылку на изображение
    downloadLink.download = "qr-code.png"; // Имя файла для скачивания
    document.body.appendChild(downloadLink); // Добавляем ссылку на страницу
    downloadLink.click(); // Симулируем клик по ссылке
    document.body.removeChild(downloadLink); // Удаляем ссылку после скачивания
  };


  return (
    <>
      <Title title={title} />
      {isWarnVisible ? <Warn /> : null}
      <div className='block-inp'>
        {/* Передаём value={qrText} */}
        <InputValue handleChange={handleChange} value={qrText} />
        <Button textBtn={textBtn } showQrCode={showQrCode}  />
      </div>
        {isVisibleQr && (
        <div className='qr-code' ref={qrRef}>
          <QRCodeCanvas bgColor="#ffffff"  value={qrText} size={150}  />
        </div>
      )}
     
      <div className='btn-row'>
        {isDeleteVisible ? <DeleteBtn textDel={textDel} deleteBlock={deleteBlock} /> : null}
        {isDownloadVisible ? <DownloadBtn textDown={textDown} downloadQrCode={downloadQrCode} /> : null }
      </div>
    </>
  )
}

export default App
