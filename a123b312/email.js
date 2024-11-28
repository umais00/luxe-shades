emailjs.init("rbrk2tzU1EeQTW8Vg");

const sendEmail = () => {
  // Disable the button to prevent further clicks
  const sendButton = document.getElementById("sendButton");
  sendButton.disabled = true;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // Validate fields are not empty
  if (!name || !email || !subject || !message) {
    alert("All fields are required. Please fill out all fields.");
    sendButton.disabled = false; // Re-enable the button if validation fails
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
    sendButton.disabled = false; // Re-enable the button if validation fails
    return;
  }

  // Validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    sendButton.disabled = false; // Re-enable the button if validation fails
    return;
  }

  // Prevent sending more than 2 messages in one session
  let emailCount = parseInt(localStorage.getItem("emailCount")) || 0;
  if (emailCount >= 2) {
    alert("You have reached the maximum of 2 messages per session.");
    sendButton.disabled = false; // Re-enable the button if the limit is reached
    return;
  }

  // Increment the email count and store it in localStorage
  localStorage.setItem("emailCount", emailCount + 1);

  const templateParams = {
    name: name,
    email: email,
    subject: subject,
    message: message,
  };

  // Send the email via EmailJS
  emailjs.send("service_nxsvffh", "template_xz2ck0c", templateParams).then(
    (response) => {
      console.log("Email sent successfully!", response);
      alert("Message sent!");
      sendButton.disabled = false; // Re-enable the button after successful email sending
    },
    (error) => {
      console.error("Failed to send email:", error);
      alert("Failed to send message.");
      sendButton.disabled = false; // Re-enable the button if an error occurs
    }
  );
};

// Listen for the send button click
document.getElementById("sendButton").addEventListener("click", sendEmail);
