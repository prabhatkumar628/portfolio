import "./style.css"
import React, { ReactNode } from "react";
import MainBgLoop from "./(components)/MainBgLoop";
import Footer from "./(components)/Footer";
import Navbar from "./(components)/Navbar";


export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <MainBgLoop>
      <Navbar />
      {children}
      <Footer />
    </MainBgLoop>
  );
}
