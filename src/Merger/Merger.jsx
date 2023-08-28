import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import fs from 'fs'

function Merger() {
  const [count, setCount] = useState(0)
  const [Files, setFiles] = useState([])

  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = async e => {
    var file = e.target.files[0];
    console.log(file)
    // Create a blob that we can use as an src for our audio element
    var urlObj = URL.createObjectURL(file);
    var existingBytes = await fetch(urlObj).then((res) => res.arrayBuffer());
    setFiles([...Files, { name: file['name'], bytes: existingBytes }])
    console.log(Files)
  }


  function delete_document(index) {
    setFiles([...Files.slice(0, index), ...Files.slice(index + 1)])
  }




  async function convert() {
    if (Files.length >= 2) {

      console.log('loaded')
      //Create a new document
      const doc = await PDFDocument.create();
      for (var pdf_file of Files) {
        var pdf = await PDFDocument.load(pdf_file['bytes'])
        console.log(pdf.getPageIndices())
        var contentPages = await doc.copyPages(pdf, pdf.getPageIndices())
        for (var page of contentPages) {
          doc.addPage(page)
        }
      }

      const pdfBytes = await doc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'combined.pdf';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } else {
      alert("Please select atleast 2 files")
    }
  }




  return (
    <>
      <button onClick={(e) => { input.click() }} >Choose Files</button>
      <div>
        <ul>
          {
            Files.map((File, key) => {
              return (<li key={key}>
                <span>{File['name']}</span>
                <img style={{width:'12px', 'margin-left':'4px'}} onClick={(e)=>{ delete_document(key) }} src="/close.png" alt="" />
              </li>
              )

            })
          }
        </ul>
      </div>

      {(() => {
        if (Files.length >= Number(2)) {
          return (
            <div>
              <button onClick={e => { convert() }}>Merge and Download</button>
            </div>
          )
        }
      })()}
    </>
  )
}

export default Merger
