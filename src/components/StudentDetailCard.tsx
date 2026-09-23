import { User } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStudentCourse } from "@/lib/spreadsheet/student-course";
import type { SpreadsheetStudentType } from "@/types/spreadsheetStudentType";

interface StudentDetailCardProps {
  student: SpreadsheetStudentType | null;
}

const fields = [
  { label: "Nome", key: "nome_completo" as const },
  { label: "Telefone", key: "telefone_para_contato" as const },
  { label: "Responsável", key: "nome_mae_ou_responsavel" as const },
  { label: "Telefone do responsável", key: "telefone_responsavel" as const },
] as const;

export function StudentDetailCard({ student }: StudentDetailCardProps) {
  const course = student ? getStudentCourse(student) : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle asChild>
          <h2 id="dados-heading" className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" aria-hidden="true" />
            Dados principais
          </h2>
        </CardTitle>
        <CardDescription>
          Informações principais do aluno selecionado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!student ? (
          <div className="rounded-lg border border-muted bg-muted/50 p-4 text-sm text-muted-foreground">
            Selecione um aluno nos resultados para ver seus dados principais.
          </div>
        ) : (
          <dl className="space-y-4">
            {fields.map(({ label, key }) => {
              const value = student[key];

              return (
                <div key={key}>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-1 font-medium text-foreground">
                    {value.trim() || "—"}
                  </dd>
                </div>
              );
            })}
            <div>
              <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Curso
              </dt>
              <dd className="mt-1 font-medium text-foreground">
                {course || "—"}
              </dd>
            </div>
          </dl>
        )}
      </CardContent>
    </Card>
  );
}