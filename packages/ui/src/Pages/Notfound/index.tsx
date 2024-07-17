const NotFound = () => {

    return (
        <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <h1 className="text-magenta-500 text-6xl font-bold mb-4">404 Not Found</h1>
          <p className="text-gray-700 text-lg mb-6">Lo sentimos, la página que estás buscando no existe.</p>
          <a href="/" className="bg-magenta-500 hover:bg-magenta-700 text-white font-bold py-2 px-4 rounded">
            Volver al Inicio
          </a>
        </div>
      </div>
      
    )
}

export default NotFound;