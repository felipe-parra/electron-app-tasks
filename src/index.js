const { app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow, newTaskWindow;

app.on('ready', () => {
	mainWindow = new BrowserWindow({});
	mainWindow.loadURL(
		url.format({
			pathname: path.join(__dirname, 'views/index.html'),
			protocol: 'file',
			slashes: true
		})
	);
	const mainMenu = Menu.buildFromTemplate(templateMenu);

	Menu.setApplicationMenu(mainMenu);

	mainWindow.on('closed', () => {
		app.quit();
	});
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
				type: 'separator'
			},
			{
				label: 'Cerrar Aplicacion',
				accelerator: 'Ctrl+Q',
				click() {}
			}
		]
	}
];

const createNewTaskWindow = () => {
	newTaskWindow = new BrowserWindow({
		width: 400,
		height: 330,
		title: 'Agregar Nueva Tarea'
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
