import AlbumReview from "./AlbumReview";

const AlbumReviewsGrid = () => {
  return (
    <div className="flex flex-[0.75] flex-col">
      <div className="flex w-full justify-end gap-x-4">
        <select className="select-bordered select">
          <option disabled selected>
            Who shot first?
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        <select className="select-bordered select">
          <option disabled selected>
            Who shot first?
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        <select className="select-bordered select">
          <option disabled selected>
            Who shot first?
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        <select className="select-bordered select">
          <option disabled selected>
            Who shot first?
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
      </div>
      <div className="flex flex-[0.75] flex-col">
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
        <AlbumReview />
      </div>
    </div>
  );
};

export default AlbumReviewsGrid;
