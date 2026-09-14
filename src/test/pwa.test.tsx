import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import OfflineIndicator from "@/components/pwa/OfflineIndicator";
import SafeImage from "@/components/ui/SafeImage";


describe("PWA and Offline Support", () => {
  beforeEach(() => {
    Object.defineProperty(navigator, "onLine", {
      configurable: true,
      value: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, "onLine", {
      configurable: true,
      value: true,
    });
  });

  it("OfflineIndicator renders nothing when online initially", () => {
    const { container } = render(<OfflineIndicator />);
    expect(container.firstChild).toBeNull();
  });

  it("OfflineIndicator displays offline notification when offline event fires", () => {
    render(<OfflineIndicator />);
    act(() => {
      window.dispatchEvent(new Event("offline"));
    });
    expect(screen.getByText(/Oflayn rejim faol/i)).toBeInTheDocument();
    expect(screen.getByText(/Barcha retseptlar/i)).toBeInTheDocument();
  });

  it("SafeImage renders fallback placeholder when error occurs", () => {
    render(
      <SafeImage
        src="https://example.com/broken-image.jpg"
        alt="Osh"
        fallbackText="Osh (Palov)"
      />
    );
    const img = screen.getByRole("img");
    act(() => {
      img.dispatchEvent(new Event("error"));
    });
    expect(screen.getByText("Osh (Palov)")).toBeInTheDocument();
  });
});
