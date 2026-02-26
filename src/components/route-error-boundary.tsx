import React from "react";
import { Link as RouteLink } from "react-router-dom";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

type Props = {
  resetKey: string;
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  errorMessage?: string;
};

export class RouteErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: unknown): State {
    const msg =
      err && typeof err === "object" && "message" in err
        ? String((err as any).message)
        : undefined;
    return { hasError: true, errorMessage: msg };
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      // Reset on navigation so users never get "stuck" on the fallback.
      this.setState({ hasError: false, errorMessage: undefined });
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-[760px] rounded-[28px] border border-slate-200/70 bg-white/75 backdrop-blur-[12px] shadow-[0_30px_90px_rgba(2,6,23,0.10)] overflow-hidden">
          <div className="p-7 sm:p-10">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-[18px] border border-blue-600/18 bg-blue-600/8 grid place-items-center text-blue-700 shrink-0">
                <Icon icon="lucide:alert-triangle" width={20} height={20} style={{ strokeWidth: 1.6 }} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-slate-500">
                  SAFE MODE
                </div>
                <div className="mt-2 text-[18px] sm:text-[20px] font-bold tracking-[-0.03em] text-[var(--ink)]">
                  Something didn’t load correctly.
                </div>
                <div className="mt-3 text-[13.5px] leading-relaxed text-slate-600">
                  This is recoverable. Use the buttons below to refresh the experience.
                </div>
                {this.state.errorMessage ? (
                  <div className="mt-4 rounded-[16px] border border-slate-200/70 bg-slate-50/70 px-4 py-3 text-[12px] font-mono text-slate-600 overflow-auto">
                    {this.state.errorMessage}
                  </div>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    color="primary"
                    className="nav-btn-base btn-s-tier btn-s-tier-primary btn-arrow-lead !h-[40px] !px-5 text-[12.5px] font-semibold"
                    startContent={<Icon icon="lucide:refresh-cw" width={16} height={16} style={{ strokeWidth: 1.6 }} />}
                    onClick={() => window.location.reload()}
                  >
                    Reload
                  </Button>
                  <Button
                    as={RouteLink as any}
                    to="/"
                    variant="flat"
                    className="nav-btn-base !h-[40px] !px-5 text-[12.5px] font-semibold bg-slate-100 text-slate-900 hover:bg-slate-200"
                    startContent={<Icon icon="lucide:home" width={16} height={16} style={{ strokeWidth: 1.6 }} />}
                  >
                    Back to home
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

