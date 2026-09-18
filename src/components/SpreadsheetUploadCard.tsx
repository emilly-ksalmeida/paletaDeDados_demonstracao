import { useId, useState } from "react";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function SpreadsheetUploadCard() {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputId = useId();
  const hintId = useId();
  const statusId = useId();

  return (
    <Card className="flex justify-between p-2">
      <CardHeader>
        <CardTitle asChild>
          <h2 id="upload-heading">Carregar Planilha</h2>
        </CardTitle>
        <CardDescription>
          Selecione a planilha com os dados dos alunos.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-end gap-3">
        <Input
          id={inputId}
          type="file"
          accept=".xlsx,.ods,.csv"
          className="sr-only"
          aria-describedby={`${hintId}${fileName ? ` ${statusId}` : ""}`}
          onChange={(event) => {
            const file = event.target.files?.[0];
            setFileName(file?.name ?? null);
            event.target.value = "";
          }}
        />
        <Button asChild>
          <label htmlFor={inputId}>
            <Upload aria-hidden="true" />
            Escolher planilha
          </label>
        </Button>
        <p id={hintId} className="text-sm text-muted-foreground">
          Formatos aceitos: .xlsx, .ods, .csv
        </p>
        {fileName ? (
          <p id={statusId} role="status">
            Arquivo selecionado: {fileName}
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
