import { useContext } from "react";
import { Box } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import CheckIcon from "@mui/icons-material/Check";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import UserContext from "../../context/userContext";
import ThemeContext from "../../context/themeContext";
import { Business, ItemMenuProps } from "../../utils/interfaces";
import SearchField from "../Elements/SearchField";

export const BusinessMenu = ({ items, handleFilter }: ItemMenuProps) => {
  const { currentUser } = useContext(UserContext);
  const { palette } = useContext(ThemeContext);

  const handleOwnedBusinesses = (data: Business[]) => {
    const owned = data.filter((item: Business | null) => {
      return item?.owners?.find((user) => user._id === currentUser?._id);
    });
    handleFilter(owned);
  };

  const handleLikedBusinesses = (data: Business[]) => {
    const liked = data.filter((item: Business | null) => {
      return item?.likes?.find((user) => user._id === currentUser?._id);
    });
    handleFilter(liked);
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: palette?.background.primary,
        color: palette?.text.tertiary,
      }}
    >
      <CardContent
        sx={{
          padding: "8px 8px 0 8px",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1.5 }}
        >
          Business
        </Typography>
        <Typography
          variant="body2"
          sx={{
            paddingTop: "0.5rem",
            marginBottom: "-0.5rem",
            fontWeight: "bold",
          }}
        >
          Filters
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <SearchField data={items} filter={handleFilter} />
        <Button
          variant="contained"
          startIcon={<TravelExploreIcon />}
          disableElevation
          sx={{
            color: palette?.text.primary,
            background: palette?.background.tertiary,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
          }}
          onClick={() => handleFilter(items)}
        >
          All
        </Button>
        <Button
          variant="outlined"
          startIcon={<CheckIcon />}
          sx={{
            border: `1px solid ${palette?.background.tertiary}`,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
            color: palette?.blue,
          }}
          onClick={() => handleOwnedBusinesses(items)}
        >
          Owned
        </Button>
        <Button
          variant="outlined"
          startIcon={<FavoriteBorderIcon />}
          sx={{
            border: `1px solid ${palette?.background.tertiary}`,
            marginLeft: "0 !important",
            marginRight: "0.5rem !important",
            marginTop: "0.5rem !important",
            color: palette?.warning,
          }}
          onClick={() => handleLikedBusinesses(items)}
        >
          Liked
        </Button>
      </CardActions>
    </Box>
  );
};

export default BusinessMenu;
