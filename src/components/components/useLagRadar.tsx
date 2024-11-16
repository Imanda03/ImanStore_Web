import React, { useEffect, useRef } from "react";

interface LagRadarConfig {
  frames?: number;
  speed?: number;
  size?: number;
  inset?: number;
  parent?: HTMLElement;
}

interface LastState {
  rotation: number;
  now: number;
  tx: number;
  ty: number;
}

const useLagRadar = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const cleanup = lagRadar({
      frames: 90,
      speed: 0.0017,
      size: Math.min(width, height) / 3,
      inset: 3,
      parent: containerRef.current,
    });

    return cleanup;
  }, []);

  // Return both the hook's functionality and the JSX element
  return {
    radar: (
      <div
        ref={containerRef}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      />
    ),
  };
};

const lagRadar = (config: LagRadarConfig = {}) => {
  const {
    frames = 50,
    speed = 0.0017,
    size = 300,
    inset = 3,
    parent = document.body,
  } = config;

  const svgns = "http://www.w3.org/2000/svg";

  const styles = document.createTextNode(`
  .lagRadar {
      pointer-events: none;
    }
    .lagRadar-sweep > * {
      shape-rendering: crispEdges;
    }
    .lagRadar-face {
      fill: transparent;
    }
    .lagRadar-hand {
      stroke-width: 4px;
      stroke-linecap: round;
    }
  `);

  const $svg = (
    tag: string,
    props: { [key: string]: string } = {},
    children: Node[] = []
  ): SVGElement => {
    const el = document.createElementNS(svgns, tag);
    Object.keys(props).forEach((prop) => el.setAttribute(prop, props[prop]));
    children.forEach((child) => el.appendChild(child));
    return el;
  };

  const PI2 = Math.PI * 2;
  const middle = size / 2;
  const radius = middle - inset;

  const $hand = $svg("path", { class: "lagRadar-hand" });
  const $arcs = new Array(frames).fill("path").map((t) => $svg(t));
  const $root = $svg(
    "svg",
    { class: "lagRadar", height: `${size}`, width: `${size}` },
    [
      $svg("style", { type: "text/css" }, [styles]),
      $svg("g", { class: "lagRadar-sweep" }, $arcs),
      $hand,
      $svg("circle", {
        class: "lagRadar-face",
        cx: `${middle}`,
        cy: `${middle}`,
        r: `${radius}`,
      }),
    ]
  );

  parent.appendChild($root);

  let frame: number;
  let framePtr = 0;
  let last: LastState = {
    rotation: 0,
    now: Date.now(),
    tx: middle + radius,
    ty: middle,
  };

  const calcHue = (() => {
    const max_hue = 120;
    const max_ms = 1000;
    const log_f = 10;
    const mult = max_hue / Math.log(max_ms / log_f);
    return (ms_delta: number): number => {
      return (
        max_hue -
        Math.max(0, Math.min(mult * Math.log(ms_delta / log_f), max_hue))
      );
    };
  })();

  function animate() {
    const now = Date.now();
    const rdelta = Math.min(PI2 - speed, speed * (now - last.now));
    const rotation = (last.rotation + rdelta) % PI2;
    const tx = middle + radius * Math.cos(rotation);
    const ty = middle + radius * Math.sin(rotation);
    const bigArc = rdelta < Math.PI ? "0" : "1";
    const path = `M${tx} ${ty}A${radius} ${radius} 0 ${bigArc} 0 ${last.tx} ${last.ty}L${middle} ${middle}`;
    const hue = calcHue(rdelta / speed);

    $arcs[framePtr % frames].setAttribute("d", path);
    $arcs[framePtr % frames].setAttribute("fill", `hsl(${hue}, 80%, 40%)`);
    $hand.setAttribute("d", `M${middle} ${middle}L${tx} ${ty}`);
    $hand.setAttribute("stroke", `hsl(${hue}, 80%, 60%)`);

    for (let i = 0; i < frames; i++) {
      $arcs[(frames + framePtr - i) % frames].style.fillOpacity = (
        1 -
        i / frames
      ).toString();
    }

    framePtr++;
    last = {
      now,
      rotation,
      tx,
      ty,
    };

    frame = window.requestAnimationFrame(animate);
  }

  animate();

  return function destroy() {
    if (frame) {
      window.cancelAnimationFrame(frame);
    }
    $root.remove();
  };
};

export default useLagRadar;
