const empleados = [
    {
        id: 1,
        nombre: 'oscar'
    },
    {
        id: 2,
        nombre: 'grace'
    },
    {
        id: 3,
        nombre: 'carl'
    }
];

const salarios = [
    {
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    }
];

const id = 3;

const getEmpleado = (id, callback) => {
    

    return new Promise((resolve,reject)=>{
        
        const empleado = empleados.find(e => e.id === id)?.nombre;

        (empleado)
            ? resolve(empleado)
            : reject(`No existe empleado con id ${id}`);
        
    });
    
}

const getSalario = (id, callback) => {
    

    return new Promise((resolve,reject)=>{
        
        const salario = salarios.find(e => e.id === id)?.salario;

        (salario)
            ? resolve(salario)
            : reject(`No existe salario con id ${id}`);
        
    });
    
}

const getInfoUser = async(id) =>{
    try{
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);

        return `El empleado:  ${empleado} tiene un salario de: ${salario}`

    } catch (error){
        throw error;
    }
}


getInfoUser(id)
.then(msj => {
    console.log('Todo Bien');
    console.log(msj);
})
.catch(err => {
    console.log('Todo Mal');
    console.log(err);
});