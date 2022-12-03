import { useContext, useState, useRef } from "react";
import PostContext from "../../context/postContext";
import convertImage from "../../utils/imageConverter";
import { Post } from "../../utils/interfaces";
import { Cancel, EmojiEmotions, PermMedia, Room } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Divider,
  FormLabel,
  IconButton,
  Input,
  TextField,
} from "@mui/material";

const Share = () => {
  const { onAddPost } = useContext(PostContext);
  const [file, setFile] = useState<File | null>(null);
  const formRef = useRef<any>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const postData: Post = {
      description: ("" + data.get("postShareDescription")).trim(),
    };

    if (file) {
      const convertedFile = await convertImage(file);
      postData.file = convertedFile;
    }

    try {
      onAddPost({ postData });
      setFile(null);
      formRef.current?.reset();
    } catch (err) {}
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "10px",
      }}
    >
      <Box
        component="form"
        ref={formRef}
        onSubmit={handleSubmit}
        sx={{
          padding: "1rem 1.5rem",
          borderRadius: "25px",
          background: "rgb(53,51,64)",
          WebkitBoxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
          boxShadow: "0px 0px 16px -8px rgba(0, 0, 0, 0.68)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => alert("avatar")} sx={{ p: 0 }}>
            <Avatar
              alt="User avatar"
              src={"avatar"}
              sx={{
                height: { xs: "2rem", md: "2.5rem" },
                width: { xs: "2rem", md: "2.5rem" },
                marginRight: "10px",
              }}
            />
          </IconButton>
          <TextField
            placeholder="What's in your mind?"
            variant="standard"
            multiline={true}
            size="small"
            margin="dense"
            maxRows={3}
            InputProps={{ disableUnderline: true }}
            inputProps={{ maxLength: 800, style: { color: "lightgrey" } }}
            required
            fullWidth
            id="postShareDescription"
            name="postShareDescription"
            autoComplete="postShareDescription"
            autoFocus
          />
        </Box>
        {file && (
          <Box sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              src={URL.createObjectURL(file)}
              sx={{
                width: "100%",
                height: "250px",
                borderRadius: "10px",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
              alt={"Post image"}
            />
            <Cancel
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                opacity: "0.8",
                background: "white",
                borderRadius: "50%",
              }}
              onClick={() => setFile(null)}
            />
          </Box>
        )}
        <Divider
          variant="middle"
          sx={{ background: "rgb(120,120,126)", margin: "1rem 0" }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              marginLeft: "0.5rem",
              marginRight: "1rem",
              color: "grey",
              flexWrap: "wrap",
            }}
          >
            <FormLabel
              htmlFor="file"
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "0.5rem",
                marginBottom: "0.5rem",
                cursor: "pointer",
                color: "inherit",
              }}
            >
              <PermMedia
                htmlColor="tomato"
                sx={{ fontSize: "1.2rem", marginRight: "0.5rem" }}
              />
              <Box
                component="span"
                sx={{ fontSize: "0.9rem", fontWeight: "500" }}
              >
                Photo
              </Box>
              <Input
                type="file"
                inputProps={{ accept: ".png,.jpeg,.jpg,.webp" }}
                sx={{ display: "none" }}
                id="file"
                onChange={(e: any) => setFile(e.target.files[0])}
              />
            </FormLabel>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
                cursor: "pointer",
                marginBottom: "0.5rem",
              }}
            >
              <Room
                htmlColor="green"
                sx={{ fontSize: "1.2rem", marginRight: "0.3rem" }}
              />
              <Box
                component="span"
                sx={{ fontSize: "14px", fontWeight: "500" }}
              >
                Location
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
                cursor: "pointer",
                marginBottom: "0.5rem",
              }}
            >
              <EmojiEmotions
                htmlColor="goldenrod"
                sx={{ fontSize: "1.2rem", marginRight: "0.3rem" }}
              />
              <Box
                component="span"
                sx={{ fontSize: "14px", fontWeight: "500" }}
              >
                Feelings
              </Box>
            </Box>
          </Box>
          <Button
            type="submit"
            sx={{
              fontSize: "0.8rem",
              border: "none",
              padding: "0.2rem",
              borderRadius: "5px",
              backgroundColor: "grey",
              fontWeight: "500",
              marginRight: "0.5rem",
              cursor: "pointer",
              color: "white",
            }}
          >
            Share
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Share;