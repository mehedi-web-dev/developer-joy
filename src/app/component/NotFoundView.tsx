import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Compass,
  FileQuestion,
  Home,
  LockKeyhole,
  MousePointer2,
  RotateCw,
} from "lucide-react";

const requestedPath = "/missing-page";

export default function NotFoundView() {
  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative flex min-h-[calc(100vh-64px)] w-full items-center overflow-hidden bg-transparent"
    >
      {/* Local glow accents, layered over the shared animated background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-purple-500/10 blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <div className="not-found-rise flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Error 404 · Route not found
              </span>
            </div>

            <p
              aria-hidden="true"
              className="not-found-rise mt-7 flex items-baseline justify-center font-mono text-[5.5rem] font-extrabold leading-none tracking-[-0.08em] sm:text-[7rem] lg:justify-start lg:text-[8.5rem]"
              style={{ animationDelay: "80ms" }}
            >
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
                404
              </span>
              <span className="ml-3 inline-block h-[0.72em] w-[0.08em] animate-pulse bg-primary align-baseline motion-reduce:animate-none" />
            </p>

            <h1
              id="not-found-heading"
              className="not-found-rise mt-5 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              style={{ animationDelay: "160ms" }}
            >
              Oops! Page Not Found
            </h1>

            <p
              className="not-found-rise mx-auto mt-5 max-w-xl text-base leading-8 text-default-500 sm:text-lg lg:mx-0"
              style={{ animationDelay: "240ms" }}
            >
              The page you&apos;re looking for doesn&apos;t exist or may have
              been moved.
            </p>

            <div
              className="not-found-rise mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
              style={{ animationDelay: "320ms" }}
            >
              <Link
                href="/"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-accent-hover hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
              >
                <Home size={17} />
                <span>Back to Homepage</span>
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/portfolio"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-divider bg-default-100/50 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-default-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
              >
                <Compass size={17} className="text-primary" />
                <span>Explore My Portfolio</span>
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            <p
              className="not-found-rise mt-8 font-mono text-[11px] tracking-wide text-default-400"
              style={{ animationDelay: "400ms" }}
            >
              <span className="text-primary">$</span> curl -I {requestedPath}{" "}
              <span className="text-default-400/70">→ 404</span>
            </p>
          </div>

          {/* Missing-page browser illustration */}
          <div
            className="not-found-rise relative mx-auto w-full max-w-md"
            style={{ animationDelay: "200ms" }}
          >
            <div className="pointer-events-none absolute inset-8 -z-10 rounded-full bg-gradient-to-tr from-primary/25 via-blue-500/15 to-purple-500/25 blur-3xl" />

            {/* Floating code chip */}
            <div
              aria-hidden="true"
              className="not-found-float-slow absolute -left-3 -top-6 z-20 flex items-center gap-2 rounded-xl border border-divider bg-background/90 px-3 py-2 font-mono text-[11px] shadow-lg backdrop-blur-md sm:-left-6"
            >
              <Braces size={13} className="text-primary" />
              <span className="text-default-400">status:</span>
              <span className="font-semibold text-red-400">404</span>
            </div>

            {/* Browser window */}
            <div className="not-found-float relative">
              <div className="overflow-hidden rounded-2xl border border-divider bg-default-50/60 p-2 shadow-2xl shadow-primary/5 backdrop-blur-xl sm:p-3">
                <div className="overflow-hidden rounded-xl border border-divider bg-background">
                  {/* Browser chrome */}
                  <div className="flex h-10 items-center gap-2 border-b border-divider bg-default-100 px-3">
                    <div className="flex shrink-0 items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    </div>

                    <div className="mx-1 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-default-200/70 px-2.5 py-1">
                      <LockKeyhole
                        size={10}
                        className="shrink-0 text-emerald-400"
                      />
                      <span className="truncate font-mono text-[10px] text-default-500 sm:text-[11px]">
                        developerjoy.dev
                        <span className="text-foreground">
                          {requestedPath}
                        </span>
                      </span>
                    </div>

                    <RotateCw
                      size={12}
                      className="shrink-0 text-default-400"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Broken page state */}
                  <div className="relative flex aspect-[4/3] flex-col bg-gradient-to-br from-default-100/70 via-background to-primary/5 p-4 sm:p-6">
                    <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-divider bg-background/60 px-4 py-6 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-lg shadow-primary/5">
                        <FileQuestion size={26} aria-hidden="true" />
                      </div>

                      <p className="mt-4 text-sm font-bold text-foreground">
                        This page got lost.
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-default-400">
                        ERR_ROUTE_NOT_RESOLVED
                      </p>

                      <div className="mt-4 w-full max-w-[16rem] rounded-lg border border-divider bg-default-100/70 px-3 py-2 text-left font-mono text-[10px] leading-relaxed sm:text-[11px]">
                        <p className="truncate">
                          <span className="text-emerald-400">GET</span>{" "}
                          <span className="text-default-500">
                            {requestedPath}
                          </span>
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-red-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                          404 Not Found
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cursor */}
            <div
              aria-hidden="true"
              className="not-found-float-slow pointer-events-none absolute -bottom-4 left-4 z-20 flex select-none items-center gap-1.5 sm:left-6"
            >
              <MousePointer2
                size={17}
                className="fill-primary text-primary drop-shadow-md"
              />
              <span className="rounded-md bg-primary px-2 py-0.5 font-mono text-[10px] font-semibold text-primary-foreground shadow-md">
                you are here
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
