import React from "react";
import { App } from "./App";
import "./index.css";

import { createRoot } from "react-dom/client";

// Render your React component instead
const root = createRoot(document.getElementById("app")!);
root.render(<App />);
