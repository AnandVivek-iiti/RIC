/*
 * RIC'27 events — 12 events in 5 categories.
 * Text follows the organisers' draft (file_draft_events.docx) with minor
 * grammar fixes only. `summary` is the one-line version used on cards;
 * `desc` is the full text shown in the event spotlight.
 * Accent colours: white, cyan and amber only; categories of one colour sit next to each other.
 */
export const eventCategories = [
  {
    id: "workshops-talks",
    title: "Workshops & Talks",
    short: "Workshops",
    subtitle: "Skills, guidance and expert conversation",
    icon: "Mic",
    accent: "#ECEAF6",
    events: [
      {
        id: "paper-writing-workshop",
        name: "Paper Writing Workshop",
        tag: "Hands-on workshop",
        icon: "PenLine",
        summary: "A hands-on guide to the fundamentals of academic and research writing.",
        desc: "A comprehensive hands-on guide to introduce students to the fundamentals of academic and research writing, covering structure, literature reviews, methodology, citations and referencing, the process of publishing, and much more.",
      },
      {
        id: "international-opportunities",
        name: "International Opportunities Talk-cum-Workshop",
        tag: "Talk + workshop",
        icon: "Globe",
        summary: "An interactive session on higher education and research opportunities abroad.",
        desc: "An interactive session to guide students interested in pursuing higher education and research opportunities abroad. The workshop will cover various aspects of international education and research opportunities, including university selection, application procedures, scholarship funding, LoRs, and much more.",
      },
      {
        id: "panel-discussion",
        name: "Panel Discussion",
        tag: "Expert panel",
        icon: "Users",
        summary: "Experts across fields share their views on contemporary issues and trends.",
        desc: "An exclusive interactive session bringing together experts across fields to share their insights and perspectives on contemporary issues and trends, and their relevance. The discussion aims to bring in dialogue and an exchange of ideas, to foster awareness and a sense of innovation among participating students.",
      },
    ],
  },
  {
    id: "research-presentations",
    title: "Research Presentations",
    short: "Research",
    subtitle: "Posters and projects from final-year and graduate researchers",
    icon: "Microscope",
    accent: "#36E5E8",
    events: [
      {
        id: "btp-poster-presentation",
        name: "B.T.P. Poster Presentation",
        tag: "Final-year BTPs",
        icon: "GraduationCap",
        summary: "A platform for final-year students to exhibit their BTPs and research work.",
        desc: "An exclusive academic platform designed for the exhibition of final-year students' BTPs and research work. The event enables senior students to present their scholarly contributions, while offering juniors early exposure to the innovations, methodologies and academic breakthroughs achieved.",
      },
      {
        id: "poster-presentation",
        name: "Poster Presentation",
        tag: "Research posters",
        icon: "Presentation",
        summary: "A distilled visual representation of scholarly insight and scientific craftsmanship.",
        desc: "A distilled visual representation of scholarly insight and scientific craftsmanship. The event evaluates the participant's ability to translate complex research into a visually coherent poster that balances scientific rigour, aesthetic clarity and precise communication.",
      },
    ],
  },
  {
    id: "humanities",
    title: "Humanities",
    short: "Humanities",
    subtitle: "Ethics, society and decisions in the real world",
    icon: "Scale",
    accent: "#36E5E8",
    events: [
      {
        id: "case-chronicles-zero-day-debate",
        name: "Case Chronicles & Zero-Day Debate",
        tag: "Humanities-led",
        icon: "Scale",
        summary: "Not just about how, but why: a critical look at real decision-making.",
        desc: "Not just about how, but why. This event encourages students to look at situations through a critical lens and examine, on ethical, social and humanitarian grounds, scenarios that reflect real decision-making in the world.",
      },
    ],
  },
  {
    id: "innovation-tech",
    title: "Innovation & Tech",
    short: "Innovation",
    subtitle: "Build, prototype and present",
    icon: "Lightbulb",
    accent: "#FFC878",
    events: [
      {
        id: "ideaforge",
        name: "IdeaFORGE",
        tag: "About 1 month of prep",
        icon: "Lightbulb",
        summary: "A student innovation challenge built around real problems from industry.",
        desc: "A student innovation challenge to tackle real-life problems sourced from the industry sector. Participating teams are given a preparation period of around one month on problem statements provided by companies, to develop practical solutions. They are then invited to demonstrate their deliverables at IIT Indore before a panel of jurors comprising experts and industry professionals.",
      },
      {
        id: "zero-day-challenge",
        name: "Zero Day Challenge",
        tag: "16 hours",
        icon: "Timer",
        summary: "A sixteen-hour hackathon with a problem statement revealed on the spot.",
        desc: "A sixteen-hour innovation hackathon where participants are presented with a challenging problem statement on the spot. Teams must brainstorm and develop a practical solution, and present it before a panel of jurors.",
      },
      {
        id: "tech-expo",
        name: "Tech-Expo",
        tag: "Open to visitors",
        icon: "Cpu",
        summary: "An exposition of technology where students showcase and visitors explore.",
        desc: "An exposition of technology aimed at giving students a platform to showcase, and visitors a chance to explore, innovative projects, working prototypes or simulations and technical developments across various fields of science and technology. The event aims to inspire students and visitors, promote technological awareness and spark curiosity to discover new ideas encircling science and engineering.",
      },
    ],
  },
  {
    id: "school",
    title: "School",
    short: "School",
    subtitle: "Competitions for school students",
    icon: "School",
    accent: "#FFC878",
    events: [
      {
        id: "writing-competition",
        name: "Writing Competition",
        tag: "Open to schools",
        icon: "PenTool",
        summary: "A creative writing competition on thought-provoking topics.",
        desc: "A creative writing competition for students, encouraging the expression of ideas, perspectives and opinions on a variety of thought-provoking topics.",
      },
      {
        id: "elocution-competition",
        name: "Elocution Competition",
        tag: "Open to schools",
        icon: "Mic",
        summary: "A public speaking competition on persuasive, confident delivery.",
        desc: "A public speaking competition for students to express their ideas, opinions and perspectives with confidence and clarity, fostering the art of persuasive speaking.",
      },
      {
        id: "maths-natural-sciences-olympiads",
        name: "Maths and Natural Sciences Olympiads",
        tag: "Open to schools",
        icon: "Calculator",
        summary: "Separate Mathematics and Natural Science exams testing aptitude and reasoning.",
        desc: "Olympiads focused on testing the aptitude and reasoning of students, where separate Mathematics and Natural Science exams will be conducted.",
      },
    ],
  },
];

/* Flat list with category info attached, in display order */
export const allEvents = eventCategories.flatMap((category) =>
  category.events.map((event) => ({
    ...event,
    categoryId: category.id,
    categoryTitle: category.title,
    accent: category.accent,
  }))
);

export const totalEvents = allEvents.length;

export const getEvent = (id) => allEvents.find((event) => event.id === id);

export default eventCategories;
