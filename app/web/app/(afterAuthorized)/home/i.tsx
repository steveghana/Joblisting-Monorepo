"use client";
import { Metadata } from "next";
import Image from "next/image";
import ProtectedRoute from "@/components/auth/requireAuth";
// import { Layout } from "@/components/layout/layout";
// import { Content } from "@/components/home/content";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

function DashboardPage() {
  return <>{/* <Layout></Layout> */}</>;
}
export default ProtectedRoute(DashboardPage, ["admin"]);
