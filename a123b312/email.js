emailjs.init("rbrk2tzU1EeQTW8Vg");

const sendEmail = () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validate fields are not empty
  if (!name || !email || !subject || !message) {
    alert("All fields are required. Please fill out all fields.");
    return;
  }

  // Validate against gibberish or code-like inputs (basic detection)
  const gibberishPattern = /[<>\/{};=]/; // Matches common coding characters like <, >, {, }, /, etc.
  if (
    gibberishPattern.test(name) ||
    gibberishPattern.test(subject) ||
    gibberishPattern.test(message)
  ) {
    alert("Please avoid using code-like or invalid characters.");
    return;
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const templateParams = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

  emailjs.send("service_nxsvffh", "template_xz2ck0c", templateParams).then(
    (response) => {
      console.log("Email sent successfully!", response);
      alert("Message sent!");
    },
    (error) => {
      console.error("Failed to send email:", error);
      alert("Failed to send message.");
    }
  );
};

document.getElementById("sendButton").addEventListener("click", sendEmail);
