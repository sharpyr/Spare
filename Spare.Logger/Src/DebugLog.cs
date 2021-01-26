﻿using System.Diagnostics;

namespace Spare.Logger {
  public static class DebugLog {
    public static void DebugLogger() => Debug.WriteLine("");
    public static void DebugLogger(this string message) => Debug.WriteLine(message + "\n");
    public static void DebugLogNext(this string message) => Debug.WriteLine(message);
    public static void DebugLogger<T>(string message, params T[] args) => Debug.WriteLine(message, args);
  }
}