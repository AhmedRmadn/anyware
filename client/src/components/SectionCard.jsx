import { Card, CardContent, Typography, Box, Skeleton } from "@mui/material";

const SectionCard = ({ icon: Icon, title, items, loading, renderItem }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Icon sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant="h6">{title}</Typography>
      </Box>
      {loading ? (
        [...Array(3)].map((_, i) => (
          <Skeleton key={i} variant="rectangular" height={80} sx={{ mb: 2 }} />
        ))
      ) : items.length ? (
        items.map(renderItem)
      ) : (
        <Typography align="center" color="text.secondary">
          No data
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default SectionCard;
