## Modelo Relacional

### Relación
- Es el objeto fundamental, basado en la teoría de conjuntos.
- Se define como un conjunto de tuplas.
- El grado o paridad de una relación se refiere al número de dominios involucrados.

### Dominio
- Es un conjunto finito de valores homogéneos y atómicos con un nombre.

### Atributo
- Es el papel que juega un dominio en una relación.

### Esquema de Relación (Intensión)
- Es un conjunto de pares atributo-dominio que define la estructura de la relación.
- Es la parte definitoria y estática de la relación.

### Extensión de Relación (Ocurrencia/Instancia)
- Es el conjunto de tuplas que pertenecen a la relación en un momento dado.

### Tupla
- Es un conjunto de atributos.

### Producto Cartesiano
- Es el conjunto de todas las combinaciones posibles de las tuplas de dos o más relaciones.

### Llaves
- **Llave Primaria**: Columna (o conjunto de columnas) que identifica de manera única cada tupla en una relación.
- **Llave Compuesta**: Llave primaria conformada por dos o más columnas.
- **Llaves Candidatas**: Todas las llaves posibles de una relación.
- **Llave Alterna**: Cualquier llave candidata que no se elige como llave primaria.
- **Superllaves**: Conjuntos de columnas que contienen un subconjunto de columnas que es llave.
- **Llave Foránea**: Atributo en una relación que referencia la llave primaria de otra relación.

## Restricciones del Modelo Relacional

### Restricciones Inherentes
- Derivadas de la definición matemática de relación:
  - No hay tuplas iguales.
  - El orden de las tuplas y atributos no es significativo.
  - Cada atributo toma un único valor del dominio.
  - Ningún atributo de la clave primaria puede ser nulo (regla de integridad de entidad).

### Restricciones de Usuario
- Predicados definidos sobre atributos, tuplas o dominios que deben verificarse.
- **Restricción de Integridad Referencial**: Los valores de la clave foránea deben coincidir con los de la clave primaria asociada o ser nulos.

### Consecuencias de Operaciones sobre Claves Foráneas
- **Operación restringida**: No se permite el borrado o modificación si existen tuplas con dicha clave en la relación que contiene la clave foránea.
- **Operación con transmisión en cascada**: El borrado o modificación se propaga en cascada a las tuplas de la relación que contiene la clave foránea.
- **Operación con puesta a nulos**: Los valores de las claves foráneas se establecen como nulos.
- **Operación con puesta a valor por defecto**: Los valores de las claves foráneas se establecen con un valor por defecto.
- **Operación que desencadena un procedimiento de usuario**: Se ejecuta un procedimiento definido por el usuario.

## Modelo Relacional y la Arquitectura ANSI
- Los dominios, relaciones, claves y restricciones corresponden al **esquema conceptual**. Las relaciones se denominan tablas base o reales.
- Las tablas virtuales o vistas corresponden al **esquema externo**.
- El modelo relacional no especifica nada sobre el **esquema interno**.

## Valores Nulos
- Se utilizan para representar información desconocida.

## Dinámica del Modelo Relacional
- Se expresa mediante lenguajes de manipulación relacionales que operan sobre conjuntos de tuplas.
- Se dividen en **algebraicos** y **predicativos**.

## Álgebra Relacional
- Lenguaje algebraico que actúa sobre relaciones y genera nuevas relaciones.
- Es un álgebra cerrada.

### Operadores Básicos
- **Unión**
- **Intersección**
- **Diferencia**
- **Proyección**
- **Selección**
- **Join natural**
- **Teta-join**
- **Producto cartesiano**
- **División**

### Definiciones
- **Producto cartesiano**: 
  - De dos relaciones de cardinalidades *m* y *n*, resulta en una relación cuyo esquema estará definido sobre la unión de los atributos de ambas relaciones.
  - Su extensión estará constituida por las *m × n* tuplas formadas concatenando cada tupla de la primera relación con cada una de las tuplas de la segunda.
- **División de dos relaciones**:
  - Genera una nueva relación cuya extensión estará formada por las tuplas que, al completarse con las tuplas de la segunda relación, permiten obtener la primera.

### Propiedad del Álgebra Relacional
- Se define sobre un conjunto con operadores que asocian elementos del conjunto sobre el que se define el álgebra con elementos del mismo conjunto, haciéndola **cerrada**.
