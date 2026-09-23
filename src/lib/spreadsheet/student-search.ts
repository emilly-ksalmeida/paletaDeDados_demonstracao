import type { SpreadsheetStudentType } from "@/types/spreadsheetStudentType";

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function findStudentsByName(
  students: SpreadsheetStudentType[],
  query: string,
) {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  const scoredMatches = students
    .map((student) => {
      const normalizedName = normalizeText(student.nome_completo);

      if (!normalizedName.includes(normalizedQuery)) {
        return null;
      }

      if (normalizedName === normalizedQuery) {
        return { student, score: 0 };
      }
      if (normalizedName.startsWith(normalizedQuery)) {
        return { student, score: 1 };
      }

      return { student, score: 2 };
    })
    .filter(
      (entry): entry is { student: SpreadsheetStudentType; score: number } =>
        entry !== null,
    );

  return scoredMatches
    .sort(
      (a, b) =>
        a.score - b.score ||
        a.student.nome_completo.localeCompare(b.student.nome_completo),
    )
    .map((entry) => entry.student);
}
