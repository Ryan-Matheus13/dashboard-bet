import Image from "next/image";
import { MenuProps } from "./Menu.types";
import styles from "./Menu.module.css";

import { IconButton } from "@mui/material";
import Logo from "../../../../public/images/logo.webp";

import MenuOpen from "@mui/icons-material/MenuOpenRounded";
import MenuClose from "@mui/icons-material/CloseRounded";
import CastIcon from "@mui/icons-material/Cast";
import CasinoIcon from "@mui/icons-material/Casino";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import CampaignIcon from "@mui/icons-material/Campaign";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { IMenu } from "@/store/applicationStore/interfaces";
import { useState } from "react";

const Menu: React.FC<MenuProps> = ({ className, toggle, isOpen }) => {
  const [menus, setMenus] = useState([
    {
      name: "Streams",
      active: true,
      disabled: false,
      Icon: CastIcon,
    },
    {
      name: "Games",
      active: false,
      disabled: false,
      Icon: CasinoIcon,
    },
    {
      name: "Stories",
      active: false,
      disabled: false,
      Icon: WebStoriesIcon,
    },
    {
      name: "Notificações",
      active: false,
      disabled: false,
      Icon: CampaignIcon,
    },
    {
      name: "Banners",
      active: false,
      disabled: true,
      Icon: PermMediaIcon,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSelectMenu = (index: number) => {
    setLoading(true);
    const menuArr = menus;
    menuArr.map((item: IMenu, i: number) => {
      if (i === index) {
        item.active = true;
      } else {
        item.active = false;
      }
    });
    setMenus(menuArr);
    setTimeout(() => {
      setLoading(false);
    }, 50);
  };

  return (
    <div className={styles.menu + " " + className}>
      <IconButton>
        <Image className={styles.logo} src={Logo} alt={"Logo"} />
      </IconButton>

      <IconButton onClick={toggle} sx={{ color: "white" }}>
        {!isOpen && <MenuOpen fontSize="large" />}
        {isOpen && <MenuClose fontSize="large" />}
      </IconButton>

      {menus.map((item: IMenu, index: number) => {
        return (
          <>
            {item.active && (
              <IconButton
                key={index}
                onClick={() => {}}
                className={styles.menuItemActive}
                disabled={item.disabled}
              >
                <item.Icon />
                {isOpen && <span className={styles.menuText}>{item.name}</span>}
              </IconButton>
            )}
            {!item.active && (
              <IconButton
                key={index}
                onClick={() => handleSelectMenu(index)}
                className={styles.menuItem}
                disabled={item.disabled}
                sx={{
                  color: item.disabled ? "#555 !important" : "inherit",
                  "&.Mui-disabled": {
                    backgroundColor: "transparent",
                    color: "#555",
                  },
                }}
              >
                <item.Icon />
                {isOpen && <span className={styles.menuText}>{item.name}</span>}
              </IconButton>
            )}
          </>
        );
      })}

      {!loading && <div style={{ opacity: 0 }}>render</div>}
    </div>
  );
};

export default Menu;
