require('colors');

const { inquirerMenu,
        pausa,
        leerInput
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

            case '2':
                tareas.listadoCompleto(tareasDB);
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