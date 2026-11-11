// Servicio de empleados — coordina operaciones de empleados.
// Capa: services. Contiene reglas de negocio y validaciones.
// No depende de Express ni de objetos req/res.

import employeeRepo from '../repositories/employee.repository.js';

// Lista todos los empleados.
async function findAll() {
    return await employeeRepo.findAll();
}

// Busca un empleado por ID.
async function findById(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de empleado inválido');
    }
    return await employeeRepo.findById(id);
}

// Busca empleados por usuario.
async function findByUser(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de usuario inválido');
    }
    return await employeeRepo.findByUser(id);
}

// Crea un nuevo empleado.
// Campos obligatorios: id_empleado, nombre, cargo, salario, EPS.
async function create(employeeData) {
    const { id_empleado, nombre, cargo, salario, eps } = employeeData;
    
    if (!id_empleado || isNaN(id_empleado)) {
        throw new Error('El ID del empleado es obligatorio');
    }
    if (!nombre || nombre.trim() === '') {
        throw new Error('El nombre del empleado es obligatorio');
    }
    if (!cargo || cargo.trim() === '') {
        throw new Error('El cargo del empleado es obligatorio');
    }
    if (!salario || isNaN(salario) || salario < 0) {
        throw new Error('El salario del empleado es obligatorio y debe ser mayor o igual a cero');
    }
    if (!eps || eps.trim() === '') {
        throw new Error('La EPS del empleado es obligatoria');
    }

    const nuevoEmpresa = {
        id_empleado: parseInt(id_empleado, 10),
        nombre: nombre.trim(),
        cargo: cargo.trim(),
        salario: parseInt(salario, 10),
        eps: eps.trim()
    };

    return await employeeRepo.create(nuevoEmpresa);
}

// Actualiza un empleado existente.
async function update(id, employeeData) {
    if (!id || isNaN(id)) {
        throw new Error('ID de empleado inválido');
    }

    const updates = {};
    if (employeeData.id_empleado !== undefined) {
        if (isNaN(employeeData.id_empleado)) {
            throw new Error('ID de empleado inválido');
        }
        updates.id_empleado = parseInt(employeeData.id_empleado, 10);
    }
    if (employeeData.nombre !== undefined) {
        if (employeeData.nombre.trim() === '') {
            throw new Error('El nombre del empleado no puede estar vacío');
        }
        updates.nombre = employeeData.nombre.trim();
    }
    if (employeeData.cargo !== undefined) {
        if (employeeData.cargo.trim() === '') {
            throw new Error('El cargo del empleado no puede estar vacío');
        }
        updates.cargo = employeeData.cargo.trim();
    }
    if (employeeData.salario !== undefined) {
        if (isNaN(employeeData.salario) || employeeData.salario < 0) {
            throw new Error('El salario del empleado es inválido');
        }
        updates.salario = parseInt(employeeData.salario, 10);
    }
    if (employeeData.EPS !== undefined) {
        if (employeeData.EPS.trim() === '') {
            throw new Error('La EPS del empleado no puede estar vacía');
        }
        updates.EPS = employeeData.EPS.trim();
    }

    if (Object.keys(updates).length === 0) {
        throw new Error('No hay campos para actualizar');
    }

    return await employeeRepo.update(id, updates);
}

// Elimina un empleado.
async function remove(id) {
    if (!id || isNaN(id)) {
        throw new Error('ID de empleado inválido');
    }
    return await employeeRepo.remove(id);
}

export default {
    findAll,
    findById,
    findByUser,
    create,
    update,
    remove
};
