
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');

const { esRolValido, validarEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete 
    } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet);

router.put('/:id', [
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  check('rol').custom( esRolValido ),
  validarCampos,
] , usuariosPut);

  router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmail(),
    check('contraseña', 'La contraseña debe ser mas de 6 letras').isLength({ min: 6 }),
    check('correo').custom( validarEmail ),
    //check('correo', 'El correo no es válido').isEmail(),
    //check('rol', 'No es un rol permitido').isIn('ADMIN_ROLE','USER_ROLE'),
    check('rol').custom( esRolValido ),
    validarCampos,
  ] , usuariosPost);

  router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
  ], usuariosDelete);

  router.patch('/', usuariosPatch);


module.exports = router;