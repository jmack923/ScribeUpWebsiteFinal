import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import Home from "../pages/home";
import Solution from "../pages/solution";
import WhoWeServeBanks from "../pages/who-we-serve/banks";
import WhoWeServeCreditUnions from "../pages/who-we-serve/credit-unions";
import WhoWeServeFintechs from "../pages/who-we-serve/fintechs";
import Developer from "../pages/developer";
import About from "../pages/about";
import PrivacyPolicy from "../pages/privacy";
import Terms from "../pages/terms";
import TrustCenter from "../pages/trust-center";
import Security from "../pages/security";
import Soc2 from "../pages/soc2";
import Status from "../pages/status";
import Credits from "../pages/credits";

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  React.useLayoutEffect(() => {
    let raf = 0;
    let topSettledTimer: number | undefined;

    // Smooth scrolling here fights pinned/sticky sections + ScrollTrigger in some browsers.
    // Keep route transitions deterministic.
    if (!hash || hash.length <= 1) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      // Some browsers (notably Safari) can briefly restore old scroll position on first paint.
      // Re-assert top after layout settles to avoid "content starts way down" glitches.
      raf = window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      });
      topSettledTimer = window.setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }, 80);
      return () => {
        if (raf) window.cancelAnimationFrame(raf);
        if (typeof topSettledTimer === "number") window.clearTimeout(topSettledTimer);
      };
    }

    if (typeof topSettledTimer === "number") {
      window.clearTimeout(topSettledTimer);
    }
    if (raf) {
      window.cancelAnimationFrame(raf);
    }

    let hashRaf = 0;
    let tries = 0;
    const maxTries = 40; // ~40 frames (~650ms) is enough for lazy mounts in this app

    // Support hash anchors for section deep-links (robust across lazy routes + AnimatePresence).
    const id = hash.slice(1);
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start", inline: "nearest", behavior: "auto" });
        return;
      }
      tries += 1;
      if (tries >= maxTries) return;
      hashRaf = window.requestAnimationFrame(tryScroll);
    };

    // Kick off after a tick so location has settled.
    const kickoff = window.setTimeout(() => {
      hashRaf = window.requestAnimationFrame(tryScroll);
    }, 0);

    return () => {
      if (hashRaf) window.cancelAnimationFrame(hashRaf);
      window.clearTimeout(kickoff);
    };
  }, [pathname, hash]);
  return null;
}

export function Routes() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/solution" component={Solution} />
        <Route exact path="/who-we-serve" render={() => <Redirect to="/who-we-serve/banks" />} />
        <Route exact path="/who-we-serve/banks" component={WhoWeServeBanks} />
        <Route exact path="/who-we-serve/credit-unions" component={WhoWeServeCreditUnions} />
        <Route exact path="/who-we-serve/fintechs" component={WhoWeServeFintechs} />
        <Route exact path="/credits" component={Credits} />
        <Route exact path="/developer" component={Developer} />
        <Route exact path="/about" component={About} />
        <Route exact path="/privacy" component={PrivacyPolicy} />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/trust-center" component={TrustCenter} />
        <Route exact path="/security" component={Security} />
        <Route exact path="/soc2" component={Soc2} />
        <Route exact path="/status" component={Status} />
        <Route exact path="/company" render={() => <Redirect to="/about" />} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}