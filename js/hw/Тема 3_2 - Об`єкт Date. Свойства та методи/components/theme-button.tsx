import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

export default function ThemeButton() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      className="m-2"
      size={"icon"}
      onClick={() =>
        resolvedTheme === "dark" ? setTheme("light") : setTheme("dark")
      }
    >
      <MoonIcon className="absolute scale-100 dark:scale-0" />
      <SunIcon className="absolute scale-0 dark:scale-100" />
    </Button>
  );
}
