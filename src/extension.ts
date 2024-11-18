import * as vscode from 'vscode';

let countdownStatusBarItem: vscode.StatusBarItem;
let restartStatusBarItem: vscode.StatusBarItem;
let setTimeStatusBarItem: vscode.StatusBarItem;
let countdownInterval: NodeJS.Timeout | undefined;
let totalSeconds: number = 10 * 60; // Default 10 minutes
let isRunning: boolean = false;
let totalTime: number;

export function activate(context: vscode.ExtensionContext) {
	// Retrieve stored time or use defaulttotalSeconds = context.globalState.get('countdownTime', 10 * 60);
	totalTime = totalSeconds; // Set the total time
	totalSeconds = context.globalState.get('countdownTime', 10 * 60);

	// Store the initial time if it's not already stored
	if (!context.globalState.get('countdownTime')) {
		context.globalState.update('countdownTime', totalSeconds);
	}

	// Get the alignment setting
	const config = vscode.workspace.getConfiguration('vscode-countdown-timer');
	const alignment = config.get('alignment') === 'left' ? vscode.StatusBarAlignment.Left : vscode.StatusBarAlignment.Right;

	// Create countdown status bar item
	countdownStatusBarItem = vscode.window.createStatusBarItem(alignment, 100);
	countdownStatusBarItem.command = 'vscode-countdown-timer.togglePlayPause';
	context.subscriptions.push(countdownStatusBarItem);

	// Create set time status bar item
	setTimeStatusBarItem = vscode.window.createStatusBarItem(alignment, 100);
	setTimeStatusBarItem.text = "$(watch)"; // Clock icon
	setTimeStatusBarItem.tooltip = "Set Time";
	setTimeStatusBarItem.command = "vscode-countdown-timer.setTime";

	// Create restart status bar item
	restartStatusBarItem = vscode.window.createStatusBarItem(alignment, 100);
	restartStatusBarItem.text = '$(sync)';
	restartStatusBarItem.command = 'vscode-countdown-timer.restart';
	restartStatusBarItem.tooltip = 'Reset Countdown';
	context.subscriptions.push(restartStatusBarItem);
	context.subscriptions.push(setTimeStatusBarItem);

	// Register commands
	let setTimeCommand = vscode.commands.registerCommand('vscode-countdown-timer.setTime', () => setCountdownTime(context));
	let restartCommand = vscode.commands.registerCommand('vscode-countdown-timer.restart', () => restartCountdown(context));
	let togglePlayPauseCommand = vscode.commands.registerCommand('vscode-countdown-timer.togglePlayPause', togglePlayPause);

	context.subscriptions.push(setTimeCommand, restartCommand, togglePlayPauseCommand);
	// Add configuration change listener
	// In the activate function, replace the existing configuration change listener with this:
	context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
		if (e.affectsConfiguration('vscode-countdown-timer.alignment')) {
			vscode.window.showInformationMessage(
				'Countdown Timer alignment has changed. Reload window to apply changes?',
				'Reload',
				'Later'
			).then(selection => {
				if (selection === 'Reload') {
					vscode.commands.executeCommand('workbench.action.reloadWindow');
				}
			});
		}
	}));

	// Update and show status bar items immediately
	updateStatusBar();
	countdownStatusBarItem.show();
	restartStatusBarItem.show();
	setTimeStatusBarItem.show();
}

function setCountdownTime(context: vscode.ExtensionContext) {
	vscode.window.showInputBox({
		prompt: 'Enter countdown time in minutes',
		validateInput: (value) => {
			if (!/^\d+$/.test(value)) {
				return 'Please enter a valid number';
			}
			return null;
		}
	}).then(value => {
		if (value) {
			totalSeconds = parseInt(value) * 60;
			totalTime = totalSeconds;
			context.globalState.update('countdownTime', totalSeconds);
			updateStatusBar();
		}
	});
}

function restartCountdown(context: vscode.ExtensionContext) {
	clearInterval(countdownInterval);
	isRunning = false;
	totalSeconds = context.globalState.get('countdownTime', 10 * 60);
	updateStatusBar();
}

function togglePlayPause() {
	isRunning = !isRunning;
	if (isRunning) {
		startCountdown();
	} else {
		clearInterval(countdownInterval);
	}
	updateStatusBar();
}

function startCountdown() {
	countdownInterval = setInterval(() => {
		totalSeconds--;
		updateStatusBar();
	}, 1000);
}

function updateStatusBar() {
	let hours = Math.floor(Math.abs(totalSeconds) / 3600);
	let minutes = Math.floor((Math.abs(totalSeconds) % 3600) / 60);
	let seconds = Math.abs(totalSeconds) % 60;

	let timeString;
	if (hours > 0) {
		timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	} else {
		timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	if (totalSeconds < 0) {
		timeString = '-' + timeString;
	}

	// Color coding based on percentage of total time
	const percentageRemaining = (totalSeconds / totalTime) * 100;

	let color;
	if (percentageRemaining > 50) {
		color = new vscode.ThemeColor('statusBarItem.prominentForeground');
	} else if (percentageRemaining > 20) {
		color = new vscode.ThemeColor('statusBarItem.warningForeground');
	} else {
		color = new vscode.ThemeColor('statusBarItem.errorForeground');
	}

	countdownStatusBarItem.text = `$(clock) ${timeString}`;
	countdownStatusBarItem.color = color;
	countdownStatusBarItem.tooltip = isRunning ? 'Pause' : 'Play';
}

export function deactivate() {
	clearInterval(countdownInterval);
	if (countdownStatusBarItem) {
		countdownStatusBarItem.dispose();
	}
	if (restartStatusBarItem) {
		restartStatusBarItem.dispose();
	}
	if (setTimeStatusBarItem) {
		setTimeStatusBarItem.dispose();
	}
}