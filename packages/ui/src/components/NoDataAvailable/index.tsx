export const NoDataAvailable = () => {
  return (
    <div className="flex items-center justify-center h-64 bg-white rounded-lg">
      <div className="text-center">
        <h2 className="text-magenta-500 text-2xl font-semibold mb-2">
          No hay datos disponibles
        </h2>
        <p className="text-gray-700">
          Actualmente no hay información para mostrar
        </p>
      </div>
    </div>
  );
};
