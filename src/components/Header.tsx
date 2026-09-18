export function Header() {
  return (
    <header className="flex flex-row gap-6 justify-start items-center px-28 py-4 bg-[#07406e]">
      <img
        src="/src/assets/icons/art-palette-svgrepo-com.svg"
        alt="Paleta de Dados"
        className="h-10 w-10"
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Paleta de Dados
        </h1>
        <h2 className="font-dancing text-white text-lg leading-none">
          Escola de Artes Oswaldo Verano
        </h2>
      </div>
    </header>
  );
}
