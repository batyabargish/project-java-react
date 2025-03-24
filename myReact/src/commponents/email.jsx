


import emailjs from "emailjs-com";

const EmailSender = ({ formData }) => {
  const sendEmail = (formData) => {
    const templateParams = {
      to_name: "Batya Bargish",
      from_name: formData.name,  
      message: formData.message, 
      reply_to: formData.reply_to, 
      to_email: "batyabar12@gmail.com", 
    };

    emailjs
      .send(
        "myEmail", 
        "template_igwcb7a", 
        templateParams,
        "AU7B4__SxabyzEmEC" 
      )
      .then(
        (result) => {
          alert("המייל נשלח בהצלחה!");
        },
        (error) => {
          alert("שגיאה בשליחת המייל. נסי שוב.");
        }
      );
  
  };

  return (
    <button
      type="button"
      onClick={() => sendEmail(formData)}
      style={{
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px",
        border: "none",
        cursor: "pointer",
      }}
    >
      שלח
    </button>
  );
};


  

export default EmailSender;
