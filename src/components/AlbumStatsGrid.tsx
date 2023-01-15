const AlbumStatsGrid = () => {
  return (
    <div className="border-b  border-slate-600 py-6 text-center">
      <p>Rating stars</p>
      <div className="flex w-full justify-around">
        <div>
          <p>likes</p>
          <p className="text-3xl">1.5k</p>
        </div>
        <div>
          <p>ratings</p>
          <p className="text-3xl">1.5k</p>
        </div>
        <div>
          <p>reviews</p>
          <p className="text-3xl">1.5k</p>
        </div>
      </div>
    </div>
  );
};

export default AlbumStatsGrid;
