
const DEFAULT_LINKEDIN = "https://www.linkedin.com/";
const DEFAULT_INSTAGRAM = "https://www.instagram.com/";
const PHOTO_FILES = import.meta.glob("../assets/team/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const slugOf = (name = "") =>
  name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const drivePhoto = (id) => `https://drive.google.com/thumbnail?id=${id}&sz=w800`;

const photoOf = (slug) => {
  const key = Object.keys(PHOTO_FILES).find(
    (path) => path.split("/").pop().replace(/\.[^.]+$/, "").toLowerCase() === slug,
  );
  return key ? PHOTO_FILES[key] : "";
};

const PROFILES = {
  // Heads and coordinators
  ME240003006: {
    phone: "+91-9675109428",
    email: "me240003006@iiti.ac.in",
    instagram: "https://www.instagram.com/anandvivek1223",
    linkedin: "https://www.linkedin.com/in/anandvivek1223",
    drive: "1dyYLBzpVcsUxderZz5yNjQ5p7i1KSv0g",
  },
  MT2502171026: {
    phone: "+91-7447250091",
    email: "mt2502171026@iiti.ac.in",
    instagram: "https://www.instagram.com/vaidehehehe_15",
    linkedin: "https://www.linkedin.com/in/vaidehi-bhosale-a71476264",
    drive: "1x7-qKKVa1u72tbGbJ-cb2FoVNP1jaIV0",
  },
  SSE250021002: {
    phone: "+91-8765539578",
    email: "sse250021002@iiti.ac.in",
    instagram: "https://www.instagram.com/beyiamaan",
    linkedin: "https://www.linkedin.com/in/amaan-ali-63596a374",
    drive: "1fJsGaeHbsFwPpqI2gMb4xIlPfZbEUsTw",
  },
  // Overall coordinators keep the shared ric@iiti.ac.in address as their public email
  MS2504101015: {
    instagram: "https://www.instagram.com/shaikhubaid.__",
    linkedin: "https://www.linkedin.com/in/shaikhubaidahmed",
    drive: "1O1ZZDr50wuPiNutqLDUKvwnrSMRgHWHF",
  },
  CE250004021: {
    instagram: "https://www.instagram.com/mahi.maheshwari_17",
    linkedin: "https://www.linkedin.com/in/mahi-maheshwari-7056273b1",
    drive: "1Vpf-jh2SED0keujxGOxh5DutroAC-bBE",
  },

  // Volunteers
  ME250003035: {
    phone: "+91-9300489582",
    email: "me250003035@iiti.ac.in",
    instagram: "https://www.instagram.com/harshkasera263",
    linkedin: "https://www.linkedin.com/in/harsh-kasera-076774310",
    drive: "1O_pXV2OwNs1lfWJcULyJMvMOaw55WRV1",
  },
  ME250003049: {
    phone: "+91-6392498804",
    email: "me250003049@iiti.ac.in",
    instagram: "https://www.instagram.com/mahisingh_1607",
    linkedin: "https://www.linkedin.com/in/mahi-singh-sengar-b712b4377",
    drive: "1dnZQ5sHeVp4UGexlhiwfLxDwFvPV2xLy",
  },
  ME250003024: {
    phone: "+91-8225808105",
    email: "me250003024@iiti.ac.in",
    linkedin: "https://www.linkedin.com/in/bhoomi-shakya-1b2384376",
    drive: "1G_n5VR-Tb3TIfzhqiZ_SFrk8KGT1xMVN",
  },
  EE260002043: {
    phone: "+91-8332052114",
    email: "ee260002043@iiti.ac.in",
    instagram: "https://www.instagram.com/leenarosinn",
    linkedin: "https://www.linkedin.com/in/leena-rosin-nethala-790766432",
    drive: "1oK9aN1KuIw8Y8w8iB1HJsyDkpRaUxdTj",
  },
  CE260004031: {
    phone: "+91-8619306189",
    email: "ce260004031@iiti.ac.in",
    drive: "1preRFipEK_inyMfcCSRUZFqmlcAWptR1",
  },
  MT2502171014: {
    phone: "+91-8010675648",
    email: "mt2502171014@iiti.ac.in",
    instagram: "https://www.instagram.com/mr_fulgent_1801",
    linkedin: "https://www.linkedin.com/in/namish-patil-6b8032250",
    drive: "13BYQvFT0oopbktRqCoIMotwZ6xNzXhmy",
  },
  MT2502101017: {
    phone: "+91-7000914664",
    email: "mt2502101017@iiti.ac.in",
    instagram: "https://www.instagram.com/kayura_sama",
    linkedin: "https://www.linkedin.com/in/shubhangi-uikey-5651321b3",
    drive: "1olYEHvnNyDhhSooARvK9nzMcZ4WQvcj-",
  },
  SSE260021020: {
    phone: "+91-9462752798",
    email: "sse260021020@iiti.ac.in",
    instagram: "https://www.instagram.com/giyavishal007",
    linkedin: "https://www.linkedin.com/in/virendra-giya-2996b7436",
    drive: "1cisi6deiX7AKqoCTG7ZdatLGyB4uIYfG",
  },
  CE260004001: {
    phone: "+91-8796520444",
    email: "ce260004001@iiti.ac.in",
    instagram: "https://www.instagram.com/aaradhya_2138",
    linkedin: "https://www.linkedin.com/in/aaradhya-bhardwaj-791572417",
    drive: "1-h4Lq9GtSqywV_vhw1vFeF9L-947ZoHz",
  },
  CHE260008007: {
    phone: "+91-9701912624",
    email: "che260008010@iiti.ac.in",
    linkedin: "https://www.linkedin.com/in/anubathula-karthik-0b7318420",
    drive: "1MhFWwF3bf0TM3F4aqsY8HbPJBDwMcVK5",
  },
  EP250051004: {
    phone: "+91-8591729631",
    email: "paar258@gmail.com",
    linkedin: "https://www.linkedin.com/in/arya-patil-6ba229379",
    drive: "1Zj10aPxQzeoM6Y2dSLmCWnCAQNnlPEN8",
  },
  CE250004012: {
    phone: "+91-9203363435",
    email: "ce250004012@iiti.ac.in",
    instagram: "https://www.instagram.com/dishayadav8597",
    linkedin: "https://www.linkedin.com/in/disha-yadav-10420b377",
    drive: "1P0ada7tHgXWa-ME61ZD0_GdQeSDji7Az",
  },
  MTPHD2302105018: {
    phone: "+91-8802883976",
    email: "mtphd2302105018@iiti.ac.in",
    instagram: "https://www.instagram.com/rajput.gaurav269",
    linkedin: "https://www.linkedin.com/in/gaurav-rajput-iiti",
    drive: "1uFImUfVr1EuQY5x8B_mq2CfsLCooh2Zt",
  },
  MSC2603171006: {
    phone: "+91-7986838163",
    email: "msc2603171006@iiti.ac.in",
    instagram: "https://www.instagram.com/ayush2004588",
    drive: "14x5s19VOImx2gdTi9D2xc57Fu8yCePWH",
  },
  MT2502171007: {
    phone: "+91-7776020225",
    email: "mt2502171007@iiti.ac.in",
    instagram: "https://www.instagram.com/_chai_shnavi_",
    linkedin: "https://www.linkedin.com/in/vaishnavi-chinde-291889228",
    drive: "1iKC9jQzKqirJACBc5TpAisZ8FGJSX3p3",
  },
  MT2502171025: {
    phone: "+91-9334862370",
    email: "mt2502171025@iiti.ac.in",
    instagram: "https://www.instagram.com/rajuddeseyaruddeseyaraj",
    linkedin: "https://www.linkedin.com/in/uddeseya-raj-634a1b21a",
    drive: "1sTlrLwUasqo09xJ65_l0J1dIKiO04Nfz",
  },
  CHE250008011: {
    phone: "+91-9885722717",
    email: "che250008011@iiti.ac.in",
    instagram: "https://www.instagram.com/swathi_0913",
    linkedin: "https://www.linkedin.com/in/swathi-devanaboina-455621377",
    drive: "1eeSpGq70ik7o_ePYEh11Ked9Dk2UTOgm",
  },
  CE250004050: {
    phone: "+91-8090024989",
    email: "ce250004050@iiti.ac.in",
    instagram: "https://www.instagram.com/vedi22vish",
    linkedin: "https://www.linkedin.com/in/vedika-vishwakarma-b0b35a393",
    drive: "1BND8U3WZTA_EYKIThxJYZ2IInOLuPw9k",
  },
  MEMS260005004: {
    phone: "+91-9109924635",
    email: "mems260005004@iiti.ac.in",
    instagram: "https://www.instagram.com/666aytida",
    linkedin: "https://www.linkedin.com/in/aditya-singh-55a1712aa",
    drive: "1YeR22ZQik94x8LSfq56PiHq5C9Jva19o",
  },
};

/* Form details for one person: the photo is a local file if there is one,
   else the Drive photo, else "" (initials). */
const profileOf = (key, name) => {
  const { drive, ...details } = PROFILES[key] ?? {};
  return { ...details, photo: photoOf(slugOf(name)) || (drive ? drivePhoto(drive) : "") };
};

// member factory (people under a head)
const member = (name, roll, domains = []) => ({
  name,
  roll,
  domains,
  photo: "",
  email: "",
  phone: "",
  linkedin: DEFAULT_LINKEDIN,
  instagram: DEFAULT_INSTAGRAM,
  ...profileOf(roll, name),
});

export const OVERALL_COORDINATORS = [
  {
    id: "oc-pg",
    name: "Shaikh Ubaid Ahmed",
    title: "Overall Coordinator — PG",
    roll: "",
    email: "ric@iiti.ac.in",
    phone: "+91-7417201863",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
    ...profileOf("MS2504101015", "Shaikh Ubaid Ahmed"),
  },
  {
    id: "oc-ug",
    name: "Mahi Maheshwari",
    title: "Overall Coordinator — UG",
    roll: "",
    email: "ric@iiti.ac.in",
    phone: "+91-9340676118",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
    ...profileOf("CE250004021", "Mahi Maheshwari"),
  },
];
export const HEADS = [
  {
    id: "web-dev",
    role: "Web Development Head",
    domain: "Web Development",
    name: "Anand Vivek",
    roll: "240003006",
    email: "",
    phone: "",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
    ...profileOf("ME240003006", "Anand Vivek"),
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
    photo: photoOf("fiya"),
    email: "",
    phone: "",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
    team: [
      member("Bhoomi Shakya", "ME250003024", ["Outreach"]),
      member("Leena Rosin Nethala", "EE260002043", ["Outreach"]),
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
    photo: photoOf("adityamoni"),
    email: "",
    phone: "",
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
    email: "",
    phone: "",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
    ...profileOf("MT2502171026", "Vaidehi NitinKumar Bhosale"),
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
    email: "",
    phone: "",
    linkedin: DEFAULT_LINKEDIN,
    instagram: DEFAULT_INSTAGRAM,
    ...profileOf("SSE250021002", "Amaan Ali"),
    team: [
      member("Swathi Devanaboina", "CHE250008011", ["Creatives"]),
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
    photo: photoOf("suyash"),
    email: "",
    phone: "",
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