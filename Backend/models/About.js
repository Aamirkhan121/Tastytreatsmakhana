import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  heading: String,
  description: String,
  mission: String,
  image: String,
});

const About = mongoose.model('About', aboutSchema);
export default About;
