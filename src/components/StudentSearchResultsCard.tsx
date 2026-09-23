import { Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SpreadsheetStudentType } from "@/types/spreadsheetStudentType";

interface StudentSearchResultsCardProps {
  hasSpreadsheetData: boolean;
  hasSearchQuery: boolean;
  searchResults: SpreadsheetStudentType[];
  selectedResult: SpreadsheetStudentType | null;
  onSelectStudent: (student: SpreadsheetStudentType) => void;
}

export function StudentSearchResultsCard({
  hasSpreadsheetData,
  hasSearchQuery,
  searchResults,
  selectedResult,
  onSelectStudent,
}: StudentSearchResultsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle asChild>
          <h2 id="resultados-heading" className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" aria-hidden="true" />
            Resultados
          </h2>
        </CardTitle>
        <CardDescription>
          Lista de correspondências encontradas na planilha.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasSpreadsheetData ? (
          <div className="rounded-lg border border-muted bg-muted/50 p-4 text-sm text-muted-foreground">
            Faça o upload de uma planilha para iniciar a busca.
          </div>
        ) : !hasSearchQuery ? (
          <div className="rounded-lg border border-muted bg-muted/50 p-4 text-sm text-muted-foreground">
            Digite o nome de um aluno para visualizar os resultados.
          </div>
        ) : searchResults.length > 0 ? (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {searchResults.length} resultado(s)
            </p>
            <div className="space-y-2">
              {searchResults.map((student) => {
                const isSelected = selectedResult?.nome_completo === student.nome_completo;

                return (
                  <Button
                    key={`${student.nome_completo}-${student.telefone_para_contato}`}
                    type="button"
                    variant={isSelected ? "secondary" : "ghost"}
                    className={[
                      "h-auto w-full justify-start px-3 py-3 text-left",
                      isSelected
                        ? "border border-primary/30 bg-primary/10"
                        : "hover:bg-accent",
                    ].join(" ")}
                    onClick={() => onSelectStudent(student)}
                  >
                    <span className="font-medium">{student.nome_completo}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-muted bg-muted/50 p-4 text-sm text-muted-foreground">
            Nenhum aluno encontrado para esse termo.
          </div>
        )}
      </CardContent>
    </Card>
  );
}