import { useId, type ChangeEvent } from "react";
import { Loader2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type StatusTone = "default" | "success" | "error";

interface SpreadsheetUploadCardProps {
  selectedFileName?: string | null;
  isParsing?: boolean;
  statusMessage?: string;
  statusTone?: StatusTone;
  lastUploadLabel?: string;
  shouldWarnAboutMissingData?: boolean;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const statusToneStyles: Record<StatusTone, string> = {
  default: "text-[#5a7a6b]",
  success: "text-[#14b57a]",
  error: "border-red-400 bg-red-50 text-red-600",
};

export function SpreadsheetUploadCard({
  selectedFileName = null,
  isParsing = false,
  statusMessage,
  statusTone = "default",
  lastUploadLabel,
  shouldWarnAboutMissingData = false,
  onFileChange,
}: SpreadsheetUploadCardProps) {
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
          disabled={isParsing}
          aria-describedby={`${hintId} ${statusId}`}
          onChange={onFileChange}
        />
        {isParsing ? (
          <Button
            type="button"
            disabled
            className="bg-[#14b57a] text-white hover:bg-[#0a9263]"
          >
            <Loader2 className="animate-spin" aria-hidden="true" />
            Carregando planilha...
          </Button>
        ) : (
          <Button
            asChild
            className="bg-[#14b57a] text-white hover:bg-[#0a9263]"
          >
            <label htmlFor={inputId}>
              <Upload aria-hidden="true" />
              Escolher planilha
            </label>
          </Button>
        )}
        <p id={hintId} className="text-sm text-[#5a7a6b]">
          Formatos aceitos: .xlsx, .ods, .csv
        </p>
        <div
          id={statusId}
          role="status"
          className="flex flex-col items-end gap-1"
        >
          {selectedFileName ? (
            <p className="text-sm font-medium text-[#1a2e25]">
              Arquivo: {selectedFileName}
            </p>
          ) : null}
          {statusMessage ? (
            <p
              className={cn(
                "max-w-sm rounded-md border px-3 py-2 text-sm",
                statusToneStyles[statusTone],
              )}
            >
              {statusMessage}
            </p>
          ) : null}
          {lastUploadLabel ? (
            <p className="text-sm text-[#5a7a6b]">
              Último upload: {lastUploadLabel}
            </p>
          ) : null}
          {shouldWarnAboutMissingData ? (
            <p className="text-sm text-[#5a7a6b]">
              Você já fez upload antes, mas os dados ainda não foram carregados.
            </p>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
