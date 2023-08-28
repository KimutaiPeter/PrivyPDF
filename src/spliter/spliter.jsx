import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

function Spliter() {
  const [Files, setFiles] = useState([])
  const [Splits, setSplits] = useState([])
  const [split_start, setSplit_start] = useState(0)
  const [split_end, setSplit_end] = useState(0)




  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = async e => {
    var file = e.target.files[0];
    console.log(file)
    // Create a blob that we can use as an src for our audio element
    var urlObj = URL.createObjectURL(file);
    var existingBytes = await fetch(urlObj).then((res) => res.arrayBuffer());
    var pdf = await PDFDocument.load(existingBytes)
    setSplit_start(1)
    setSplit_end(pdf.getPageCount())
    setFiles([{ name: file['name'], page_count: pdf.getPageCount(), bytes: existingBytes }])
    console.log(Files)
  }


  async function check_relevant_properties() {
    for (var pdf_file of Files) {
      var pdf = await PDFDocument.load(pdf_file['bytes'])
      console.log(pdf.getPageCount())
    }
  }



  function delete_document(index) {
    setSplits([...Splits.slice(0, index), ...Splits.slice(index + 1)])
  }


  function add_range() {
    if (Number(split_start) <= Number(split_end)) {
      setSplits([...Splits, { 'start': split_start, 'end': split_end }])
      setSplit_start(split_end)
      setSplit_end(Files[0]['page_count'])
    } else {
      alert('Error, inappropriate Range')
    }
  }


  async function split_all_ranges() {
    if (Splits.length > 0) {
      var pdf = await PDFDocument.load(Files[0]['bytes'])

      for (Range of Splits) {
        const doc = await PDFDocument.create();
        var page_indices = new Array(Range['end'] - Range['start'] + 1).fill(undefined).map((_, i) => Number(i) + (Number(Range['start']) - 1))
        var contentPages = await doc.copyPages(pdf, page_indices)
        for (var page of contentPages) {
          doc.addPage(page)
        }
        const pdfBytes = await doc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'From page ' + String(Range['start']) + ' to ' + String(Range['end']) + '.pdf';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      alert('Please add a range')
    }
  }

  return (
    <>
      <div>
        <button onClick={(e) => { input.click() }} >Choose a pdf file</button>
      </div>
      <div>
        {(() => {
          if (Splits.length > 0) {
            return (
              <div>
                <ul>
                  {
                    Splits.map((split, key) => {
                      return (<li key={key}>From page {split['start']} to {split['end']}  <img style={{width:'12px'}} onClick={(e)=>{ delete_document(key) }} src="/close.png" alt="" /> </li>)
                    })
                  }
                </ul>
              </div>
            )
          }
        })()}
        </div>

        <div>
        {(() => {
          if (Files.length > 0) {
            return (
              <div className="options">
                <label htmlFor="">Start:</label><input onChange={(e) => { setSplit_start(e.target.value) }} type="number" value={split_start} />
                <label htmlFor="">End:</label><input type="number" value={split_end} onChange={(e) => { setSplit_end(e.target.value); console.log('change') }} />
                <button onClick={e => { add_range() }} >Add Range</button>
              </div>
            )
          }
        })()}
        </div>

        <div>
        {(() => {
          if (Files.length > 0) {
            return (
              <div>
                <button onClick={(e) => { split_all_ranges() }}>Split all</button>
              </div>
            )
          }
        })()}
      </div>
      
    </>
  )
}

export default Spliter
