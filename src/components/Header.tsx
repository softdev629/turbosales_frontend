import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import {
  ArrowDropDown,
  ArrowRight,
  Menu as MenuIcon,
} from "@mui/icons-material";

import LogoIcon from "../assets/images/logo_savvi.svg";

const navLinks = [
  {
    text: "Home",
  },
  {
    text: "Commissions",
  },
  {
    text: "Schedule",
  },
  {
    text: "My Clients",
  },
  {
    text: "Dashboard",
  },
];

const moreLinks = [
  {
    text: "Center Clients",
  },
  {
    text: "Center Settings",
  },
  {
    text: "HQ Clients",
  },
  {
    text: "HQ Centers",
  },
  {
    text: "HQ Dashboard",
  },
  {
    text: "HQ Settings",
  },
  {
    text: "Account",
  },
  {
    text: "Contact",
  },
  {
    text: "Terms",
  },
  {
    text: "Log Out",
  },
];

const langLinks = [
  { text: "English" },
  { text: "中文" },
  { text: "Français" },
  { text: "Español" },
];

const Header = () => {
  const [moreEl, setMoreEl] = useState<null | HTMLButtonElement>(null);
  const [langEl, setLangEl] = useState<null | HTMLButtonElement>(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const openMore = Boolean(moreEl);
  const openLang = Boolean(langEl);

  return (
    <>
      <AppBar
        position="static"
        sx={{ bgcolor: "white", color: "black", p: 4, boxShadow: "none" }}
      >
        <Toolbar disableGutters>
          <Box
            component="img"
            src={LogoIcon}
            alt="Logo"
            width={210}
            height={60}
            sx={{ mr: 2 }}
          />

          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            justifyContent="flex-end"
          >
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={(event: React.MouseEvent<HTMLElement>) =>
                setAnchorElNav(event.currentTarget)
              }
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navLinks.map((navLink, index) => (
                <MenuItem
                  sx={{
                    color: "black",
                    textTransform: "none",
                  }}
                  key={`nav_link_${index}`}
                >
                  {navLink.text}
                </MenuItem>
              ))}
              <MenuItem>
                <Button
                  id="more-button"
                  aria-controls={openMore ? "more-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMore ? "true" : undefined}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    setMoreEl(event?.currentTarget)
                  }
                  sx={{ color: "black", textTransform: "none" }}
                  endIcon={openMore ? <ArrowDropDown /> : <ArrowRight />}
                >
                  More
                </Button>
              </MenuItem>
              <Menu
                id="more-menu"
                anchorEl={moreEl}
                open={openMore}
                onClose={() => setMoreEl(null)}
                MenuListProps={{ "aria-labelledby": "more-button" }}
                sx={{
                  ".MuiMenu-paper": {
                    border: "1px solid #d9d9d9",
                    boxShadow: "none",
                  },
                }}
              >
                {moreLinks.map((moreLink, index) => (
                  <MenuItem
                    key={`more_link_${index}`}
                    sx={{
                      "&:hover": {
                        bgcolor: "#595959",
                        color: "white",
                        transitionDuration: "1s",
                      },
                      color: "#595959",
                    }}
                  >
                    {moreLink.text}
                  </MenuItem>
                ))}
              </Menu>
              <MenuItem>
                <Button
                  id="lang-button"
                  aria-controls={openLang ? "lang-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openLang ? "true" : undefined}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                    setLangEl(event?.currentTarget)
                  }
                  sx={{ color: "black" }}
                  endIcon={openLang ? <ArrowDropDown /> : <ArrowRight />}
                >
                  ENG / 中文
                </Button>
              </MenuItem>
              <Menu
                id="lang-menu"
                anchorEl={langEl}
                open={openLang}
                onClose={() => setLangEl(null)}
                MenuListProps={{ "aria-labelledby": "lang-button" }}
                sx={{
                  ".MuiMenu-paper": {
                    border: "1px solid #d9d9d9",
                    boxShadow: "none",
                  },
                }}
              >
                {langLinks.map((moreLink, index) => (
                  <MenuItem
                    key={`lang_link_${index}`}
                    sx={{
                      "&:hover": {
                        bgcolor: "#595959",
                        color: "white",
                        transitionDuration: "1s",
                      },
                      my: 1,
                      borderRadius: 1,
                      py: 1,
                      width: 120,
                      color: "#595959",
                    }}
                  >
                    {moreLink.text}
                  </MenuItem>
                ))}
              </Menu>
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" } }} flexGrow={1} />
          <Box sx={{ display: { xs: "none", md: "flex" } }} gap={3}>
            {navLinks.map((navLink, index) => (
              <Button
                sx={{
                  color: "black",
                  textTransform: "none",
                }}
                key={`nav_link_${index}`}
              >
                {navLink.text}
              </Button>
            ))}
            <Button
              id="more-button"
              aria-controls={openMore ? "more-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMore ? "true" : undefined}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                setMoreEl(event?.currentTarget)
              }
              sx={{ color: "black", textTransform: "none" }}
              endIcon={openMore ? <ArrowDropDown /> : <ArrowRight />}
            >
              More
            </Button>
            <Menu
              id="more-menu"
              anchorEl={moreEl}
              open={openMore}
              onClose={() => setMoreEl(null)}
              MenuListProps={{ "aria-labelledby": "more-button" }}
              sx={{
                ".MuiMenu-paper": {
                  border: "1px solid #d9d9d9",
                  boxShadow: "none",
                },
              }}
            >
              {moreLinks.map((moreLink, index) => (
                <MenuItem
                  key={`more_link_${index}`}
                  sx={{
                    "&:hover": {
                      bgcolor: "#595959",
                      color: "white",
                      transitionDuration: "1s",
                    },
                    color: "#595959",
                  }}
                >
                  {moreLink.text}
                </MenuItem>
              ))}
            </Menu>
            <Button
              id="lang-button"
              aria-controls={openLang ? "lang-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openLang ? "true" : undefined}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                setLangEl(event?.currentTarget)
              }
              sx={{ color: "black" }}
              endIcon={openLang ? <ArrowDropDown /> : <ArrowRight />}
            >
              ENG / 中文
            </Button>
            <Menu
              id="lang-menu"
              anchorEl={langEl}
              open={openLang}
              onClose={() => setLangEl(null)}
              MenuListProps={{ "aria-labelledby": "lang-button" }}
              sx={{
                ".MuiMenu-paper": {
                  border: "1px solid #d9d9d9",
                  boxShadow: "none",
                },
              }}
            >
              {langLinks.map((moreLink, index) => (
                <MenuItem
                  key={`lang_link_${index}`}
                  sx={{
                    "&:hover": {
                      bgcolor: "#595959",
                      color: "white",
                      transitionDuration: "1s",
                    },
                    my: 1,
                    borderRadius: 1,
                    py: 1,
                    width: 120,
                    color: "#595959",
                  }}
                >
                  {moreLink.text}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
