import { Box, Button, Card, CardActions, CardContent, CardMedia, List, ListItem, Stack, Typography } from "@mui/material";

interface ReferenceInfoItemDTO {
  referenceId: number;
  title: string;
  description: string;
  franchiseName: string;
  rawThumbnailData: Uint8Array;
}

const ReferenceInfoItem: React.FC<{ item: ReferenceInfoItemDTO }> = ({ item }) => {
  const base64String = btoa(
    String.fromCharCode(...new Uint8Array(item.rawThumbnailData))
  );

  return (
    <Card
      sx={{ height: 400, maxWidth: 200 }}
      variant="elevation">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center">
        <CardMedia
          component='img'
          src={`data:image/jpeg;base64,${base64String}`}
          title={item.title}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {item.description}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center">
          <CardActions>
            <Button disabled={true}>Download</Button>
          </CardActions>
        </Box>
      </CardContent>
    </Card>
  );
}

const ReferencesList: React.FC<{ items: [ReferenceInfoItemDTO] }> = ({ items }) => {
  return (
    <List
      component={Stack}
      direction='row'
      sx={{ width: '100%', display: 'inline-block'}}
    >
      {items.map(i => {
        return (
          <ListItem sx={{ maxWidth: 'fit-content', float: 'left', width: '50%' }} key={i.referenceId}>
            <ReferenceInfoItem item={i} />
          </ListItem>
        )
      })}
    </List>
  );
}

export type { ReferenceInfoItemDTO as ReferenceInfoItemDTO };
export {
  ReferenceInfoItem,
  ReferencesList
}