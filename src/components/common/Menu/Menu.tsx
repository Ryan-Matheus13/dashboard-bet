/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { MenuProps } from "./Menu.types";
import styles from "./Menu.module.css";

import { IconButton } from "@mui/material";
import Logo from "../../../../public/images/logo.webp";

import MenuOpen from "@mui/icons-material/MenuOpenRounded";
import MenuClose from "@mui/icons-material/CloseRounded";

import { IMenu } from "@/store/applicationStore/interfaces";
import { useAppSelector } from "@/store/hooks/useAppSelector";
import { useAppDispatch } from "@/store/hooks/useAppDispatch";
import { setMenu } from "@/store/applicationStore/actions";
import { useRouter } from "next/router";

import CastIcon from "@mui/icons-material/Cast";
import CasinoIcon from "@mui/icons-material/Casino";
import WebStoriesIcon from "@mui/icons-material/WebStories";
import CampaignIcon from "@mui/icons-material/Campaign";
import PermMediaIcon from "@mui/icons-material/PermMedia";

const IconMap: any = {
  CastIcon: <CastIcon />,
  CasinoIcon: <CasinoIcon />,
  WebStoriesIcon: <WebStoriesIcon />,
  CampaignIcon: <CampaignIcon />,
  PermMediaIcon: <PermMediaIcon />,
};

const Menu: React.FC<MenuProps> = ({ className, toggle, isOpen }) => {
  const router = useRouter();
  const { menu } = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  const handleSelectMenu = (index: number, to: string) => {
    dispatch(setMenu(index));
    router.push(to);
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

      {menu.data.map((item: IMenu, index: number) => {
        return (
          <div key={index} style={{ width: "100%" }} title={item.name}>
            {item.active && (
              <IconButton
                key={index}
                onClick={() => {}}
                className={styles.menuItemActive}
                disabled={item.disabled}
              >
                {IconMap[item.Icon]}
                {isOpen && <span className={styles.menuText}>{item.name}</span>}
              </IconButton>
            )}
            {!item.active && (
              <IconButton
                key={index}
                onClick={() => handleSelectMenu(index, item.to)}
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
                {IconMap[item.Icon]}
                {isOpen && <span className={styles.menuText}>{item.name}</span>}
              </IconButton>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
