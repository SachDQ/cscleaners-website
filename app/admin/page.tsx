import AdminClient from "./AdminClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · Leads",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  return <AdminClient />;
}
