
const ConfirmPage=({referenceId,handleGo})=>{
return (
    <div className="flex flex-col justify-center items-center bg-blue-300 w-[20rem] h-[20rem] p-4 rounded-xl relative">
        <h1 className="font-bold text-xl">Hurray your are now member!</h1>
       <p className="font-bold">Reference Id: {referenceId}</p> 
       <button className="absolute bottom-10 bg-blue-800 w-64 px-8 py-2 rounded-lg text-white" onClick={()=>handleGo()}>Go Back</button>
    </div>
)
}
export default ConfirmPage