import React, { useState } from "react";
import TabMenu from "../../../../components/ui/TabMenu";
import BarGraph from "../charts/BarGraph";
import { fetchPropertyFinancials } from "../../../../contexts/redux/actions/fetchPropertyActions";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchSelectedProperty } from "../../../../contexts/redux/actions/tradingActions";

function GraphTabs() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabClick = (tabId, path = "") => {
    setActiveTab(tabId);
    path && navigate(path);
  };

  const isTabActive = (tabId) => {
    return activeTab === tabId;
  };

  const queryKeyActiveProperty = ["active-property"];
  const { data: { id = null } = {} } = useQuery(
    queryKeyActiveProperty,
    fetchSelectedProperty,
    {
      enabled: true,
    }
  );

  const queryKey = ["financials", id];
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      queryKey,

      async ({ pageParam = 1 }) => {
        return await fetchPropertyFinancials(pageParam, id);
      },

      {
        getNextPageParam: (lastPage, allPages) => {
          // Check if there's a "next" page in the response data
          // and return the next page number if available, otherwise return null
          const nextPage = lastPage.next;
          if (nextPage) {
            return Number(nextPage.split("=")[1]);
          }
          return null;
        },
      }
    );

  const financialsData = data?.pages?.flatMap((page) => page?.results) || [];

  const headers = [
    {
      id: "tab_1",
      title: "Last Year",
      content: <BarGraph data={financialsData} />,
    },
    {
      id: "tab_3",
      title: "This Year",
      content: <BarGraph data={financialsData} />,
    },
  ];

  return (
    <TabMenu className={"h-full"}>
      <TabMenu.List className={" rounded-t-md shadow-sm "}>
        {headers.map((item, i) => (
          <TabMenu.ListItems key={i}>
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
      <TabMenu.ContentCard className={"w-full h-full"}>
        {headers.map((item, i) => (
          <TabMenu.Content
            className={" min-h-[600px] xl:min-h-[800px]"}
            key={i}
            item={item}
            isTabActive={isTabActive}
          />
        ))}
      </TabMenu.ContentCard>
    </TabMenu>
  );
}
export default GraphTabs;
