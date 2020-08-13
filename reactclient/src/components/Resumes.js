import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, shallowEqual } from 'react-redux';
import { Document, Page, pdfjs } from 'react-pdf';
import Grid from '@material-ui/core/Grid';
import './styles/Resumes.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
console.log(pdfjs)

const Resumes = (props) => {
    const [numPages, setNumPages] = useState(null);
    const [shit, setShit] = useState()
    const resumes = useSelector(state => state.ResumeReducer.resumes, shallowEqual)
    
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    useEffect(()=>{
        // console.log(resumes[0])
        // setShit(fn(resumes[0].path))
        fn(resumes[0])
    },[])

    function makeThumb(page) {
        var vp = page.getViewport({ scale: 1, rotate: 0 });
        var canvas = document.createElement("canvas");
        canvas.width = canvas.height = 96;
        var scale = Math.min(canvas.width / vp.width, canvas.height / vp.height)
        // let y = null
        return page.render({canvasContext: canvas.getContext("2d"), viewport: page.getViewport({scale,rotate:0})}).promise.then(() => {
            console.log(canvas)
            return canvas
        })
        // return y
        // canvas.width = canvas.height = 96;
        // var scale = Math.min(canvas.width / vp.width, canvas.height / vp.height);
        // return page.render({canvasContext: canvas.getContext("2d"), viewport: page.getViewport(scale)}).promise.then(function () {
        //   return canvas;
        // });
      }

    const fn = async() => {
        const doc = await pdfjs.getDocument("uploads/100041255185678789124/1597332350355My Resume.pdf").promise
        console.log(doc)
        const page = await doc.getPage(1)
        console.log(page)
        const x = await makeThumb(page)
        setShit(x)
        // const element = document.createElement('div');
        // const iframe = document.createElement('iframe');

        // iframe.src = src; //`/pdfjs-1.9.426-dist/web/viewer.html?file=${source}`;
        // iframe.width = '100%';
        // iframe.height = '100%';

        // element.appendChild(iframe);
//         const pdfBuffer = fs.readFileSync('/some/path/example.pdf');
 
// pdf(
//   pdfBuffer, /*Buffer or stream of the pdf*/
// //   options
// )
//   .then(data /*Stream of the image*/ => {
//     console.log(data)
//   })
//   .catch(err => console.log(err))
//         console.log(src)
//         pdf(fs.readFileSync("http://localhost:3001/uploads/100041255185678789124/1596919621314My Resume.pdf"))
//   .then(data /*is a stream*/ => {
//       console.log(data)
//     //   data.pipe(fs.createWriteStream("./previewBuffer.jpg"))
//     })
//   .catch(err => console.error(err))

        // return (
        //     <div>
        //         <iframe src="http://localhost:3001/uploads/100041255185678789124/1596919621314My Resume.pdf" width="300" height="300"></iframe>
        //     </div>
        // )
    }

    return (
        <div className="resumes-container">
            <p id="resumes-title">Resumes</p>
            <Grid container>
                {/* {resumes.length===0 ? <p>Loading Resumes...</p> : resumes.map((resume) => (
                    <div style={{height: 300, width: 300}}>
                        <Grid item md={4} sm={6} xs={12}>
                            <Document 
                                file={resume.blob} 
                            >
                                <Page pageNumber={1} />
                            </Document>
                        </Grid>
                    </div>
                ))} */}
            </Grid>
            {/* {shit} */}
        </div>
    )
}

export default Resumes