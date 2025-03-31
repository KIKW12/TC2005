# Normalización de Bases de Datos

La normalización de bases de datos es un proceso crucial en el diseño de bases de datos relacionales para obtener una estructura estable y lógica. El objetivo principal de la normalización es evitar anomalías de almacenamiento y facilitar la modificación del modelo lógico ante nuevos requerimientos. Una base de datos bien diseñada tiene una mayor esperanza de vida y un buen desempeño incluso al aumentar su tamaño, además de ser lo suficientemente flexible para incorporar cambios.

## Riesgos en el Diseño de Bases de Datos y la Normalización

El diseño deficiente de bases de datos relacionales conlleva riesgos como la redundancia de información y la inconsistencia de datos. La normalización es el proceso de simplificar las relaciones entre los campos de un registro, reemplazando un conjunto de datos en un registro por varios registros más simples, predecibles y manejables.

## Razones para Llevar a Cabo la Normalización

La normalización se realiza por varias razones importantes:

- Estructurar los datos de forma que se puedan representar las relaciones pertinentes entre ellos.
- Permitir la recuperación sencilla de los datos en respuesta a consultas y reportes.
- Simplificar el mantenimiento de los datos mediante actualizaciones, inserciones y borrados eficientes.
- Reducir la necesidad de reestructurar o reorganizar los datos cuando surjan nuevas aplicaciones.

## Pasos para Realizar la Normalización

El proceso de normalización sigue tres pasos principales:

1. Descomponer todos los grupos de datos en registros bidimensionales.
2. Eliminar todas las relaciones en las que los datos no dependan completamente de la llave primaria del registro.
3. Eliminar todas las relaciones que contengan dependencias transitivas.

## Formas Normales

Las formas normales son técnicas para prevenir las anomalías en las tablas. Una tabla se encuentra en una determinada forma normal si satisface un conjunto de restricciones.

### Primera Forma Normal (1FN)

Una relación está en **1FN** si y solo si:
- Cada celda de la tabla contiene valores atómicos (un solo valor por celda).
- No se permiten grupos ni arreglos repetidos.
- Todos los valores en cualquier columna deben ser del mismo tipo.
- Cada columna debe tener un nombre único.
- Dos filas no deben ser idénticas.

Ejemplo: La relación *alumno cursa materia* se considera en 1FN ya que maneja valores atómicos.

### Segunda Forma Normal (2FN)

Una relación está en **2FN** si:
- Está en 1FN.
- Todos sus atributos no primos (no clave) dependen funcionalmente de la llave primaria.
- Cualquier tabla con un atributo único como clave está automáticamente en 2FN.

### Tercera Forma Normal (3FN)

Una relación está en **3FN** si:
- Está en 2FN.
- Todos sus atributos no primos dependen no transitivamente de la llave primaria.

Ejemplo: Si en la relación *alumno-cursa-materia* el nombre del maestro depende tanto de *Necono* como de *RFC*, se debe eliminar la dependencia transitiva separando los atributos en otra tabla.

### Forma Normal de Boyce-Codd (FNBC o BCNF)

Una relación está en **FNBC** si y solo si cada determinante es una llave candidata.
- Una llave candidata es un conjunto de atributos que puede identificar de forma única cada fila de una tabla.
- Cada atributo que determina otro atributo debe ser una llave candidata.

Ejemplo: Si tanto *control* como *Esp.* pueden referenciar al atributo *nombre*, ambos son llaves candidatas.

### Cuarta Forma Normal (4FN)

La **4FN** se relaciona con las dependencias de valores múltiples. Una relación R está en 4FN si:
- Para toda dependencia de valores múltiples *X->->Y*, se cumple que *X->->Y* es trivial o *X* es una superllave de *R*.

Ejemplo: En una tabla *estudiante* con atributos *Clave, Especialidad* y *Curso*, donde un estudiante puede tener múltiples especialidades y tomar múltiples cursos, estos valores deben separarse en dos tablas para evitar redundancia.

### Quinta Forma Normal (5FN)

La **5FN** se refiere a dependencias de producto. Una relación R está en 5FN si:
- Para todas las dependencias de productos, la dependencia es trivial o cada subrelación es una superllave de R.

Este concepto está relacionado con entidades que tienen especializaciones o roles.