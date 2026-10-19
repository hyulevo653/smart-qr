import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Typography,
  Grid,
  Chip,
  IconButton
} from "@mui/material";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    let packageInfo : any = null;
    if (user?.subscribe?.info) {
        try {
        packageInfo = JSON.parse(user.subscribe.info).appPackage;
        } catch (e) {
        console.error("Parse package info failed:", e);
        }
    }
     const endDate = user?.subscribe?.endDate
    ? new Date(user.subscribe.endDate)
    : null;
  const now = new Date();
  const daysLeft = endDate
    ? Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : null;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 4
      }}
    >
     <Card
  sx={{
    width: "100%",
    maxWidth: 1350,
    borderRadius: 4,
    boxShadow: 2,
    p: 4
  }}
>
  {/* Box chứa nội dung gọn lại */}
  <Box sx={{ maxWidth: 900, mx: "auto" }}>
    {/* Avatar + tên */}
    <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
      <Avatar
        src="https://i.pravatar.cc/150?img=5"
        sx={{ width: 100, height: 100, mb: 2 }}
      />
      <Typography variant="h6" fontWeight="bold" sx={{ color: '#1C8263',fontWeight: '700',fontSize: '20px' }}>
        {user?.fullname || 'Authgate'}
      </Typography>
    </Box>

    {/* Thông tin cá nhân */}
    <Grid container spacing={2} mb={3}>
      <Grid item xs={12}>
        <Typography color="green" fontWeight="bold">
          Thông tin cá nhân
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Họ tên</Typography>
      </Grid>
      <Grid item xs={6} sx={{ textAlign: "right" }}>
        <Typography fontWeight="500">{user?.fullname ? user.fullname : 'No Full name'}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Tên người dùng</Typography>
      </Grid>
      <Grid item xs={6} sx={{ textAlign: "right" }}>
        <Typography fontWeight="500">{user?.username}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Email</Typography>
      </Grid>
      <Grid item xs={6} sx={{ textAlign: "right" }}>
        <Typography fontWeight="500">{user?.email  ? user.email : 'No email'}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Số ĐT</Typography>
      </Grid>
      <Grid item xs={6} sx={{ textAlign: "right" }}>
        <Typography fontWeight="500">{user?.phone ? user.phone : 'No phone number'}</Typography>
      </Grid>
    </Grid>

    {/* Nút cập nhật */}
    <Box display="flex" justifyContent="center" mb={3}>
      <Button
        fullWidth
        variant="contained"
        sx={{
          bgcolor: "#00A64F",
          textTransform: "none",
          py: 1.2,
          borderRadius: 2,
          fontWeight: "bold",
          "&:hover": { bgcolor: "#009144" }
        }}
      >
        <IconButton color="inherit" sx={{ p: 0, mr: 1 }} onClick = {() => {navigate('https://customer.authgate.one/console/user/profile');}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.0399 3.02025L8.15988 10.9003C7.85988 11.2003 7.55988 11.7903 7.49988 12.2203L7.06988 15.2303C6.90988 16.3203 7.67988 17.0803 8.76988 16.9303L11.7799 16.5003C12.1999 16.4403 12.7899 16.1403 13.0999 15.8403L20.9799 7.96025C22.3399 6.60025 22.9799 5.02025 20.9799 3.02025C18.9799 1.02025 17.3999 1.66025 16.0399 3.02025Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.9099 4.15039C15.5799 6.54039 17.4499 8.41039 19.8499 9.09039" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
        </IconButton>
        Cập nhật
      </Button>
    </Box>

    {/* Gói đăng ký */}
      {/* {packageInfo && ( */}
        <Box
          sx={{
            bgcolor: "#00A64F",
            borderRadius: 3,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#fff",
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/cubes.png')",
            backgroundSize: "cover"
          }}
        >
          <Box>
            <Typography fontWeight="bold">Gói đăng ký</Typography>
            <Typography
              variant="h6"
              sx={{ mt: 1, color: "#FFC933", fontWeight: "700", fontSize: "16px" }}
            >
              {packageInfo?.name || "No package"}
            </Typography>
            <Typography variant="body2" color={"#fff"}>
              Ngày hết hạn
            </Typography>
            <Typography variant="body2" color={"#fff"}>
              {endDate ? endDate.toLocaleDateString("vi-VN") : "N/A"}
            </Typography>
          </Box>

          <Box textAlign="right">
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#fff",
                color: "#00A64F",
                mb: 1,
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#f0f0f0" }
              }}
              onClick={() => {
                navigate('/subcription');
              }}
            >
              Xem chi tiết
            </Button>
            <Typography fontWeight="bold">
              {packageInfo?.price
                ? `${packageInfo.price.toLocaleString()}đ/${packageInfo.periodUnit}`
                :    <Button
              variant="contained"
              size="small"
            >
              Liên hệ
            </Button>}
            </Typography>
            {daysLeft !== null && (
              <Chip
                label={`Còn ${daysLeft} ngày`}
                sx={{
                  bgcolor: "#fff",
                  color: "#00A64F",
                  fontWeight: "bold",
                  mt: 1
                }}
              />
            )}
          </Box>
        </Box>
      {/* )} */}
    </Box>
</Card>
    </Box>
  );
};

export default UserProfile;
