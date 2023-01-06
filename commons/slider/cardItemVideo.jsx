import { Box, IconButton, Modal } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";
import { useState } from "react";

const EmbedVideo = ({ onClose, open, embedId }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal onClose={handleClose} open={open}>
      <Box
        sx={{
          width: { xs: "90vw" },
          height: { xs: "50vh" },
          transform: "translate(-50%, -50%)",
        }}
        position="absolute"
        top="50%"
        left="50%"
      >
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${embedId}?enablejsapi=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </Box>
    </Modal>
  );
};

EmbedVideo.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function MediaCardVideo({ url }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      width="480px"
      height="360px"
      minWidth={480}
      minHeight={360}
      justifyContent="center"
      sx={{
        backgroundImage: `url("https://i.ytimg.com/vi/${url}/hqdefault.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      <IconButton
        sx={{ color: grey[500], opacity: 0.5, mt: 5, ml: 5 }}
        onClick={handleClickOpen}
      >
        <PlayCircleOutlineIcon sx={{ width: "380px", height: "260px" }} />
      </IconButton>
      <EmbedVideo open={open} onClose={handleClose} embedId={url} />
    </Box>
  );
}
