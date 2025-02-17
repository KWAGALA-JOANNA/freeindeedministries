//programs
import axios from "axios";

const apiPrograms = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1/program", 
});

export const fetchPrograms = () => apiPrograms.get("/programs");

//Events 
const apiEvents = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1/event", 
});

export const fetchEvents = () => apiEvents.get("/events");

//Gallery

const apiGallery = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1/gallery",
});

export const fetchGalleryItems = () => apiGallery.get("/images");


//User registration
const UserForm  = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1/user",
});

export const fetchUserForm  = () => UserForm.post("/register");

//LoginForm 
const LoginForm  = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1/user",
});

export const fetchLoginForm  = () => LoginForm.post("/login");

//donations
const DonationList  = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1/donation",
});

export const fetchDonationList = () => DonationList.post("/create");
 

//ContactInquiryList
const ContactInquiryList = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1/contact-inquiry",
});

export const fetchContactInquiryList = () => ContactInquiryList.post("/create");

export { apiPrograms, apiEvents,apiGallery ,UserForm,LoginForm,DonationList,ContactInquiryList }; 





