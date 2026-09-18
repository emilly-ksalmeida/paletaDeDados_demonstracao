import { Header } from "./components/Header";
import { SpreadsheetUploadCard } from "./components/SpreadsheetUploadCard";

function App() {
  return (
    <div className="container mx-auto flex flex-col gap-5 pt-5">
      <Header />
      <main>
        <section aria-labelledby="upload-heading">
          <SpreadsheetUploadCard />
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
