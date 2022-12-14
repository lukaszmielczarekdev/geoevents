import { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormLabel,
  Input,
  List,
  TextField,
  Typography,
} from "@mui/material";
import EventHeader from "./EventHeader";
import Post from "./Post";
import Masonry from "@mui/lab/Masonry";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import UserContext from "../../context/userContext";
import EventContext from "../../context/eventContext";
import BusinessContext from "../../context/businessContext";
import PostContext from "../../context/postContext";
import ThemeContext from "../../context/themeContext";
import {
  Event,
  UserHeader,
  User as LoggedUser,
  Business,
} from "../../utils/interfaces";
import convertImage from "../../utils/imageConverter";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import debounce from "../../utils/debounce";
import BusinessHeader from "./BusinessHeader";

const User = () => {
  const { events } = useContext(EventContext);
  const { businesses } = useContext(BusinessContext);
  const { palette } = useContext(ThemeContext);
  const { usersPosts, onGetUsersPosts } = useContext(PostContext);
  const { user, currentUser, onGetUser, onUpdateUser, onFollowUser } =
    useContext(UserContext);
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [editDescription, setEditDescription] = useState<boolean>(false);

  useEffect(() => {
    onGetUser?.(id);
    onGetUsersPosts?.(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const {
    register: registerDescription,
    handleSubmit: handleRegisterDescription,
    reset: resetDescription,
  } = useForm({
    defaultValues: {
      description: null,
    },
  });

  const getUsersItems = (itemsArray: any) => {
    return itemsArray.filter(
      (item: Event | Business) => item?.creator?.name === id
    );
  };

  const handleSubmitAvatar = async () => {
    let convertedFile;
    if (file) {
      convertedFile = await convertImage(file, 170, 170);
    }

    try {
      await onUpdateUser?.({ dataType: "avatar", data: String(convertedFile) });
      setFile(null);
    } catch (err) {}
  };

  const handleSubmitDescription = async (data: {
    description: string | null;
  }) => {
    const description = data.description?.trim();
    if (description) {
      try {
        await onUpdateUser?.({
          dataType: "description",
          data: String(description),
        });
      } catch (err) {}
    }
    resetDescription();
    setEditDescription(!editDescription);
  };

  const renderAvatar = (
    user: UserHeader | undefined | null,
    currentuser: LoggedUser | undefined | null,
    file: any
  ) => {
    if (file) return URL.createObjectURL(file);
    if (user?._id === currentUser?._id) {
      return currentuser?.avatar;
    }
    if (user?.avatar) return user?.avatar;
    return "";
  };

  const ifFollowing = (
    currentuser: LoggedUser | null,
    id: string | undefined
  ) => {
    if (currentUser && id) {
      return currentuser?.following?.find((user) => user._id === id);
    }
    return null;
  };

  return (
    <Box
      sx={{
        paddingTop: { xs: "0", md: "2rem" },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gridGap: "2rem",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          overflow: "scroll",
          marginBottom: { xs: "2rem", md: "-2rem", lg: "-2.5rem" },
          color: palette?.text.tertiary,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row", md: "column", lg: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row" },
              alignItems: "center",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <FormLabel htmlFor="file">
                <Avatar
                  alt={"User avatar"}
                  src={renderAvatar(user, currentUser, file)}
                  sx={{
                    margin: "0 2rem 1rem 0",
                    height: { xs: "8rem", md: "7rem" },
                    width: { xs: "8rem", md: "7rem" },
                    WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                    boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
                    cursor:
                      user?._id === currentUser?._id ? "pointer" : "default",
                  }}
                />
                {user?._id === currentUser?._id ? (
                  <Input
                    type="file"
                    inputProps={{ accept: ".png,.jpeg,.jpg,.webp" }}
                    sx={{ display: "none" }}
                    id="file"
                    onChange={(e: any) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                ) : (
                  <></>
                )}
              </FormLabel>
              {file ? (
                <CheckIcon
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    cursor: "pointer",
                    opacity: "0.8",
                    color: "yellowgreen",
                    borderRadius: "50%",
                    border: "1px solid yellowgreen",
                  }}
                  onClick={() => handleSubmitAvatar()}
                />
              ) : null}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: { sm: "none", md: "block", lg: "none" },
                  alignContent: "left",
                }}
              >
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    fontWeight: 500,
                    fontSize: "1.2rem",
                    paddingLeft: 0.5,
                  }}
                >
                  {user?.name}
                </Typography>
                {currentUser?.name !== id ? (
                  <Button
                    onClick={debounce(() => onFollowUser?.(user?._id), 400)}
                    sx={{
                      color: ifFollowing(currentUser, user?._id)
                        ? palette?.warning
                        : "default",
                      borderRadius: "15px",
                      fontSize: ".8rem",
                      paddingLeft: 0,
                      margin: 0,
                    }}
                  >
                    {ifFollowing(currentUser, user?._id) ? (
                      <CloseIcon fontSize="small" sx={{ width: "1.5rem" }} />
                    ) : (
                      <CheckIcon fontSize="small" sx={{ width: "1.5rem" }} />
                    )}
                    {ifFollowing(currentUser, user?._id)
                      ? "Unfollow"
                      : "Follow"}
                  </Button>
                ) : (
                  <>
                    {editDescription ? (
                      <CheckIcon
                        sx={{
                          cursor: "pointer",
                          opacity: "0.8",
                          color: "yellowgreen",
                          borderRadius: "50%",
                          border: "1px solid yellowgreen",
                          padding: "0 .1rem",
                          marginTop: ".5rem",
                        }}
                        onClick={handleRegisterDescription(
                          debounce(handleSubmitDescription, 400)
                        )}
                      />
                    ) : (
                      <EditIcon
                        sx={{
                          padding: "0 .1rem",
                          marginTop: ".5rem",
                          cursor: "pointer",
                        }}
                        onClick={() => setEditDescription(!editDescription)}
                      />
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", m: 1, gridGap: "1rem", flexWrap: "wrap" }}
          >
            <Box sx={{ m: 2 }}>
              <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                {getUsersItems([...events, ...businesses]).length}
              </Typography>
              <Typography>Events</Typography>
            </Box>
            <Box sx={{ m: 2 }}>
              <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                {usersPosts.length}
              </Typography>
              <Typography>Posts</Typography>
            </Box>
            <Box sx={{ m: 2 }}>
              <Typography sx={{ fontWeight: 500, fontSize: "1.2rem" }}>
                {user?.followers?.length}
              </Typography>
              <Typography>Followers</Typography>
            </Box>
          </Box>
          <Box
            component="div"
            sx={{
              margin: ".5rem 0 1rem 0",
              fontSize: "1rem",
              display: { sm: "none", md: "block", lg: "none" },
            }}
          >
            <>
              {currentUser?.name === id ? (
                <>
                  {editDescription ? (
                    <Box component="form">
                      <TextField
                        placeholder="Write something about yourself..."
                        variant="standard"
                        multiline={true}
                        size="small"
                        margin="dense"
                        maxRows={3}
                        InputProps={{ disableUnderline: true }}
                        inputProps={{ style: { color: palette?.text.primary } }}
                        fullWidth
                        id="userDescription"
                        autoComplete="userDescription"
                        autoFocus
                        {...registerDescription("description", {
                          minLength: 3,
                          maxLength: 800,
                        })}
                      />
                    </Box>
                  ) : (
                    <Typography
                      component="div"
                      onClick={() => setEditDescription(true)}
                    >
                      {user?.description
                        ? user.description
                        : "Write something about yourself..."}
                    </Typography>
                  )}
                </>
              ) : (
                <Typography component="div">{user?.description}</Typography>
              )}
            </>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", sm: "flex", md: "none", lg: "flex" },
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: ".5rem",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 500,
              fontSize: "1.2rem",
              display: "flex",
            }}
          >
            {user?.name}
          </Typography>
          {currentUser?.name !== id ? (
            <Button
              onClick={debounce(() => onFollowUser?.(user?._id), 400)}
              sx={{
                color: ifFollowing(currentUser, user?._id)
                  ? palette?.warning
                  : palette?.blue,
                borderRadius: "15px",
                fontSize: ".8rem",
                padding: "0 .5rem",
              }}
            >
              {ifFollowing(currentUser, user?._id) ? (
                <CloseIcon fontSize="small" sx={{ width: "1.5rem" }} />
              ) : (
                <CheckIcon fontSize="small" sx={{ width: "1.5rem" }} />
              )}
              {ifFollowing(currentUser, user?._id) ? "Unfollow" : "Follow"}
            </Button>
          ) : (
            <>
              {editDescription ? (
                <CheckIcon
                  sx={{
                    cursor: "pointer",
                    opacity: "0.8",
                    color: "yellowgreen",
                    borderRadius: "50%",
                    border: "1px solid yellowgreen",
                    padding: "0 .1rem",
                    marginTop: ".5rem",
                  }}
                  onClick={handleRegisterDescription(
                    debounce(handleSubmitDescription, 400)
                  )}
                />
              ) : (
                <EditIcon
                  sx={{
                    padding: "0 .1rem",
                    marginTop: ".5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setEditDescription(!editDescription)}
                />
              )}
            </>
          )}
        </Box>
        <Box
          sx={{
            margin: ".5rem 0 1rem 0",
            fontSize: "1rem",
            display: { xs: "none", sm: "block", md: "none", lg: "block" },
          }}
        >
          <>
            {currentUser?.name === id ? (
              <>
                {editDescription ? (
                  <Box component="form">
                    <TextField
                      placeholder="Write something about yourself..."
                      variant="standard"
                      multiline={true}
                      size="small"
                      margin="dense"
                      maxRows={3}
                      InputProps={{ disableUnderline: true }}
                      inputProps={{ style: { color: palette?.text.primary } }}
                      fullWidth
                      id="userDescription"
                      autoComplete="userDescription"
                      autoFocus
                      {...registerDescription("description", {
                        minLength: 3,
                        maxLength: 800,
                      })}
                    />
                  </Box>
                ) : (
                  <Typography
                    component="div"
                    onClick={() => setEditDescription(true)}
                  >
                    {user?.description
                      ? user.description
                      : "Write something about yourself..."}
                  </Typography>
                )}
              </>
            ) : (
              <Typography component="div">{user?.description}</Typography>
            )}
          </>
        </Box>
        <Divider
          variant="middle"
          sx={{ background: "rgb(120,120,126)", margin: ".5rem 0 1.5rem 0" }}
        />
        <Box
          sx={{
            padding: 0,
            marginBottom: { xs: "0", md: "-2rem", lg: "-3rem" },
          }}
        >
          {usersPosts.length > 0 ? (
            <List sx={{ padding: 1 }}>
              {usersPosts.map((element: any) => (
                <Post key={element._id} {...element} />
              ))}
            </List>
          ) : (
            <p>No posts to display.</p>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          padding: 1,
          marginBottom: { xs: "0", md: "-2rem", lg: "-2.5rem" },
          overflow: "scroll",
        }}
      >
        <Masonry columns={{ md: 2, sm: 2, sx: 1 }} spacing={2}>
          {getUsersItems([...events, ...businesses]).map((item: any) => {
            return item.type === "event" ? (
              <EventHeader key={item._id} variant={"masonry"} event={item} />
            ) : (
              <BusinessHeader
                key={item._id}
                variant={"masonry"}
                business={item}
              />
            );
          })}
        </Masonry>
      </Box>
    </Box>
  );
};

export default User;
