require('colors');

const { inquirerMenu,
        pausa,
        leerInput,
        listadoTareasBorrar,
        confirmar,
        mostrarListadoChecklist
} = require('./helpers/inquirer');
const { guardarDB,
        leerDB
} = require('./helpers/guardarArchivo')
const Tareas  = require('./models/tareas');
console.clear();

const main = async() => {
    
    let opt= '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){//cargar tareas 

        //establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    
    do {
        //imprimir el menú
        opt = await inquirerMenu();
        
        switch (opt) {
            
            case '1':
                // Crear opción
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                
            break;

            case '2'://Mostrar listado
                tareas.listadoCompleto();
            break;

            case '3'://Listar completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4'://Listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5'://Completado | Pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6'://borrar 
                const id = await listadoTareasBorrar(tareas.listadoArr);

                if( id !== '0' ){

                    const ok = await confirmar('¿Está Seguro?')
                    if ( ok ){

                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    
                    }

                }
                
            break;
        
            
        }

        guardarDB( tareas.listadoArr );

        console.log('\n')

        await pausa();

    } while(opt !== '0'){

    }
    
    
    // pausa();

}



main();