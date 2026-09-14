import "./index.css";

function App() {
  return (
    <div className="container mx-auto flex flex-col gap-5 pt-5">
      <header className="flex flex-row gap-5">
        <img
          src="/src/assets/icons/art-palette-svgrepo-com.svg"
          alt="Paleta de Dados"
          className="h-10 w-10"
        />
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Paleta de Dados
          </h1>
          <h2 className="font-dancing text-lg leading-none">
            Escola de Artes Oswaldo Verano
          </h2>
        </div>
      </header>
      <main>
        <section aria-labelledby="upload-heading">
          <h2 id="upload-heading">Área para upload da planilha</h2>
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
