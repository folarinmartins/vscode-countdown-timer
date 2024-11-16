<!-- @format -->

# Countdown Timer for VS Code

A simple countdown timer extension for Visual Studio Code that displays the time in the status bar and allows you to restart and pause the timer.

## Features

-   Displays the time in the status bar in the format "hh:mm:ss"
-   Includes a restart icon and a countdown button in the status bar
-   Clicking the countdown button toggles play/pause the current time
-   Clicking the restart button restarts the current countdown
-   Allows you to set the time in minutes through a menu item
-   Continues counting up after the countdown hits zero

## Requirements

This extension requires Visual Studio Code version 1.60.0 or higher.

## Installation

1. Open VS Code
2. Press `Ctrl+P` (or `Cmd+P` on macOS) to open the Quick Open dialog
3. Type `ext install countdown-timer` and press Enter
4. Restart VS Code

## Usage

1. Click on the Countdown Timer icon in the status bar
2. Set the time in minutes through the menu item
3. Click the countdown button to start the timer
4. Click the restart button to restart the timer
5. Click the countdown button again to pause the timer

## Extension Settings

This extension contributes the following settings:

-   `countdownTimer.time`: Set the time in minutes for the countdown timer (default: 10)

## Known Issues

-   None currently reported

## Roadmap

Future plans for Countdown Timer include:

-   [ ] Add more customization options for the timer
-   [ ] Allow multiple timers to be set
-   [ ] Integrate with other VS Code extensions

## Contributing

If you have suggestions for improvements or bug fixes, please feel free to contribute! Here's how:

1. Fork the repository
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

Before submitting your pull request, please make sure your changes are consistent with the project's coding style and that all tests pass.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any problems or have any suggestions for improvements, please [open an issue](https://github.com/your-username/countdown-timer/issues) on our GitHub repository.

---

**Enjoy your new Countdown Timer!**
