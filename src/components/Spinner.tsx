import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface SpinnerProps {
  loading: boolean;
  size?: number;
  text?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  loading,
  size = 150,
  text = "Loading...",
}) => {
  if (!loading) return null;

  const override = {
    display: "block",
    margin: "0 auto",
    border: "10px solid #f3f3f3",
    borderTop: "10px solid #4338ca",
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <ClipLoader
        color="#4338ca"
        loading={loading}
        cssOverride={override}
        size={size}
      />
      {text && <p className="mt-4 text-gray-600 font-medium">{text}</p>}
    </div>
  );
};

export default Spinner;
