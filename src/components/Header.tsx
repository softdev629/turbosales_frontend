import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
  Container,
} from "@mui/material";
import {
  ArrowDropDown,
  ArrowRight,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import LogoIcon from "../assets/images/logo_xavvi.svg";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useLogoutUserMutation } from "../redux/api/authApi";
import { logout } from "../redux/features/userSlice";

const Header = () => {
  const { t, i18n } = useTranslation();

  const [moreEl, setMoreEl] = useState<null | HTMLButtonElement>(null);
  const [langEl, setLangEl] = useState<null | HTMLButtonElement>(null);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const openMore = Boolean(moreEl);
  const openLang = Boolean(langEl);
  const user = useAppSelector((state) => state.userState.user);
  const dispatch = useAppDispatch();
  const [logoutUser, logoutState] = useLogoutUserMutation();

  const navigate = useNavigate();

  const navLinks = [
    {
      text: t("header.home"),
      to: "/",
      restrict: ["sales", "manager"],
    },
    {
      text: t("header.commissions"),
      to: "/commissions",
      restrict: ["instructor", "sales", "manager"],
    },
    {
      text: t("header.schedule"),
      to: "/schedule",
      restrict: ["instructor", "sales", "manager"],
    },
    {
      text: t("header.my_clients"),
      to: "/my_clients",
      restrict: ["sales", "manager"],
    },
    {
      text: t("header.dashboard"),
      to: "/dashboard",
      restrict: ["manager"],
    },
  ];

  const moreLinks = [
    {
      text: t("header.more_menu.center_clients"),
      to: "/center_clients",
      restrict: ["sales", "manager"],
    },
    {
      text: t("header.more_menu.center_settings"),
      to: "/center_settings",
      restrict: ["manager"],
    },
    {
      text: "HQ Clients",
      to: "/admin/hq_clients",
      restrict: ["admin"],
    },
    {
      text: "HQ Centers",
      to: "/admin/hq_centers",
      restrict: ["admin"],
    },
    {
      text: "HQ Dashboard",
      to: "/admin/hq_dashboard",
      restrict: ["admin"],
    },
    {
      text: "HQ Settings",
      to: "/admin/hq_settings",
      restrict: ["admin"],
    },
    {
      text: t("header.more_menu.account"),
      to: "/account",
      restrict: ["instructor", "sales", "manager"],
    },
    {
      text: t("header.more_menu.contact"),
      to: "/contact",
      restrict: ["instructor", "sales", "manager"],
    },
    {
      text: t("header.more_menu.terms"),
      to: "/terms",
      restrict: ["instructor", "sales", "manager", "admin"],
    },
    {
      text: t("header.more_menu.logout"),
      to: "/",
      restrict: ["instructor", "sales", "manager", "admin"],
    },
  ];

  const langLinks = [
    { text: "English", code: "en" },
    { text: "中文", code: "ch" },
    { text: "Français", code: "fr" },
    { text: "Español", code: "es" },
  ];

  useEffect(() => {
    if (logoutState.isSuccess) {
      dispatch(logout());
      navigate("/login");
    }
    if (logoutState.isError) {
      if (Array.isArray((logoutState.error as any).data.error))
        (logoutState.error as any).data.error.forEach((el: any) =>
          toast.error(el.message)
        );
      else toast.error((logoutState.error as any).data.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoutState]);

  return (
    <>
      <Container maxWidth="xl" sx={{ zIndex: 2, position: "fixed" }}>
        <AppBar
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
                {user &&
                  navLinks.map(
                    (navLink, index) =>
                      navLink.restrict.includes(user?.role as string) && (
                        <MenuItem
                          sx={{
                            color: "black",
                            textTransform: "none",
                          }}
                          key={`nav_link_${index}`}
                          onClick={() => {
                            navigate(navLink.to);
                            setAnchorElNav(null);
                          }}
                        >
                          {navLink.text}
                        </MenuItem>
                      )
                  )}
                {user && (
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
                      {t("header.more")}
                    </Button>
                  </MenuItem>
                )}
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
                  {user &&
                    moreLinks.map(
                      (moreLink, index) =>
                        moreLink.restrict.includes(user?.role as string) && (
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
                            onClick={() => {
                              setMoreEl(null);
                              if (moreLink.text !== "Log Out")
                                navigate(moreLink.to);
                              else logoutUser();
                            }}
                          >
                            {moreLink.text}
                          </MenuItem>
                        )
                    )}
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
                  {langLinks.map((langLink, index) => (
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
                      {langLink.text}
                    </MenuItem>
                  ))}
                </Menu>
              </Menu>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" } }} flexGrow={1} />
            <Box sx={{ display: { xs: "none", md: "flex" } }} gap={3}>
              {user &&
                navLinks.map(
                  (navLink, index) =>
                    navLink.restrict.includes(user?.role as string) && (
                      <Button
                        sx={{
                          color: "black",
                          textTransform: "none",
                        }}
                        key={`nav_link_${index}`}
                        onClick={() => navigate(navLink.to)}
                      >
                        {navLink.text}
                      </Button>
                    )
                )}
              {user && (
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
                  {t("header.more")}
                </Button>
              )}
              {user && (
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
                  {moreLinks.map(
                    (moreLink, index) =>
                      moreLink.restrict.includes(user?.role as string) && (
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
                          onClick={() => {
                            setMoreEl(null);
                            if (moreLink.text !== t("header.more_menu.logout"))
                              navigate(moreLink.to);
                            else logoutUser();
                          }}
                        >
                          {moreLink.text}
                        </MenuItem>
                      )
                  )}
                </Menu>
              )}

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
                    onClick={() => {
                      i18n.changeLanguage(moreLink.code);
                    }}
                  >
                    {moreLink.text}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    </>
  );
};

export default Header;
