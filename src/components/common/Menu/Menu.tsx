import Image from "next/image";
import { MenuProps } from "./Menu.types";
import styles from "./Menu.module.css";

import { IconButton } from "@mui/material";
import Logo from "../../../../public/images/logo.svg";

import MenuOpen from "@mui/icons-material/MenuOpenRounded";
import MenuClose from "@mui/icons-material/CloseRounded";
import LayersIcon from "@mui/icons-material/Layers";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ArchiveIcon from "@mui/icons-material/Archive";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";

const Menu: React.FC<MenuProps> = ({ className, toggle, isOpen }) => {
  return (
    <div className={styles.menu + " " + className}>
      <IconButton sx={{ color: "#00CFC1", fontSize: "48px" }}>
        <Image className={styles.logo} src={Logo} alt={"Logo"} />
      </IconButton>

      <IconButton onClick={toggle} sx={{ color: "white" }}>
        {!isOpen && <MenuOpen fontSize="large" />}
        {isOpen && <MenuClose fontSize="large" />}
      </IconButton>

      <IconButton className={styles.menuItem}>
        <LayersIcon />
        {isOpen && <span className={styles.menuText}>Ativos</span>}
      </IconButton>

      <IconButton className={styles.menuItem}>
        <SyncAltIcon />
        {isOpen && <span className={styles.menuText}>Movimentações</span>}
      </IconButton>

      <hr className={styles.menuSeparator} />

      <IconButton className={styles.menuItem}>
        <InsertChartIcon />
        {isOpen && <span className={styles.menuText}>Depreciação</span>}
      </IconButton>

      <IconButton className={styles.menuItem}>
        <ArchiveIcon />
        {isOpen && <span className={styles.menuText}>Inventário</span>}
      </IconButton>

      <IconButton className={styles.menuItem}>
        <DescriptionIcon />
        {isOpen && <span className={styles.menuText}>Relatórios</span>}
      </IconButton>

      <hr className={styles.menuSeparator} />

      <IconButton className={styles.menuItem}>
        <AddIcon />
        {isOpen && <span className={styles.menuText}>Cadastrar</span>}
      </IconButton>
    </div>
  );
};

export default Menu;
