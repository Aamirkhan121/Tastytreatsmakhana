import Contact from "../models/Contact.js"

// Controller to save contact form data
 const saveContactForm = async (req, res) => {
  const { name, email, message,phoneNumber } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      phoneNumber,
      message,
    });

    await newContact.save();
    res.status(201).json({ success: true, message: "Contact form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving contact form data." });
  }
};

export default saveContactForm