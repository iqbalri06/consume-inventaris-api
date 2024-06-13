import React from "react";
import Navbar from "./Navbar";

export default function Case({ children }) {
    return (
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 min-h-screen">
             <Navbar />
             <section className="p-8">{children}</section>
        </div>
    );
}
