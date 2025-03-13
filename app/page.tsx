import { Stack } from "@mui/material";
import type { Metadata } from "next";

export default function IndexPage() {
  return <Stack />;
}

export const metadata: Metadata = {
  title: "Chuck's jokes for CGI",
  icons: {
    icon: "/favicon.ico",
  },
};
