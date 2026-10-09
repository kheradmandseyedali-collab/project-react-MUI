import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "@/routing/AppRouter";
import { ToastViewport } from "@/components/ui";
import { I18nProvider } from "@/i18n";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <AppRouter />
      <ToastViewport />
    </I18nProvider>
  </React.StrictMode>,
);
