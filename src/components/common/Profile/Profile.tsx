import React, { useState } from "react";
import { ProfileProps } from "./Profile.types";

import styles from "./Profile.module.css";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import ArrowDropDown from "@mui/icons-material/ArrowDropDownRounded";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { destroySection } from "@/store/applicationStore/actions";
import StorageUtils from "@/utils/utils.helper";
import { useRouter } from "next/router";

const Profile: React.FC<ProfileProps> = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    router.push("/auth/login");
    dispatch(destroySection());
    StorageUtils.deleteDataJwtToken();
  };

  return (
    <div className={styles.profileContainer}>
      <IconButton
        onClick={handleMenuOpen}
        className={styles.avatarButton}
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar src={"../../../../public/images/user.jpg"} />
        <div className={styles.arrowDownIcon}>
          <ArrowDropDown fontSize="large" />
        </div>
      </IconButton>

      {/* Menu que aparece ao clicar */}
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </div>
  );
};

export default Profile;
