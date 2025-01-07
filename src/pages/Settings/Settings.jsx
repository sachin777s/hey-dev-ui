import React from "react";
import SettingsNavbar from "./SettingsNavbar";
import ThemeChange from "./components/ThemeChanger";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/react";
import PasswordSetting from "./components/PasswordSetting";
import DangerousZone from "./components/DangerousZone";

const Settings = () => {
  return (
    <section>
      <SettingsNavbar />
      <div className="px-2 sm:px-4">
        {/* Theme Setting */}
        <div className="mt-4">
          <h1 className="text-xl font-semibold">Theme</h1>
          <div className="mt-4">
            <ThemeChange />
          </div>
        </div>

        {/* Password Setting */}
        <PasswordSetting />

        {/* Dangerous Zone */}
        <DangerousZone />
      </div>
    </section>
  );
};

export default Settings;
