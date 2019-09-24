const opt = {
		crear:{
				demand:true,
				alias:'c'
			},
		actualizar:{
				alias:'d',
				default:true
			}
}

const argv = require('yargs')
		.command('crear','Crear un elemento por hacer',opt)
		.command('actualizar','Actualizar el estado completado de una tarea',opt)
		.help()
		.argv;

module.exports = {
	argv
}
