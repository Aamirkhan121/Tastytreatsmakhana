import About from "../models/About.js";

const getAbout = async (req, res) => {
  try {
    const about = await About.find();
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default getAbout;