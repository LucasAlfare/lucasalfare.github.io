import { useEffect, useState } from "react";
import { ReferenceInfoItemDTO, ReferencesList } from "./ReferencesList";
import { Button, Stack, TextField } from "@mui/material";

function App() {

  const [data, setData] = useState<[ReferenceInfoItemDTO]>();
  const [loading, setLoading] = useState(true);

  // TODO: refactor requesting if/when code grows
  useEffect(() => {
    // fetch("http://localhost:80/images")
    fetch("https://fl-refs.onrender.com/images")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data) {
    return (
      <Stack>
        <Stack alignContent='center' direction='row'>
          <TextField
            className="max-w-96"
            label="Search term"
            type="search"
            variant="filled"
            disabled={true}
          />
          <Button disabled={true}>Buscar</Button>
        </Stack>
        <ReferencesList items={data}></ReferencesList>
      </Stack>
    )
  }
}

export default App
