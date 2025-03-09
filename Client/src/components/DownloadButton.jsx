import React from 'react'
import { downloadCanvasToImage } from '../config/helpers'
import CustomButton from './CustomButton'

const DownloadButton = () => {
  return (
    <div className="download-container glassmorphism p-4">
      <CustomButton
        type="filled"
        title="Download Shirt"
        handleClick={downloadCanvasToImage}
        customStyles="w-full px-4 py-3 font-bold text-sm"
      />
    </div>
  )
}

export default DownloadButton