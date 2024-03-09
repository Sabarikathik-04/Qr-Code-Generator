import { useState } from "react"

const Qrcode = () => {
    const [img,setImg] = useState("")
    const [loading,setLoading] = useState(false)
    const [qrdata,setQrdata] = useState("")
    const [qrsize,setQrsize] = useState("")


    async function generateQR(size,data){
        setLoading(true);
        try {
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}x${qrsize}&data=${qrdata}`;
            setImg(url);
        } catch (error) {
            console.error("Error Generating QR Code",error);
        } finally {
            setLoading(false);
        }
    }
    function downloadQr(){
        fetch(img).then((response)=>response.blob()).then((blob)=>{
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${qrdata}`
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error)=>{
            console.error("Error Downloading QR Code",error);
        })
    }
  return (
    <div className="Container">
        <h1>QR CODE GENARATOR</h1>
        {loading && <p>Please Wait...</p>}
        {img && <img src={img} alt="qr" className="qr-code-img" />}
        <div>
        <label htmlFor="Datainput" className="input-label">
            Data For QR:
        </label>
        <input type="text" id="Datainput" value={qrdata} onChange={(e)=>setQrdata(e.target.value)} placeholder="Enter Data Value"/>
        <label htmlFor="Sizeinput" className="input-label">
            Size Of QR (e.g., 150):
        </label>
        <input type="text" id="Sizeinput" value={qrsize} onChange={(e)=>setQrsize(e.target.value)} placeholder="Enter Image Size"/>
        <button className="Generate-btn" disabled={loading} onClick={()=>generateQR(qrsize,qrdata)}>Generate QR</button>
        <button className="Download-btn" onClick={downloadQr}>Download Qr</button>
    </div>
    <p className="Footer">
        Designed By <a href="#">SK</a>
    </p>
    </div>
  )
}

export default Qrcode
