import { course } from "./course";
import { credential } from "./credential";
import { experience } from "./experience";
import {
  localeString,
  localeStringArray,
  localeText,
} from "./localized";
import { profile } from "./profile";
import { project } from "./project";

export const schemaTypes = [
  localeString,
  localeText,
  localeStringArray,
  profile,
  project,
  experience,
  credential,
  course,
];
