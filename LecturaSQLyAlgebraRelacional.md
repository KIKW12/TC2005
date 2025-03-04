## SQL y Álgebra Relacional

SQL es el lenguaje utilizado por los DBMS para definir y utilizar bases de datos. Las consultas en SQL están ligadas a la obtención de relaciones mediante el álgebra relacional. Todas las consultas expresables con álgebra relacional pueden representarse con sentencias SQL.

### Sintaxis básica de una consulta SQL
La sintaxis básica de una consulta SQL incluye las cláusulas `SELECT`, `FROM` y `WHERE`:
- La cláusula `SELECT` especifica las columnas a seleccionar.
- La cláusula `FROM` indica las tablas participantes.
- La cláusula `WHERE` define las condiciones que se deben cumplir.

### Equivalencia entre Álgebra Relacional y SQL
La equivalencia entre la notación del álgebra relacional y SQL se ilustra con ejemplos basados en un esquema de referencia. Se presenta una notación específica para los operadores del álgebra relacional:
- **SL** (Selección)
- **PR** (Proyección)
- **JN** (Reunión natural)
- **UN** (Unión)
- **IN** (Intersección)
- **-** (Diferencia)
- **X** (Producto cartesiano)

### Ejemplos de equivalencia
- **Consulta de una relación**:
  ```sql
  SELECT * FROM materiales;
  ```
  Equivalente a: `SL{clave=1000}(materiales)`

- **Selección**:
  ```sql
  SELECT * FROM materiales WHERE clave=1000;
  ```

- **Proyección**:
  ```sql
  SELECT clave, rfc, fecha FROM entregan;
  ```
  Equivalente a: `PR{clave,rfc,fecha} (entregan)`

- **Reunión natural**:
  ```sql
  SELECT * FROM entregan, proveedores WHERE entregan.rfc=proveedores.rfc;
  ```
  Equivalente a: `entregan JN proveedores`

- **Reunión con criterio específico**:
  ```sql
  SELECT * FROM entregan, proyectos WHERE entregan.numero<=proyectos.numero;
  ```
  Equivalente a: `entregan JN{entregan.numero <= proyectos.numero} proyectos`

- **Unión**:
  ```sql
  (SELECT * FROM entregan WHERE clave=1000)
  UNION
  (SELECT * FROM entregan WHERE clave=2000);
  ```
  Equivalente a: `SL{clave=1000}(entregan) UN SL{clave=2000}(entregan)`

- **Intersección** (solo en ORACLE):
  ```sql
  (SELECT clave FROM entregan WHERE numero=5001)
  INTERSECT
  (SELECT clave FROM entregan WHERE numero=5018);
  ```
  Equivalente a: `PR{clave}(SL{numero=5001}(entregan)) IN PR{clave}(SL{numero=5018}(entregan))`

- **Diferencia** (solo en ORACLE):
  ```sql
  (SELECT * FROM entregan)
  MINUS
  (SELECT * FROM entregan WHERE clave=1000);
  ```
  Equivalente a: `entregan - SL{clave=1000}(entregan)`

- **Producto cartesiano**:
  ```sql
  SELECT * FROM entregan, materiales;
  ```
  Equivalente a: `entregan X materiales`

### Agregación de datos en SQL
SQL permite obtener resúmenes de la información mediante funciones agregadas. La sintaxis general para realizar agrupaciones es:
```sql
SELECT columnas_que_agrupan, funciones_agregadas
FROM tablas
[WHERE condiciones]
[GROUP BY columnas_que_agrupan]
[HAVING condiciones_sobre_funciones_agregadas];
```
- En la cláusula `GROUP BY` deben aparecer todas las columnas de la cláusula `SELECT` que no sean funciones agregadas.
- La cláusula `HAVING` permite establecer condiciones sobre las funciones agregadas.

### Funciones Agregadas
Las funciones agregadas incluyen:
- `AVG` (promedio)
- `MIN` (mínimo)
- `MAX` (máximo)
- `COUNT(*)` (número de tuplas)
- `COUNT(expresión)` (número de tuplas no nulas)
- `STD` (desviación estándar)

### Ejemplos de Agregación
- **Cantidad vendida por producto**:
  ```sql
  SELECT codproducto, SUM(cantidad)
  FROM ventas
  GROUP BY codproducto;
  ```

- **Cantidad vendida por día de cada producto**:
  ```sql
  SELECT codproducto, fecha, SUM(cantidad)
  FROM ventas
  GROUP BY codproducto, fecha;
  ```

- **Ejemplo completo**:
  Cálculo de cantidad total vendida, importe de ventas, promedio de la cantidad vendida, mínimo y máximo de los precios de venta por cliente y día, restringido a clientes cuyo importe de ventas por día sea mayor a 200:
  ```sql
  SELECT nocliente, fecha,
         SUM(cantidad),
         SUM(precioventa*cantidad),
         AVG(cantidad),
         MIN(precioventa),
         MAX(precioventa)
  FROM ventas
  GROUP BY nocliente, fecha
  HAVING SUM(precioventa*cantidad) > 200;
  ```

- **Funciones agregadas para toda la tabla**:
  ```sql
  SELECT SUM(cantidad), SUM(precioventa*cantidad),
         AVG(cantidad), MIN(precioventa), MAX(precioventa)
  FROM ventas;
  ```

