import MainHeader from "@/components/MainHeader";
import MediaDisplay from "@/components/MediaDisplay";
import { getCategoryData } from "@/utils/media";
import { getRandomMedia } from "@/utils/utils";

const GenrePage = async ({
  params,
  searchParams,
}: {
  params: { genreId: string[] };
  searchParams: { cb: string };
}) => {
  const { data, genreList, categoryId, genreIdSelected } =
    await getCategoryData(params.genreId[0], searchParams.cb);

  return (
    <>
      <MainHeader
        categoryId={categoryId}
        categories={genreList.genres}
        genreIdSelected={genreIdSelected}
      />
      <MediaDisplay bannerMedia={getRandomMedia(data.results)} />
    </>
  );
};

export default GenrePage;
