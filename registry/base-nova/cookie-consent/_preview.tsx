import { CookieConsent } from "./cookie-consent";

export function Preview() {
  return (
    <div className="flex w-full max-w-sm justify-start">
      <CookieConsent />
    </div>
  );
}
