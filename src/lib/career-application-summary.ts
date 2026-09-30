import type { Role } from "./careers-roles";

export interface CareerApplicationSummaryInput {
  first_name: string;
  surname: string;
  email: string;
  answers?: Record<string, string>;
  school?: string;
  portfolio?: string;
  message?: string;
}

export function buildCareerApplicationSummary(
  role: Role,
  application: CareerApplicationSummaryInput
): string {
  const questionLabels = new Map<string, string>();
  for (const question of role.questions ?? []) {
    questionLabels.set(question.id, question.label);
  }
  const answers = Object.entries(application.answers ?? {});
  const answerLines = answers.length
    ? answers.map(([id, value]) => `${questionLabels.get(id) ?? id}: ${value || "(blank)"}`)
    : ["No role-specific answers were provided."];

  return [
    "Olyxee career application",
    "",
    `Role: ${role.title}`,
    `Name: ${application.first_name} ${application.surname}`.trim(),
    `Email: ${application.email}`,
    "",
    "Role-specific answers:",
    ...answerLines,
    "",
    `School: ${application.school || "(not provided)"}`,
    `CV or work link: ${application.portfolio || "(not provided)"}`,
    `Additional note: ${application.message || "(not provided)"}`,
  ].join("\n");
}