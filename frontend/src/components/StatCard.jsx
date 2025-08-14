import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Skeleton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const StatCard = ({ icon: Icon, value, label, loading, link, gradient }) => {
  return (
    <Card sx={{ height: "100%", background: gradient, color: "white" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Icon sx={{ fontSize: 40, mr: 2 }} />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {loading ? <Skeleton width={60} /> : value}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              {label}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{
            color: "white",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
          }}
          component={Link}
          to={link}
        >
          View All
        </Button>
      </CardActions>
    </Card>
  );
};

export default StatCard;
