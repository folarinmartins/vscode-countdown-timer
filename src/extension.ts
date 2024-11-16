import * as vscode from 'vscode';

let countdownStatusBarItem: vscode.StatusBarItem;
let restartStatusBarItem: vscode.StatusBarItem;
let countdownInterval: NodeJS.Timeout | undefined;
let totalSeconds: number = 0;
let isRunning: boolean = false;

export function activate(context: vscode.ExtensionContext) {
	// Create countdown status bar item
	countdownStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	countdownStatusBarItem.command = 'countdown.togglePlayPause';
	context.subscriptions.push(countdownStatusBarItem);

	// Create restart status bar item
	restartStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 101);
	restartStatusBarItem.text = '$(sync)';
	restartStatusBarItem.command = 'countdown.restart';
	restartStatusBarItem.tooltip = 'Restart Countdown';
	context.subscriptions.push(restartStatusBarItem);

	// Register commands
	let setTimeCommand = vscode.commands.registerCommand('countdown.setTime', setCountdownTime);
	let restartCommand = vscode.commands.registerCommand('countdown.restart', restartCountdown);
	let togglePlayPauseCommand = vscode.commands.registerCommand('countdown.togglePlayPause', togglePlayPause);

	context.subscriptions.push(setTimeCommand, restartCommand, togglePlayPauseCommand);

	updateStatusBar();
}

function setCountdownTime() {
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
			updateStatusBar();
		}
	});
}

function restartCountdown() {
	clearInterval(countdownInterval);
	isRunning = false;
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

	let timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	if (totalSeconds < 0) {
		timeString = '-' + timeString;
	}

	countdownStatusBarItem.text = `$(clock) ${timeString}`;
	countdownStatusBarItem.tooltip = isRunning ? 'Pause' : 'Play';
	countdownStatusBarItem.show();
	restartStatusBarItem.show();
}

export function deactivate() {
	clearInterval(countdownInterval);
}