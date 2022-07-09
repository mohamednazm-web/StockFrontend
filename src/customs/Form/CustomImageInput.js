import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { CustomInput } from 'reactstrap'
const defaultImage = require('@src/assets/images/default.png').default

const CustomImageInput = ({ Accept = "image/*", setFile, src, onClear = () => { }, height = "150px" }) => {
  const [srcImage, setSrcImage] = useState(defaultImage)
  const ref = useRef()
  const handleFileChange = ({ target: { files } }) => {
    setFile(files[0])
    const reader = new FileReader()
    reader.onloadend = function () {
      setSrcImage(reader.result)
    }
    reader.readAsDataURL(files[0]);
  }
  const clearImage = () => {
    setSrcImage(defaultImage)
    ref.current.value = null
    setFile(null)
    onClear()
  }
  useEffect(() => {
    if (src !== null || (src && (src[src.length - 1] !== "=" || !src.includes("undefind"))))
      setSrcImage(src)
    else setSrcImage(defaultImage)
  }, [src])
  return (
    <div className='position-relative'>
      <DeleteIcon onClick={() => clearImage()}>X</DeleteIcon>
      <label htmlFor="image-input">
        <img src={srcImage ?? defaultImage} width="100%" height={height} />
      </label>
      <CustomInput innerRef={ref} type="file" id='image-input' accept={Accept} onChange={handleFileChange} />
    </div>
  )
}
const DeleteIcon = styled.a`
    position: absolute;
    top: 3%;
    right: 5%;
    background: #283046;
    padding: .1rem .5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0rem;
    user-select:none;
`
export default CustomImageInput
