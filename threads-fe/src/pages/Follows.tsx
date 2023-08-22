import { FollowCard } from "@/features/follow";
import { IFollow } from "@/interfaces/follow";
import { API } from "@/libs/api";
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Follows() {
  const [followState, setFollowState] = useState("followers");
  const [followsData, setFollowsData] = useState<IFollow[]>([]);

  async function getFollowData() {
    const response = await API.get(`/follows?type=${followState}`);
    console.log("follows:  ", response.data);
    setFollowsData(response.data);
  }

  useEffect(() => {
    console.log("masuk sini dong");
    getFollowData();
  }, [followState]);

  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        <Tabs isFitted variant="enclosed" width="600px" marginTop={"20px"}>
          <TabList mb="1em">
            <Tab onClick={() => setFollowState("followers")}>Followers</Tab>
            <Tab onClick={() => setFollowState("followings")}>Followings</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {followsData.map((follow, index) => (
                <FollowCard
                  key={index}
                  id={follow.id}
                  full_name={follow.full_name}
                  username={follow.username}
                  email={follow.email}
                  picture={follow.picture}
                  description={follow.description}
                  is_followed={follow.is_followed}
                />
              ))}
            </TabPanel>
            <TabPanel>
              {followsData.map((follow, index) => (
                <FollowCard
                  key={index}
                  id={follow.id}
                  full_name={follow.full_name}
                  username={follow.username}
                  email={follow.email}
                  picture={follow.picture}
                  description={follow.description}
                  is_followed={follow.is_followed}
                />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
