// RIC 2027 team data — hierarchical.
// Each person has: name, photo, email, instagram, linkedin (+ extras).
// photo: "" falls back to initials. linkedin/instagram default to the
// platform homepages for now — replace per person when links are available.

const DEFAULT_LINKEDIN = "https://www.linkedin.com/";
const DEFAULT_INSTAGRAM = "https://www.instagram.com/";

// member factory (people under a head)
const member = (name, roll, domains = []) => ({
  name,
  roll,
  domains,
  photo: "",
  email: "",
  linkedin: DEFAULT_LINKEDIN,
  instagram: DEFAULT_INSTAGRAM,
});

export const OVERALL_COORDINATORS = [
  {
    id: "oc-pg",
    name: "Shaikh Ubaid Ahmed",
    title: "Overall Coordinator — PG",
    roll: "",
    email: "ric@iiti.ac.in",
    phone: "+91-7417201863",
    photo: "",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
  },
  {
    id: "oc-ug",
    name: "Mahi Maheshwari",
    title: "Overall Coordinator — UG",
    roll: "",
    email: "ric@iiti.ac.in",
    phone: "+91-9340676118",
    photo: "",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
  },
];

export const HEADS = [
  {
    id: "web-dev",
    role: "Web Development Head",
    domain: "Web Development",
    name: "Anand Vivek",
    roll: "240003006",
    photo: "/public/main.jpg",
    email: "me240003006@iiti.ac.in",
    linkedin: "https://www.linkedin.com/in/anandvivek1223",
    instagram: "https://www.instagram.com/anandvivek1223",
    team: [
      member("Harsh Kasera", "ME250003035", ["Web Development"]),
      member("Mahi Singh Sengar", "ME250003049", ["Web Development"]),
    ],
  },
  {
    id: "outreach",
    role: "Outreach Head",
    domain: "Outreach",
    name: "Fiya",
    roll: "250021005",
    photo: "",
    email: "",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
    team: [
      member("Bhoomi Shakya", "ME250003024", ["Outreach"]),
      member("Leena Rosin", "EE260002043", ["Outreach"]),
      member("Nainika Baheti", "CE260004031", ["Outreach"]),
      member("Namish Patil", "MT2502171014", ["Outreach"]),
      member("Niharika Shashidhar Pillai", "MT2502106008", ["Outreach"]),
      member("Shubhangi Uikey", "MT2502101017", ["Outreach"]),
      member("Virendra Kumar giya", "SSE260021020", ["Outreach"]),
    ],
  },
  {
    id: "events-ug",
    role: "Events Head — UG",
    domain: "Events (UG)",
    name: "Adityamoni",
    roll: "250003008",
    photo: "",
    email: "",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
    team: [
      member("Aaradhya Bhardwaj", "CE260004001", ["Events", "Creatives"]),
      member("Anubathula karthik", "CHE260008007", ["Events", "Creatives"]),
      member("Anushka Pawar", "EESE260011006", ["Events"]),
      member("Arya Patil", "EP250051004", ["Events"]),
      member("Disha Yadav", "CE250004012", ["Events"]),
    ],
  },
  {
    id: "events-pg",
    role: "Events Head — PG",
    domain: "Events (PG)",
    name: "Vaidehi NitinKumar Bhosale",
    roll: "2502171026",
    photo: "",
    email: "",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
    team: [
      member("Gaurav Rajput", "MTPHD2302105018", ["Events", "Creatives"]),
      member("Ayush Aggarwal", "MSC2603171006", ["Events"]),
      member("Chinde Vaishnavi Ramesh", "MT2502171007", ["Events"]),
      member("Uddeseya Raj", "MT2502171025", ["Events"]),
    ],
  },
  {
    id: "logistics",
    role: "Logistics Head",
    domain: "Logistics",
    name: "Madhur Mohan Mittal",
    roll: "250002036",
    photo: "",
    email: "",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
    team: [],
  },
  {
    id: "creatives",
    role: "Creatives & Social Media Head",
    domain: "Creatives",
    name: "Amaan Ali",
    roll: "250021002",
    photo: "",
    email: "",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
    team: [
      member("Devanaboina Swathi", "CHE250008011", ["Creatives"]),
      member("Vedika Vishwakarma", "CE250004050", ["Creatives"]),
      member("Aaradhya Bhardwaj", "CE260004001", ["Creatives", "Events"]),
      member("Anubathula karthik", "CHE260008007", ["Creatives", "Events"]),
      member("Gaurav Rajput", "MTPHD2302105018", ["Creatives", "Events"]),
    ],
  },
  {
    id: "marketing",
    role: "Marketing Head",
    domain: "Marketing",
    name: "Suyash",
    roll: "250004018",
    photo: "",
    email: "",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
    team: [member("Aditya Singh", "MEMS260005004", ["Marketing"])],
  },
];
