import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import { useTheme } from "./theme-provider";

const themeOptions = [
  {
    value: "system",
    label: "System",
    icon: IconDeviceDesktop,
  },
  {
    value: "light",
    label: "Light",
    icon: IconSun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: IconMoon,
  },
] as const;

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const currentOption = themeOptions.find((option) => option.value === theme) ?? themeOptions[0];
  const CurrentIcon = currentOption.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" className={cn("justify-start", className)} />}
      >
        <CurrentIcon data-icon="inline-start" />
        <span>Theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-44">
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            {themeOptions.map((option) => {
              const Icon = option.icon;

              return (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  <Icon data-icon="inline-start" />
                  {option.label}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
