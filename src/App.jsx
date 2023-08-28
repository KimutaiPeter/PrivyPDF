import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src='/profile.png' className="logo" alt="Vite logo" />
        </a>
      </div>

      <div>
        <a href="/merge">
          <button style={{ width: '200px', margin: '10px' }} >Merge 2 or more pdfs</button>
        </a>
      </div>

      <div>
        <a href="/spliter">
          <button style={{ width: '200px', margin: '10px' }} >Split a pdf file</button>
        </a>
      </div>

      <div>
        <a href="/image_to_pdf">
          <button style={{ width: '200px', margin: '10px' }} >Convert image to pdf</button>
        </a>
      </div>


      <hr />
      <h2>About this app</h2>
      <div>
        <p>Hi,Peter here,I developed and maintain this app</p>
        <p style={{ width: '500px' }} >I enjoy how similar apps like <a href='https://tinywow.com/tools/pdf' >Tinywow</a> and <a href="https://www.ilovepdf.com/">I love PDFs</a> offer a simple, free, quick and convinient way to merge or split files and more, I also love how I dont have to install any application in my machine, but then sometimes I need to do such functions on very sensitive documents and I am abit speculative about someone keeping them sensitive documents, So I developed this app, what is important is that It doesnt keep files, more so, the file never leaves your machine, or go through the network, hopefully no one injects extra malicious code. </p>

      </div>

      <div>
        <a href="https://github.com/KimutaiPeter/PrivyPDF.git" target='_blank'>
          <img src="/github.svg" alt="" />
          <span style={{ display: 'block' }}>Check out the code or contribute on github?</span>
        </a>
      </div>

      <div>

        <p>Say <a href="https://www.instagram.com/peter__kimutai/">Hi</a> sometime, I love making new friends.</p>
      </div>
    </>
  )
}

export default App
