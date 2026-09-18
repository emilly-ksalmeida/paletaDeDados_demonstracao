import { useState, type ChangeEvent } from "react";

import { Header } from "./components/Header";
import { SpreadsheetUploadCard } from "./components/SpreadsheetUploadCard";
import { parseSpreadsheetFile } from "@/lib/spreadsheet/spreadsheet";
import {
  formatUploadTimestamp,
  getLastUploadAt,
  setLastUploadAt,
} from "@/lib/storage/uploadMetadata";
import type { SpreadsheetStudentType } from "@/types/spreadsheetStudentType";

type StatusTone = "default" | "success" | "error";

function App() {
  const [rawSpreadsheetData, setRawSpreadsheetData] = useState<
    SpreadsheetStudentType[]
  >([]);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState(
    "Carregue a planilha para liberar a busca.",
  );
  const [statusTone, setStatusTone] = useState<StatusTone>("default");
  const [isParsing, setIsParsing] = useState(false);
  const [persistedUploadAt, setPersistedUploadAt] = useState(
    () => getLastUploadAt() ?? "",
  );

  async function processSpreadsheetUpload(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const fileName = file.name.toLowerCase();
    const isSupportedFile =
      fileName.endsWith(".xlsx") ||
      fileName.endsWith(".ods") ||
      fileName.endsWith(".csv");

    if (!isSupportedFile) {
      setRawSpreadsheetData([]);
      setSelectedFileName(file.name);
      setStatusTone("error");
      setStatusMessage(
        "Formato inválido. Use apenas arquivos .xlsx, .ods ou .csv.",
      );
      event.target.value = "";
      return;
    }

    setIsParsing(true);
    setStatusTone("default");
    setStatusMessage("Lendo planilha...");

    try {
      const parsedRows = await parseSpreadsheetFile(file);
      const currentUploadAt = new Date().toISOString();

      setRawSpreadsheetData(parsedRows);
      setSelectedFileName(file.name);
      setPersistedUploadAt(currentUploadAt);
      setLastUploadAt(currentUploadAt);
      setStatusTone("success");
      setStatusMessage(
        `${parsedRows.length} registro(s) carregado(s) da planilha.`,
      );
    } catch (error) {
      console.log(error);

      setRawSpreadsheetData([]);
      setSelectedFileName(file.name);
      setStatusTone("error");
      setStatusMessage("Não foi possível ler a planilha enviada.");
    } finally {
      setIsParsing(false);
      event.target.value = "";
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    void processSpreadsheetUpload(event);
  }

  const lastUploadLabel = persistedUploadAt
    ? formatUploadTimestamp(persistedUploadAt)
    : "";

  const shouldWarnAboutMissingData =
    rawSpreadsheetData.length === 0 && Boolean(persistedUploadAt);

  return (
    <div>
      <Header />
      <main className="container mx-auto flex flex-col gap-5 pt-5">
        <section aria-labelledby="upload-heading">
          <SpreadsheetUploadCard
            selectedFileName={selectedFileName}
            isParsing={isParsing}
            statusMessage={statusMessage}
            statusTone={statusTone}
            lastUploadLabel={lastUploadLabel}
            shouldWarnAboutMissingData={shouldWarnAboutMissingData}
            onFileChange={handleFileChange}
          />
        </section>
        <section aria-labelledby="busca-heading">
          <h2 id="busca-heading">Área de busca</h2>
        </section>
        <aside aria-labelledby="resultados-heading">
          <h2 id="resultados-heading">Resultados da pesquisa</h2>
        </aside>
        <section aria-labelledby="dados-heading">
          <h2 id="dados-heading">Dados principais</h2>
        </section>
      </main>
    </div>
  );
}

export default App;
