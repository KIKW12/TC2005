# Notación Modelo Entidad Relación (MER)

## Introducción
El diseño de bases de datos busca minimizar la redundancia y facilitar la recuperación de información. Para ello, se utilizan técnicas como las formas normales y dependencias de datos.

## Problemas en el diseño de bases de datos relacionales
- **Redundancia:** Datos repetidos generan incoherencias.
- **Inconsistencia:** Actualizaciones incorrectas pueden causar errores.
- **Valores nulos:** Pueden desperdiciar espacio de almacenamiento.
- **Dificultad de actualización:** Es más complejo gestionar inserciones, eliminaciones y modificaciones.

## Fases del diseño de bases de datos
1. **Recolección y análisis de requerimientos**
2. **Diseño conceptual:** Se usa el modelo E-R para describir datos, relaciones y restricciones.
3. **Diseño lógico:** Transformación del modelo conceptual a un modelo compatible con un DBMS.
4. **Diseño físico:** Organización interna de almacenamiento y archivos.

## Modelo Entidad-Relación (ER)
### Entidades
Objetos con existencia propia en la base de datos. Se representan con rectángulos.

### Asociaciones
Relaciones entre entidades, representadas con rombos. Ejemplos:
- *Clientes colocan Pedidos*
- *Proveedores suministran Materiales*

### Cardinalidad
Define cuántos elementos de una entidad pueden relacionarse con otra:
- **1:1** (uno a uno)
- **1:N** (uno a muchos)
- **N:N** (muchos a muchos)

### Atributos
Propiedades de entidades o asociaciones. Se clasifican en:
- **Simples o compuestos**
- **Mono valuados o multivaluados**
- **Almacenados o derivados**

## Identificadores
Son atributos que identifican de manera única a una entidad (ejemplo: RFC de un cliente). Se subrayan en los diagramas.

## Modelo ER Extendido
### Roles
Cuando una entidad participa en más de una relación dentro del mismo modelo (ejemplo: una ciudad puede ser origen y destino de un viaje).

### Generalización y especialización
- **Superclase:** Entidad general (ejemplo: *Empleados*).
- **Subclase:** Entidad específica con atributos adicionales (ejemplo: *Empleados de planta* y *Empleados por honorarios*).
- Se representa con un triángulo y la relación *ES_UN (IS_A)*.

### Entidades fuertes y débiles
- **Fuertes:** Existen por sí mismas (ejemplo: *Empleado*).
- **Débiles:** Dependen de otra entidad (ejemplo: *Familiar* depende de *Empleado*).

## Restricciones de Integridad
Reglas adicionales para asegurar la coherencia de los datos:
- **Cotas de cardinalidad** (ejemplo: un profesor puede impartir de 0 a 5 cursos).
- **Restricciones adicionales** (ejemplo: *Empleado.Sueldo < Jefe.Sueldo*).

## Consideraciones finales
El modelo ER es fundamental para la conceptualización y diseño de bases de datos eficientes, ayudando a organizar información y mejorar su integridad.

