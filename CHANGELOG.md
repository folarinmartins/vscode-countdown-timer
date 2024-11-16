<!-- @format -->

# Change Log

All notable changes to the "countdown-timer" extension will be documented in this file.

## [Unreleased]

-   [Planned] Add more customization options for the timer
-   [Planned] Allow multiple timers to be set
-   [Planned] Integrate with other VS Code extensions
-   [Planned] Implement Pomodoro technique support with customizable work/break intervals
-   [Planned] Add customizable alert sounds and notifications
-   [Planned] Create integration with VS Code's task system
-   [Planned] Develop keyboard shortcuts for quick timer control
-   [Planned] Improve UI for setting timer duration

## [1.0.0] - 2024-11-16

-   [Added] Initial release of Countdown Timer
-   [Added] Display time in status bar in "hh:mm:ss" format for hours > 0, or "mm:ss" for hours = 0
-   [Added] Clock icon ($(watch)) for setting time in status bar
-   [Added] Sync icon ($(sync)) for restarting countdown in status bar
-   [Added] Play/pause functionality via countdown button
-   [Added] Restart button to reset countdown
-   [Added] Set timer duration through menu item
-   [Added] Continue counting up after countdown reaches zero
-   [Added] Color coding of the timer based on percentage of time remaining:
    -   Green: > 50% remaining
    -   Yellow: 20-50% remaining
    -   Red: < 20% remaining
-   [Added] Persistence of timer state across VS Code sessions
