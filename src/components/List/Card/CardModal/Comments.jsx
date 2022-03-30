import { Box, Card, CardContent, CardHeader, Divider, Icon, List, ListItem, Stack, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import React from "react";
import { useSelector } from "react-redux";

const Comments = () => {
  const comments = useSelector((state) => state.comments);

  return (
    <Box>
      <Stack direction="row" gap={1} my={2} alignItems="center">
        <Icon>
          <CommentIcon />
        </Icon>
        <Typography
          variant="body1"
          component="div"
          sx={{ fontWeight: 600, mr: "auto" }}
        >
          Comments
        </Typography>
      </Stack>
      <List>
        {comments &&
          comments.map((comment) => (
            <ListItem key={comment.id}>
              <Card sx={{border: "1px solid rgba(0,0,0,0.3)", borderRadius: "4px 16px 16px 4px"}}>
                <CardHeader title={comment.author.username} titleTypographyProps={{fontSize: 20}} sx={{p: 2, mb: 0}} />
                <Divider />
                <CardContent>
                  <Typography variant="body1" component="div">
                    {comment.message}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

export default Comments;
