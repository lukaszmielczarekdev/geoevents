import { useContext, useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";
import UserContext from "../../context/userContext";
import SocialMenu from "../Navigation/SocialMenu";
import SocialList from "./SocialList";
import ThemeContext from "../../context/themeContext";

const Social = () => {
  const { users, onGetUsers } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    onGetUsers?.();
  }, [onGetUsers]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <SocialMenu users={users} handleFilter={setFilteredData} />
      <Divider
        variant="middle"
        sx={{
          background: palette?.divider,
          margin: "1rem 0 1.5rem 0",
        }}
      />
      <SocialList data={filteredData ? filteredData : []} />
    </Box>
  );
};

export default Social;
