"use client";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ClipboardIcon } from "@heroicons/react/24/outline";

interface CodeBlockProps {
  language: string;
  children: React.ReactNode;
}

function extractText(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) return extractText((node as React.ReactElement<any>).props.children);
  return "";
}

export default function CodeBlock({ language, children }: CodeBlockProps) {
  const [isDark, setIsDark] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkTheme = () => {
      const darkMode =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(darkMode);
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkTheme);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", checkTheme);
    };
  }, []);

  const codeString = extractText(children).trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!mounted) {
    return (
      <div className="relative group my-6 rounded-lg shadow-md overflow-hidden bg-white dark:bg-[#1e1e1e]">
        <div className="p-4 text-sm text-gray-500">Loading code...</div>
      </div>
    );
  }

  return (
    <div
      className={`relative group my-6 rounded-lg shadow-md overflow-hidden ${
        isDark ? "bg-[#1e1e1e]" : "bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="font-semibold text-gray-600 dark:text-gray-300">
          {language.toUpperCase()}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-xs"
          title={copied ? "Copied!" : "Copy code"}
        >
          <ClipboardIcon className="w-4 h-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      {/* Code block */}
      <SyntaxHighlighter
        language={language}
        style={isDark ? vscDarkPlus : vs}
        showLineNumbers
        wrapLines
        customStyle={{
          borderRadius: "0 0 0.5rem 0.5rem",
          padding: "1rem",
          margin: 0,
          backgroundColor: "inherit",
          fontSize: "0.9rem",
          lineHeight: "1.6",
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }}
        codeTagProps={{
          style: {
            backgroundColor: "transparent",
            color: "inherit",
          },
        }}
        PreTag={(props) => (
          <pre
            {...props}
            style={{
              backgroundColor: "transparent",
              margin: 0,
              padding: 0,
              overflowX: "auto",
            }}
          />
        )}
      >
        {typeof children === "string" ? children : codeString}
      </SyntaxHighlighter>
    </div>
  );
}
