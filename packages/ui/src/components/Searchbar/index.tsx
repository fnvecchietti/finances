
export const Searchbar = ({setFilter}: {setFilter: React.SetStateAction<any>}) => {
  
  return (
    <div className="flex w-full justify-center min-h-10">
      <input
        type="text"
        placeholder="type to search"
        onChange={(e) => setFilter(e.target.value)}
        className="flex w-full h-10 p-4 outline-none  border-solid rounded-lg placeholder-gray-400 placeholder duration-100 ease-in hover:border-black hover:border-2"
      />
    </div>
  );
};
