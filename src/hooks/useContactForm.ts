/**
 * useContactForm Hook
 * Manages contact form state and submission
 */

import { useState } from "react";

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export function useContactForm() {
  const [state, setState] = useState<ContactFormState>({
    isLoading: false,
    isSuccess: false,
    error: null,
  });

  const submitForm = async (data: ContactFormInput) => {
    setState({ isLoading: true, isSuccess: false, error: null });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type") || "";
      let result: unknown = {};

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        try {
          result = JSON.parse(text);
        } catch {
          result = { error: text || "The server returned an unexpected response." };
        }
      }

      if (!response.ok) {
        const errorMessage =
          typeof result === "object" && result !== null && "error" in result
            ? (result as { error?: unknown }).error
            : undefined;

        throw new Error(typeof errorMessage === "string" ? errorMessage : "Failed to send message");
      }

      setState({
        isLoading: false,
        isSuccess: true,
        error: null,
      });

      return { success: true, data: result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

      setState({
        isLoading: false,
        isSuccess: false,
        error: errorMessage,
      });

      return { success: false, error: errorMessage };
    }
  };

  const resetForm = () => {
    setState({
      isLoading: false,
      isSuccess: false,
      error: null,
    });
  };

  return { ...state, submitForm, resetForm };
}
