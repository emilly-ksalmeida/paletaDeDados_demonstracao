import type { SpreadsheetStudentType } from "@/types/spreadsheetStudentType";

export function getStudentCourse(student: SpreadsheetStudentType): string {
  const candidates = [student.cursos_disponiveis, student.curso_noturno];

  return candidates.find((value) => value?.trim())?.trim() ?? "";
}