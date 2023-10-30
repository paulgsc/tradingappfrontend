import TabMenu from "../../../../components/ui/TabMenu";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ImagesTable from "./ImagesTable";

function ImageDescription({ publishedImages }) {
  const { model } = useParams();
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  const { imageUpload = [] } = useSelector((state) => state.adminFetchData);

  const handleTabClick = (tabId, path = "") => {
    const currentSearchParams = new URLSearchParams(queryParameters);
    currentSearchParams.has("tab")
      ? currentSearchParams.set("tab", tabId)
      : currentSearchParams.append("tab", tabId);
    navigate(`${path}?${currentSearchParams.toString()}`);
  };

  const isTabActive = (tabId) => {
    const activeTab = queryParameters.get("tab")
      ? queryParameters.get("tab")
      : "Published Images";
    return activeTab === tabId;
  };

  const headers = [
    {
      id: "tab_4",
      title: "How to",
      content: <Instructions />,
      path: `/models/${model}/images/uploads`,
    },
    {
      id: "tab_1",
      title: "Published Images",
      content: <ImagesTable type="published" data={publishedImages} />,
      path: `/models/${model}/images/uploads/published`,
    },
    {
      id: "tab_2",
      title: "Uploaded Images",

      content: <ImagesTable type="uploads" data={imageUpload} />,
      path: `/models/${model}/images/uploads/stage`,
    },
  ];
  return (
    <TabMenu className={"w-full h-full"}>
      <TabMenu.List className={"mb-2 xl:mb-4 border-b-2"}>
        {headers.map((item) => (
          <TabMenu.ListItems key={item.id}>
            <TabMenu.ButtonAction
              handleTabClick={handleTabClick}
              isTabActive={isTabActive}
              item={item}
            >
              <div className="flex relative">
                <span>{item.title}</span>
                {item?.icon && (
                  <span className="absolute -right-4 xl:-right-6 -top-2">
                    {item?.icon}
                  </span>
                )}
              </div>
            </TabMenu.ButtonAction>
          </TabMenu.ListItems>
        ))}
      </TabMenu.List>
      <TabMenu.ContentCard className={" w-full h-full"}>
        {headers.map((item) => (
          <TabMenu.Content
            className={"flex justify-center w-full h-full"}
            item={item}
            isTabActive={isTabActive}
            key={item.id}
          />
        ))}
      </TabMenu.ContentCard>
    </TabMenu>
  );
}

const Instructions = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="text-2xl font-bold mb-4">How to use this</h3>
      <p className="mb-4">
        Use this form to upload new images for existing properties. Either by
        creating new ones if there are no current images, or selecting which
        existing images to replace.
      </p>
      <ol className="list-decimal pl-8">
        <li className="mb-2">
          Search for property to update if there are more than one.
        </li>
        <li className="mb-2">
          Go to upload tab and upload new images to start staging changes.
        </li>
        <li className="mb-2">
          View and compare existing images to staged images by navigating to
          either published tab or uploaded tab.
        </li>
        <li className="mb-2">
          In published images tab, if relevant, select the image you want to be
          replaced.
        </li>
        <li className="mb-2">
          In uploaded images tab, if necessary rename images, and select the
          images you want to be posted.
        </li>
        <li className="mb-2">
          On dashboard tab, write brief description of staged changes and post
          to database when ready. Changes to site will take effect immediately.
        </li>
      </ol>
    </div>
  );
};

export default ImageDescription;
