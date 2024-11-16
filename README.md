<!-- @format -->

# Countdown Timer for VS Code

A versatile countdown timer extension for Visual Studio Code that displays time in the status bar and offers intuitive controls for managing your work sessions.

## Features

-   Displays time in the status bar in "hh:mm:ss" format
-   Intuitive controls: play/pause and restart buttons in the status bar
-   Set custom countdown duration through a menu item
-   Continues counting up after reaching zero
-   Persists timer state across VS Code sessions

![Countdown Timer in action](images/timer.png)

## Requirements

-   Visual Studio Code version 1.60.0 or higher

## Installation

1. Open VS Code
2. Press `Ctrl+P` (or `Cmd+P` on macOS) to open the Quick Open dialog
3. Type `ext install countdown-timer` and press Enter
4. Restart VS Code

## Usage

1. Click the Countdown Timer icon in the status bar
2. Set the desired time in minutes through the menu item
3. Use the play/pause button to control the timer
4. Click the restart button to reset the timer
5. Timer state persists even when VS Code is closed and reopened

## Extension Settings

This extension contributes the following settings:

-   `countdownTimer.time`: Set the default time in minutes for the countdown timer (default: 25)
-   `countdownTimer.autoStart`: Automatically start the timer when VS Code opens (default: false)

## Known Issues

-   None currently reported. If you encounter any issues, please report them on our GitHub repository.

## Roadmap

Future plans for Countdown Timer include:

-   [ ] Multiple simultaneous timers
-   [ ] Customizable alert sounds and notifications
-   [ ] Integration with VS Code's task system
-   [ ] Pomodoro technique support

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code adheres to our coding standards and passes all tests before submitting a PR.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

If you encounter any problems or have suggestions for improvements, please [open an issue](https://github.com/your-username/countdown-timer/issues) on our GitHub repository.

## Acknowledgements

-   Thanks to all contributors who have helped shape this extension
-   Inspired by the Pomodoro Technique and other time management methods

---

**Boost your productivity with Countdown Timer for VS Code!**
