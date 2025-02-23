# Resumen de las Reglas de Traslado del Modelo Entidad-Relación a Tablas

## Introducción
Para implementar un Modelo Entidad-Relación (MER) en una base de datos relacional, es necesario convertirlo a un Modelo Relacional (MR), representado mediante tablas.

La notación utilizada para definir tablas es:

```
nombretabla(nombrecolumna1, nombrecolumna2, ..., nombrecolumnaN)
```

Las columnas subrayadas representan la llave primaria de la tabla, garantizando la unicidad de cada fila.

---

## Procedimiento de Transferencia

### 1. Creación de Tablas para Entidades
Por cada entidad en el MER:
- Se crea una tabla con el mismo nombre.
- Las columnas corresponden a los atributos de la entidad.
- La llave primaria es el identificador de la entidad.
- Si no hay identificador definido, se debe crear una llave primaria artificial.

### 2. Creación de Tablas para Asociaciones N:N
Por cada asociación con cardinalidad **N:N**:
- Se crea una tabla con los identificadores de las entidades involucradas.
- Se incluyen los atributos propios de la asociación.
- La llave primaria es la concatenación de las llaves de las entidades.
- Puede añadirse una llave artificial por eficiencia.

Ejemplo:
```
A(a1, a2, a3)
B(b1, b2)
C(c1, c2, c3, c4)
X(a1, c1, x1, x2)   -- Representando una asociación N:N
```

### 3. Manejo de Asociaciones 1:N
Por cada asociación con cardinalidad **1:N**:
- La tabla de la entidad con cardinalidad **N** incluye la llave primaria de la entidad con cardinalidad **1**.
- No se crea una nueva tabla.

Ejemplo:
```
B(b1, b2, a1)  -- Se agrega a1 a B para representar la relación con A
```

### 4. Manejo de Asociaciones 1:1
Por cada asociación con cardinalidad **1:1**:
- Se agrega la llave primaria de una tabla en la otra.
- No importa en qué orden.

---

## Reglas para Elementos Adicionales del MER

### 1. Relaciones ISA (Herencia entre Entidades)
Las relaciones **ISA** tienen cardinalidad **1:1**. La entidad especializadora hereda el identificador de la entidad generalizadora.

Ejemplo:
```
G   (g1, g2, g3)   -- Entidad generalizadora
Ea  (g1, a1, a2)   -- Entidad especializadora 1
Eb  (g1, b1)       -- Entidad especializadora 2
```

### 2. Entidades Fuertes y Débiles
Las entidades débiles dependen de una entidad fuerte y heredan su identificador, añadiendo una columna adicional para distinguir las tuplas.

Ejemplo:
```
F (f1, f2)    -- Entidad fuerte
D (f1, d1, d2) -- Entidad débil (incluye f1 como parte de su llave primaria)
```

### 3. Roles en Relaciones Reflexivas
Cuando una entidad se relaciona consigo misma o existen múltiples relaciones entre dos entidades, se usan **roles** para distinguir los identificadores heredados.

Ejemplo:
```
E(e1, e2)
R(e1, RolDeEe1, r1, r2) -- Se usa un rol para evitar nombres repetidos en la tabla
```

---

## Conclusión
El procedimiento de transformación del MER al MR implica:
- Creación de tablas para entidades.
- Definición de tablas intermedias para asociaciones N:N.
- Herencia de llaves en asociaciones 1:N y 1:1.
- Manejo de relaciones ISA, entidades débiles y roles para mantener la coherencia de los identificadores.

Este método garantiza una correcta normalización y estructura relacional en la base de datos.

