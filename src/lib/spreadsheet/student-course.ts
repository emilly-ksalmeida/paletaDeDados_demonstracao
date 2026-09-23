import type { SpreadsheetStudentType } from "@/types/spreadsheetStudentType";

export function getStudentCourse(student: SpreadsheetStudentType): string {
  const candidates = [
    student.cursos_disponiveis,
    student.curso_noturno,
    student.dia_semana_prep1,
    student.dia_semana_prep2,
  ];

  return candidates.find((value) => value?.trim())?.trim() ?? "";
}