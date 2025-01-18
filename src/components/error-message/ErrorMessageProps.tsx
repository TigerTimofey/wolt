import React from "react";
import "./ErrorMessage.css";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  const [isClosing, setIsClosing] = React.useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  React.useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setIsClosing(true);
        setTimeout(() => onClose(), 500);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  React.useEffect(() => {
    setIsClosing(false);
  }, [message]);

  if (!message) return null;

  return (
    <div className={`error-message ${isClosing ? "closing" : ""}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export default ErrorMessage;
