// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

import { registryItems } from "@/lib/registry/catalog";

import {
  getInstallCommand,
  getPackageManagerPreference,
  InstallCommand,
  packageManagers,
  setPackageManagerPreference,
  type PackageManager,
} from "./install-command";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.restoreAllMocks();
});

describe("install command", () => {
  test.each([
    ["npm", "npx shadcn@latest add https://ui.jarv.is/r/tipover.json"],
    ["pnpm", "pnpm dlx shadcn@latest add https://ui.jarv.is/r/tipover.json"],
    ["bun", "bunx --bun shadcn@latest add https://ui.jarv.is/r/tipover.json"],
    ["yarn", "yarn dlx shadcn@latest add https://ui.jarv.is/r/tipover.json"],
  ] satisfies [PackageManager, string][])("generates the %s command", (packageManager, command) => {
    expect(getInstallCommand("tipover", packageManager)).toBe(command);
  });

  test("defaults to npm before a preference is saved", () => {
    const item = getTestItem();

    render(<InstallCommand item={item} />);

    expect(getPackageManagerPreference()).toBe("npm");
    expect(screen.getByText(getInstallCommand(item.name, "npm"))).toBeTruthy();
  });

  test("uses a saved package manager preference", () => {
    const item = getTestItem();

    setPackageManagerPreference("pnpm");
    render(<InstallCommand item={item} />);

    expect(getPackageManagerPreference()).toBe("pnpm");
    expect(screen.getByText(getInstallCommand(item.name, "pnpm"))).toBeTruthy();
  });

  test("syncs package manager changes across mounted install boxes", () => {
    const item = getTestItem();

    render(
      <>
        <InstallCommand item={item} />
        <InstallCommand item={item} />
      </>,
    );

    expect(screen.getAllByText(getInstallCommand(item.name, "npm"))).toHaveLength(2);

    act(() => setPackageManagerPreference("bun"));

    expect(screen.getAllByText(getInstallCommand(item.name, "bun"))).toHaveLength(2);
  });

  test("copies the currently selected command", async () => {
    const item = getTestItem();
    const writeText = vi.fn<Clipboard["writeText"]>().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    setPackageManagerPreference("yarn");
    render(<InstallCommand item={item} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy install command" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(getInstallCommand(item.name, "yarn"));
    });
  });

  test("keeps every package manager option represented", () => {
    expect(packageManagers.map((option) => option.value)).toEqual(["npm", "pnpm", "bun", "yarn"]);
  });
});

function getTestItem() {
  const item = registryItems.find((registryItem) => registryItem.name === "tipover");

  if (!item) {
    throw new Error("Missing tipover registry item");
  }

  return item;
}
