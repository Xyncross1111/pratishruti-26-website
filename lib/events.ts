export type FormFieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "textarea"
  | "select"
  | "radio";

export type FormField = {
  id: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  /** For select and radio: option values (and labels if different, use same for both). */
  options?: string[];
};

export type RegistrationEvent = {
  id: number;
  name: string;
  slug: string;
  date?: string;
  venue?: string;
  category?: string;
  access?: "RBU only" | "Open to all";
  prize?: string;
  registrationStatus?: "open" | "closed" | "soon";
  formFields: FormField[];
};

/**
 * Single source of truth for events that support registration.
 * Each event has its own form fields; sheet tab name = event name (sanitized).
 */
export const registrationEvents: RegistrationEvent[] = [
  {
    id: 1,
    name: "Naaqaab",
    slug: "naaqaab",
    date: "21st Feb 2026",
    venue: "MBA Auditorium",
    category: "Dramatics",
    access: "Open to all",
    prize: "₹10,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "collegeName",
        label: "College Name",
        type: "text",
        required: true,
      },
      {
        id: "participantCategory",
        label: "Participant Category",
        type: "select",
        required: true,
        options: ["RBU Student", "Outside RBU Student"],
      },
      {
        id: "performanceType",
        label: "Performance Type",
        type: "radio",
        required: true,
        options: ["Monologue", "Shortplay"],
      },
    ],
  },
  {
    id: 2,
    name: "Footsteps",
    slug: "footsteps",
    date: "21st Feb 2026",
    venue: "OAT",
    category: "Dance",
    access: "Open to all",
    prize: "₹10,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "collegeName",
        label: "College Name",
        type: "text",
        required: true,
      },
      {
        id: "participantCategory",
        label: "Participant Category",
        type: "select",
        required: true,
        options: ["RBU Student", "Outside RBU Student"],
      },
      {
        id: "entryType",
        label: "Entry Type",
        type: "radio",
        required: true,
        options: ["Solo", "Group"],
      },
    ],
  },
  {
    id: 7,
    name: "Vibrato",
    slug: "vibrato",
    date: "22nd Feb 2026",
    venue: "MBA Auditorium",
    category: "Music",
    access: "Open to all",
    prize: "₹10,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "collegeName",
        label: "College Name",
        type: "text",
        required: true,
      },
      {
        id: "participantCategory",
        label: "Participant Category",
        type: "select",
        required: true,
        options: ["RBU Student", "Outside RBU Student"],
      },
      {
        id: "entryType",
        label: "Entry Type",
        type: "radio",
        required: true,
        options: ["Solo", "Group", "Instrumental Solo", "Acappella"],
      },
    ],
  },
  {
    id: 3,
    name: "Art Affairs",
    slug: "art-affairs",
    date: "23rd Feb 2026",
    venue: "OAT Venue",
    category: "Fine Arts",
    access: "Open to all",
    prize: "₹6,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "collegeName",
        label: "College Name",
        type: "text",
        required: true,
      },
      {
        id: "participantCategory",
        label: "Participant Category",
        type: "select",
        required: true,
        options: ["RBU Student", "Outside RBU Student"],
      },
      {
        id: "entryType",
        label: "Entry Type",
        type: "radio",
        required: true,
        options: ["Face Painting", "Wall Painting"],
      },
    ],
  },
  {
    id: 4,
    name: "Picasso",
    slug: "picasso",
    date: "22nd Feb 2026",
    venue: "Basketball Court",
    category: "Media",
    access: "Open to all",
    prize: "₹6,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "collegeName",
        label: "College Name",
        type: "text",
        required: true,
      },
      {
        id: "participantCategory",
        label: "Participant Category",
        type: "select",
        required: true,
        options: ["RBU Student", "Outside RBU Student"],
      },
      {
        id: "entryType",
        label: "Entry Type",
        type: "radio",
        required: true,
        options: ["Photography", "Videography Editing"],
      },
    ],
  },
  {
    id: 5,
    name: "Quizzeus",
    slug: "quizzeus",
    date: "23rd Feb 2026",
    venue: "G-Block Classroom",
    category: "Quiz",
    access: "Open to all",
    prize: "₹4,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "collegeName",
        label: "College Name",
        type: "text",
        required: true,
      },
      {
        id: "participantCategory",
        label: "Participant Category",
        type: "select",
        required: true,
        options: ["RBU Student", "Outside RBU Student"],
      },
      {
        id: "entryType",
        label: "Entry Type",
        type: "radio",
        required: true,
        options: ["Duo"],
      },
    ],
  },
  {
    id: 6,
    name: "Minute To Win It",
    slug: "minute-to-win-it",
    date: "21st Feb 2026",
    venue: "Basketball Court",
    category: "Fun Event",
    access: "RBU only",
    prize: "₹4,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      {
        id: "rknecEmail",
        label: "RKNEC/RBU Email ID",
        type: "email",
        required: true,
      },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "branchSection",
        label: "Branch-Section",
        type: "text",
        required: true,
      },
      {
        id: "yearOfStudy",
        label: "Year of Study",
        type: "select",
        required: true,
        options: ["First Year", "Second Year", "Third Year", "Final Year"],
      },
    ],
  },
  {
    id: 8,
    name: "RBU's Got Talent",
    slug: "rbu-got-talent",
    date: "23rd Feb 2026",
    venue: "EN Auditorium",
    category: "Talent",
    access: "RBU only",
    prize: "₹10,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      {
        id: "rknecEmail",
        label: "RKNEC/RBU Email ID",
        type: "email",
        required: true,
      },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "branchSection",
        label: "Branch-Section",
        type: "text",
        required: true,
      },
      {
        id: "yearOfStudy",
        label: "Year of Study",
        type: "select",
        required: true,
        options: ["First Year", "Second Year", "Third Year", "Final Year"],
      },
      { id: "typeOfAct", label: "Type of Act", type: "text", required: true },
      {
        id: "soloOrGroup",
        label: "Is this a solo or group act",
        type: "radio",
        required: true,
        options: ["Solo", "Group"],
      },
      {
        id: "actDescription",
        label: "Act Description",
        type: "textarea",
        required: false,
      },
      {
        id: "actDuration",
        label: "Approximate duration of the act (e.g., 2–3 min, 3–5 min)",
        type: "text",
        required: true,
      },
    ],
  },
  {
    id: 9,
    name: "Ingenium",
    slug: "ingenium",
    date: "22nd Feb 2026",
    venue: "EN Parking",
    category: "Technical",
    access: "RBU only",
    prize: "₹10,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      {
        id: "rknecEmail",
        label: "RKNEC/RBU Email ID",
        type: "email",
        required: true,
      },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "branchSection",
        label: "Branch-Section",
        type: "text",
        required: true,
      },
      {
        id: "yearOfStudy",
        label: "Year of Study",
        type: "select",
        required: true,
        options: ["First Year", "Second Year", "Third Year", "Final Year"],
      },
    ],
  },
  {
    id: 10,
    name: "Persona",
    slug: "persona",
    date: "22nd Feb 2026",
    venue: "DT-906",
    category: "Personality",
    access: "RBU only",
    prize: "₹5,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      {
        id: "rknecEmail",
        label: "RKNEC/RBU Email ID",
        type: "email",
        required: true,
      },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "branchSection",
        label: "Branch-Section",
        type: "text",
        required: true,
      },
      {
        id: "yearOfStudy",
        label: "Year of Study",
        type: "select",
        required: true,
        options: ["First Year", "Second Year", "Third Year", "Final Year"],
      },
    ],
  },
  {
    id: 11,
    name: "Virtual Gaming",
    slug: "virtual-gaming",
    date: "22nd Feb 2026",
    venue: "DT-109, DT-209",
    category: "Gaming",
    access: "RBU only",
    prize: "₹5,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      {
        id: "rknecEmail",
        label: "RKNEC/RBU Email ID",
        type: "email",
        required: true,
      },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "branchSection",
        label: "Branch-Section",
        type: "text",
        required: true,
      },
      {
        id: "yearOfStudy",
        label: "Year of Study",
        type: "select",
        required: true,
        options: ["First Year", "Second Year", "Third Year", "Final Year"],
      },
    ],
  },
  {
    id: 12,
    name: "Dalal Street",
    slug: "dalal-street",
    date: "23rd Feb 2026",
    venue: "G-Block Classroom",
    category: "Finance",
    access: "RBU only",
    prize: "₹7,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      {
        id: "rknecEmail",
        label: "RKNEC/RBU Email ID",
        type: "email",
        required: true,
      },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "branchSection",
        label: "Branch-Section",
        type: "text",
        required: true,
      },
      {
        id: "yearOfStudy",
        label: "Year of Study",
        type: "select",
        required: true,
        options: ["First Year", "Second Year", "Third Year", "Final Year"],
      },
    ],
  },
  {
    id: 13,
    name: "Cinecrypt",
    slug: "cinecrypt",
    date: "21st Feb 2026",
    venue: "DT-109, DT-209",
    category: "Entertainment",
    access: "RBU only",
    prize: "₹5,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      {
        id: "rknecEmail",
        label: "RKNEC/RBU Email ID",
        type: "email",
        required: true,
      },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "branchSection",
        label: "Branch-Section",
        type: "text",
        required: true,
      },
      {
        id: "yearOfStudy",
        label: "Year of Study",
        type: "select",
        required: true,
        options: ["First Year", "Second Year", "Third Year", "Final Year"],
      },
    ],
  },
  {
    id: 14,
    name: "Hyroxx",
    slug: "hyroxx",
    date: "21st Feb 2026",
    venue: "Football Ground",
    category: "Sports",
    access: "RBU only",
    prize: "₹5,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      {
        id: "rknecEmail",
        label: "RKNEC/RBU Email ID",
        type: "email",
        required: true,
      },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "branchSection",
        label: "Branch-Section",
        type: "text",
        required: true,
      },
      {
        id: "yearOfStudy",
        label: "Year of Study",
        type: "select",
        required: true,
        options: ["First Year", "Second Year", "Third Year", "Final Year"],
      },
    ],
  },
  {
    id: 15,
    name: "Escape Room",
    slug: "escape-room",
    date: "22nd Feb 2026",
    venue: "DT-701",
    category: "Adventure",
    access: "RBU only",
    prize: "₹5,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      {
        id: "rknecEmail",
        label: "RKNEC/RBU Email ID",
        type: "email",
        required: true,
      },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "branchSection",
        label: "Branch-Section",
        type: "text",
        required: true,
      },
      {
        id: "yearOfStudy",
        label: "Year of Study",
        type: "select",
        required: true,
        options: ["First Year", "Second Year", "Third Year", "Final Year"],
      },
    ],
  },
  {
    id: 16,
    name: "Auto Expo",
    slug: "auto-expo",
    date: "24th Feb 2026",
    venue: "EN Parking",
    category: "Showcase",
    access: "Open to all",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "collegeName",
        label: "College Name",
        type: "text",
        required: true,
      },
      {
        id: "participantCategory",
        label: "Participant Category",
        type: "select",
        required: true,
        options: ["RBU Student", "Outside RBU Student"],
      },
    ],
  },
  {
    id: 17,
    name: "Movie Eve",
    slug: "movie-eve",
    date: "24th Feb 2026",
    venue: "MBA Auditorium",
    category: "Entertainment",
    access: "Open to all",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      { id: "email", label: "Email", type: "email", required: true },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "collegeName",
        label: "College Name",
        type: "text",
        required: true,
      },
      {
        id: "participantCategory",
        label: "Participant Category",
        type: "select",
        required: true,
        options: ["RBU Student", "Outside RBU Student"],
      },
    ],
  },
  {
    id: 18,
    name: "Traitors",
    slug: "traitors",
    date: "22nd Feb 2026",
    venue: "DT-301",
    category: "Strategy",
    access: "RBU only",
    prize: "₹5,000",
    registrationStatus: "open",
    formFields: [
      { id: "fullName", label: "Full Name", type: "text", required: true },
      {
        id: "rknecEmail",
        label: "RKNEC/RBU Email ID",
        type: "email",
        required: true,
      },
      {
        id: "contactNumber",
        label: "Contact Number",
        type: "tel",
        required: true,
      },
      {
        id: "branchSection",
        label: "Branch-Section",
        type: "text",
        required: true,
      },
      {
        id: "yearOfStudy",
        label: "Year of Study",
        type: "select",
        required: true,
        options: ["First Year", "Second Year", "Third Year", "Final Year"],
      },
    ],
  },
];

export function getEventById(
  id: number | string,
): RegistrationEvent | undefined {
  const n = typeof id === "string" ? parseInt(id, 10) : id;
  if (Number.isNaN(n)) return undefined;
  return registrationEvents.find((e) => e.id === n);
}

export function getEventBySlug(slug: string): RegistrationEvent | undefined {
  const s = slug?.trim().toLowerCase();
  if (!s) return undefined;
  return registrationEvents.find((e) => e.slug === s);
}

/**
 * Resolve event from URL param: supports id (e.g. "1") or slug (e.g. "poetry-slam").
 */
export function getEventFromParam(
  param: string | null | undefined,
): RegistrationEvent | undefined {
  if (param == null || param === "") return undefined;
  const trimmed = param.trim();
  const byId = getEventById(trimmed);
  if (byId) return byId;
  return getEventBySlug(trimmed);
}

/**
 * Sanitize event name for use as a Google Sheet tab name (no * ? \ / : [ ]).
 * Sheet names have a 100-char limit.
 */
export function eventNameToSheetName(name: string): string {
  return name
    .replace(/[*?\\/:[\]]/g, "")
    .trim()
    .slice(0, 100);
}
