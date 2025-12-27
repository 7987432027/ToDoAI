"use client";
import {useState, useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";

import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
   useEffect(() => {
    setMounted(true);
  }, []);
   if (!mounted) return null; // ⬅️ KEY LINE

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LEFT SIDE - LOGO */}
        <Typography variant="h6" component="div">
          <Link href="/" style={{ color: "white", textDecoration: "none" }}>
            TodoAI
          </Link>
        </Typography>

        {/* RIGHT SIDE - NAV LINKS */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} href="/">
            Home
          </Button>

          {session && (
            <Button color="inherit" component={Link} href="/chat">
              AI Chat
            </Button>
          )}

          {!session && status !== "loading" && (
            <>
              <Button color="inherit" component={Link} href="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} href="/signup">
                Signup
              </Button>
            </>
          )}

          {session && (
            <Button color="inherit" onClick={() => signOut()}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
