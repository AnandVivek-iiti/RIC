// RIC 2027 team data — hierarchical.
// Each person has: name, photo, email, instagram, linkedin (+ extras).
// photo: "" falls back to initials. linkedin/instagram default to the
// platform homepages for now — replace per person when links are available.

const DEFAULT_LINKEDIN = "https://www.linkedin.com/";
const DEFAULT_INSTAGRAM = "https://www.instagram.com/";

/* Photos: drop an image named after the person's slug (e.g. amaan-ali.jpg) into
   src/assets/team/ — any of jpg/jpeg/png/webp. No file means the initials fallback. */
const PHOTO_FILES = import.meta.glob("../assets/team/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const photoOf = (slug) => {
  const key = Object.keys(PHOTO_FILES).find(
    (path) => path.split("/").pop().replace(/\.[^.]+$/, "").toLowerCase() === slug,
  );
  return key ? PHOTO_FILES[key] : "";
};

/* Contact details people submitted through the team form, keyed by roll number.
   Only email and public profile links are kept here. */
const PROFILES = {
  CHE250008011: {
    email: "che250008011@iiti.ac.in",
    instagram: "https://www.instagram.com/swathi_0913",
    linkedin: "https://www.linkedin.com/in/swathi-devanaboina-455621377",
    photo: photoOf("swathi-devanaboina"),
  },
  CHE260008007: {
    email: "che260008010@iiti.ac.in",
    linkedin: "https://www.linkedin.com/in/anubathula-karthik-0b7318420",
    photo: photoOf("anubathula-karthik"),
  },
  MSC2603171006: {
    email: "msc2603171006@iiti.ac.in",
    instagram: "https://www.instagram.com/ayush2004588",
    photo: photoOf("ayush-aggarwal"),
  },
  ME250003049: {
    email: "me250003049@iiti.ac.in",
    instagram: "https://www.instagram.com/mahisingh_1607",
    linkedin: "https://www.linkedin.com/in/mahi-singh-sengar-b712b4377",
    photo: photoOf("mahi-singh-sengar"),
  },
  CE250004012: {
    email: "ce250004012@iiti.ac.in",
    instagram: "https://www.instagram.com/dishayadav8597",
    linkedin: "https://www.linkedin.com/in/disha-yadav-10420b377",
    photo: photoOf("disha-yadav"),
  },
  CE260004001: {
    email: "ce260004001@iiti.ac.in",
    instagram: "https://www.instagram.com/aaradhya_2138",
    linkedin: "https://www.linkedin.com/in/aaradhya-bhardwaj-791572417",
    photo: photoOf("aaradhya-bhardwaj"),
  },
};

// member factory (people under a head)
const member = (name, roll, domains = []) => ({
  name,
  roll,
  domains,
  photo: "",
  email: "",
  linkedin: DEFAULT_LINKEDIN,
  instagram: DEFAULT_INSTAGRAM,
  ...PROFILES[roll],
});

export const OVERALL_COORDINATORS = [
  {
    id: "oc-pg",
    name: "Shaikh Ubaid Ahmed",
    title: "Overall Coordinator — PG",
    roll: "",
    email: "ric@iiti.ac.in",
    phone: "+91-7417201863",
    photo: photoOf("shaikh-ubaid-ahmed"),
    linkedin: "https://www.linkedin.com/in/shaikhubaidahmed",
    instagram: "https://www.instagram.com/shaikhubaid.__",
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
    photo: "/main.jpg",
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
    id: "creatives",
    role: "Creatives & Social Media Head",
    domain: "Creatives",
    name: "Amaan Ali",
    roll: "250021002",
    photo: photoOf("amaan-ali"),
    email: "sse250021002@iiti.ac.in",
    linkedin: "https://www.linkedin.com/in/amaan-ali-63596a374",
    instagram: "https://www.instagram.com/beyiamaan",
    team: [
      member("Devanaboina Swathi", "CHE250008011", ["Creatives"],"https://www.linkedin.com"),
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

/* Counts derived from the data above, so they follow any change to it */
const rollOf = (person) => person.roll || person.name;

export const TEAM_COUNTS = (() => {
  const members = new Set();
  HEADS.forEach((head) => head.team.forEach((person) => members.add(rollOf(person))));
  return {
    coordinators: OVERALL_COORDINATORS.length,
    heads: HEADS.length,
    members: members.size,
  };
})();
