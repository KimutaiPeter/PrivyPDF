import { useState } from 'react'
import {jsPDF} from 'jspdf' 

function Image_to_pdf() {
  const preview = document.getElementById('preview')
  const input = document.createElement('input')
  input.type = 'file';


  input.onchange = e => {
    var file = e.target.files[0];
    console.log(file)
    const urlObj = URL.createObjectURL(file);
    const preview = document.getElementById('preview')
    preview.src = urlObj
  }



  function convert() {
    const pdf = new jsPDF();
    // Convert the image to data URL
    var preview = document.getElementById('preview')
    const imgData = preview.src;
    // Add the image to the PDF
    pdf.addImage(imgData, "JPEG", 10, 10, 190, 150); // Adjust coordinates and dimensions as needed
    //pdf.addImage(imgData, "JPEG");
    // Save the PDF
    pdf.save("converted-image.pdf");
  }

  

  return (
    <>
      <button style={{ margin: '10px' }} onClick={(e) => { input.click() }}>Upload</button>
      <div>
        <img id='preview' src='vite.svg'></img>
      </div>
      <button onClick={(e)=>{ convert() }}>Convert and Download</button>
    </>
  )
}

export default Image_to_pdf
