import * as React from "react";

export function PhoneFrame({
  children,
  className,
  contentClassName,
  showBottomFade = false,
}: {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  showBottomFade?: boolean;
}) {
  return (
    <div
      className={[
        // Responsive: keep the device from dominating layouts (especially on desktop),
        // while still allowing callers to override via `className`.
        "relative mx-auto w-full max-w-[320px] sm:max-w-[340px] lg:max-w-[360px]",
        // Prevent flex/grid parents from shrinking the device into “only the notch shows”.
        "shrink-0 select-none",
        className ?? "",
      ].join(" ")}
    >
      {/* device body */}
      <div className="relative rounded-[56px] p-[6.5px] bg-[linear-gradient(180deg,rgba(10,14,22,0.96),rgba(15,20,32,0.92))] shadow-[0_20px_54px_rgba(2,6,23,0.22)]">
        {/* screen */}
        <div
          className="relative rounded-[44px] overflow-hidden bg-white"
          style={{ transform: "translate3d(0,0,0)", backfaceVisibility: "hidden" }}
        >
          {/* overlays removed to prevent any tint/box artifacts */}

          {/* content */}
          {/* Aspect-driven sizing + min-height safety net to prevent “only-notch” collapse in some flex/grid layouts. */}
          <div
            className={[
              "relative z-10 w-full aspect-[9/19.5] min-h-[520px] sm:min-h-[560px] lg:min-h-[600px]",
              contentClassName ?? "",
            ].join(" ")}
          >
            <div className="absolute inset-0">{children}</div>
          </div>
        </div>

        {/* Bottom crop fade (for hero): fade the DEVICE, not the screen UI */}
        {showBottomFade && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-[-2px] h-44 z-20 bg-[linear-gradient(to_top,rgba(255,255,255,1)_0%,rgba(255,255,255,0.92)_18%,rgba(255,255,255,0.40)_48%,rgba(255,255,255,0)_100%)]"
            style={{ transform: "translate3d(0,0,0)" }}
          />
        )}

        {/* notch */}
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[10px] -translate-x-1/2 h-[21px] w-[108px] rounded-full bg-black/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
      </div>
    </div>
  );
}


