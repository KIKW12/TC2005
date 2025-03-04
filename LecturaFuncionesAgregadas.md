## SQL y Álgebra Relacional

SQL es el lenguaje utilizado por los DBMS para definir y utilizar bases de datos. Las consultas en SQL están ligadas a la obtención de relaciones mediante el álgebra relacional. Todas las consultas expresables con álgebra relacional pueden representarse con sentencias SQL.

### Sintaxis básica de una consulta SQL

La sintaxis básica de una consulta SQL incluye las cláusulas `SELECT`, `FROM` y `WHERE`:
- `SELECT`: Especifica las columnas a seleccionar.
- `FROM`: Indica las tablas participantes.
- `WHERE`: Define las condiciones que se deben cumplir.

### Equivalencia entre Álgebra Relacional y SQL

La lectura ilustra la equivalencia entre la notación del álgebra relacional y SQL mediante ejemplos basados en un esquema de referencia. Se presenta una notación específica para los operadores del álgebra relacional, como:
- `SL` (Selección)
- `PR` (Proyección)
- `JN` (Reunión Natural)
- `UN` (Unión)
- `IN` (Intersección)
- `-` (Diferencia)
- `X` (Producto Cartesiano)

#### Ejemplos de equivalencia:
- **Consulta de una relación:**
  ```sql
  SELECT * FROM materiales;
  ```
  Equivalente a `SL{clave=1000}(materiales)`.
- **Selección:**
  ```sql
  SELECT * FROM materiales WHERE clave=1000;
  ```
- **Proyección:**
  ```sql
  SELECT clave, rfc, fecha FROM entregan;
  ```
  Equivalente a `PR{clave,rfc,fecha} (entregan)`.
- **Reunión natural:**
  ```sql
  SELECT * FROM entregan, proveedores WHERE entregan.rfc = proveedores.rfc;
  ```
  Equivalente a `entregan JN proveedores`.
- **Unión:**
  ```sql
  (SELECT * FROM entregan WHERE clave=1000) UNION (SELECT * FROM entregan WHERE clave=2000);
  ```
  Equivalente a `SL{clave=1000}(entregan) UN SL{clave=2000}(entregan)`.
- **Intersección:** (Solo en Oracle)
  ```sql
  (SELECT clave FROM entregan WHERE numero=5001) INTERSECT (SELECT clave FROM entregan WHERE numero=5018);
  ```
  Equivalente a `PR{clave}(SL{numero=5001}(entregan)) IN PR{clave}(SL{numero=5018}(entregan))`.
- **Diferencia:** (Solo en Oracle)
  ```sql
  (SELECT * FROM entregan) MINUS (SELECT * FROM entregan WHERE clave=1000);
  ```
  Equivalente a `entregan - SL{clave=1000}(entregan)`.
- **Producto cartesiano:**
  ```sql
  SELECT * FROM entregan, materiales;
  ```
  Equivalente a `entregan X materiales`.

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

#### Funciones Agregadas:
- `AVG` (promedio)
- `MIN` (mínimo)
- `MAX` (máximo)
- `COUNT(*)` (número de tuplas)
- `COUNT(expresión)` (número de tuplas no nulas)
- `STD` (desviación estándar)

#### Ejemplos de Agregación:
- **Cantidad vendida por producto:**
  ```sql
  SELECT codproducto, SUM(cantidad) FROM ventas GROUP BY codproducto;
  ```
- **Cantidad vendida por día de cada producto:**
  ```sql
  SELECT codproducto, fecha, SUM(cantidad) FROM ventas GROUP BY codproducto, fecha;
  ```
- **Ejemplo completo:**
  ```sql
  SELECT nocliente, fecha, SUM(cantidad), SUM(precioventa*cantidad), AVG(cantidad), MIN(precioventa), MAX(precioventa)
  FROM ventas
  GROUP BY nocliente, fecha
  HAVING SUM(precioventa*cantidad) > 200;
  ```
- **Funciones agregadas para toda la tabla:**
  ```sql
  SELECT SUM(cantidad), SUM(precioventa*cantidad), AVG(cantidad), MIN(precioventa), MAX(precioventa) FROM ventas;
  ```

### Tipos de JOIN en SQL

#### **INNER JOIN**
Combina registros de dos tablas cuando hay concordancia de valores en un campo común.
```sql
SELECT campos FROM tb1 INNER JOIN tb2 ON tb1.campo1 comp tb2.campo2;
```
- `tb1`, `tb2`: Nombres de las tablas.
- `campo1`, `campo2`: Nombres de los campos que se combinan. Deben ser del mismo tipo de datos si no son numéricos.
- `comp`: Operador de comparación relacional (`=, <>, <, >, <=, =>`).
- Se pueden enlazar varias cláusulas `ON`.
- Se pueden anidar instrucciones `JOIN`. Un `LEFT JOIN` o `RIGHT JOIN` puede anidarse dentro de un `INNER JOIN`, pero no al revés.
- En Oracle, los `INNER JOIN` no se interpretan, pero existe una sintaxis en formato ANSI que funciona en todos los sistemas.

#### **LEFT y RIGHT JOIN**
Seleccionan todos los registros de una tabla, incluso si no tienen un registro correspondiente en la otra tabla.
- `LEFT JOIN`: Toma todos los registros de la tabla de la izquierda, aunque no tengan ningún registro en la tabla de la derecha.
- `RIGHT JOIN`: Toma todos los registros de la tabla de la derecha, aunque no tengan ningún registro en la tabla de la izquierda.

#### **Consultas de Autocombinación (SELF JOIN)**
Se utilizan para unir una tabla consigo misma, comparando valores de dos columnas con el mismo tipo de datos.
```sql
SELECT alias1.columna, alias2.columna
FROM tabla1 AS alias1, tabla1 AS alias2
WHERE alias1.columna = alias2.columna AND otras condiciones;
```

#### **Consultas de Combinaciones no Comunes**
Se basan en otros operadores de combinación, tales como `NOT`, `BETWEEN`, `<>`, etc.

#### **CROSS JOIN**
Se utiliza en SQL Server para realizar consultas de unión, combinando cada fila de una tabla con cada fila de otra tabla.

#### **SELF JOIN**
Técnica para conseguir el producto cartesiano de una tabla consigo misma.

