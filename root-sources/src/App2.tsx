import { Divider, Stack } from "@mui/material";
import Login from "./components/Login";
import Upload from "./components/Upload";
import ImageGallery from "./components/ImageGallery";
import ClearButton from "./components/ClearButton";

function App2() {
  return (
    <div>
      <Stack>
        <ImageGallery />

        <Divider />

        <Stack direction="row">
          <Login />
          <Upload />
        </Stack>
        <ClearButton />
      </Stack>
    </div>
  )
}

export default App2;