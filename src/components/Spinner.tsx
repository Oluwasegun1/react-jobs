import ClipLoader  from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "100px auto",
    border: "10px solid #f3f3f3",
    borderTop: "10px solid #3498db",
    width: "100px",
    height: "100px"
}

const Spinner = ({loading}) => {
  return (
    <ClipLoader 
    color = '#4338ca'
    loading = {loading}
    cssOverride = {override}
    size = {150}
    />
  )
}

export default Spinner