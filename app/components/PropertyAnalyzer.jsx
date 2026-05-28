"use client";

export default function PropertyAnalyzer() {
  return (
    <iframe
      src="/analyze-static/index.html"
      style={{
        width: "100%",
        height: "100vh",
        border: "none",
      }}
    />
  );
}
