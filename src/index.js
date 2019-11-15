const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow, newTaskWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		titleBarStyle: 'hidden', //Le damos algunas propiedad de nuestra ventana, por ejemplo ocultamos el TitleBar.
		width: 800,
		height: 400,
		minWidth: 800,
		minHeight: 400,
		backgroundColor: '#ececec',
		show: false,
		webPreferences: {
			nodeIntegration: true
		},
		nodeIntegrationInWorker: true
	});
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'views/index.html'),
			protocol: 'file',
			slashes: true
		})
	);
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
	});
	const mainMenu = Menu.buildFromTemplate(templateMenu);

	Menu.setApplicationMenu(mainMenu);

	mainWindow.on('closed', () => {
		app.quit();
	});
});

ipcMain.on('task:new', (e, newTask) => {
	mainWindow.webContents.send('task:new', newTask);
	newTaskWindow.close();
});

const templateMenu = [
	{
		label: 'Archivo',
		submenu: [
			{
				label: 'Nueva Tarea',
				accelerator: 'Ctrl+N',
				click() {
					createNewTaskWindow();
				}
			},
			{
				label: 'Pendientes',
				accelerator: 'Ctrl+S',
				click() {
					console.log('Pendientes');
				}
			},
			{
				label: 'Eliminar tareas',
				click() {
					mainWindow.webContents.send('task:remove-all');
				}
			},
			{
				type: 'separator'
			},
			{
				label: 'Cerrar Aplicacion',
				accelerator: 'Ctrl+Q',
				click() {
					app.quit();
				}
			}
		]
	}
];

const createNewTaskWindow = () => {
	newTaskWindow = new BrowserWindow({
		width: 400,
		height: 330,
		title: 'Agregar Nueva Tarea',
		webPreferences: {
			nodeIntegration: true
		},
		nodeIntegrationInWorker: true
	});
	newTaskWindow.setMenuBarVisibility(false);
	newTaskWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'views/ventana.html'),
			protocol: 'file',
			slashes: true
		})
	);
};

if (process.env.NODE_ENV !== 'production') {
	templateMenu.push({
		label: 'DevTools',
		submenu: [
			{
				label: 'Show/Hide Dev Tools',
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				}
			},
			{ role: 'reload' },
			{ role: 'forcereload' },
			{ role: 'toggledevtools' },
			{ type: 'separator' },
			{ role: 'resetzoom' },
			{ role: 'zoomin' },
			{ role: 'zoomout' },
			{ type: 'separator' },
			{ role: 'togglefullscreen' }
		]
	});
}
