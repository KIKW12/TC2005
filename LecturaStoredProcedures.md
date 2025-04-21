# Procedimientos Almacenados

Un **procedimiento almacenado** son sentencias SQL encapsuladas dentro de la sentencia `CREATE PROCEDURE`. El procedimiento almacenado puede contener declaraciones condicionales como `IF` o `CASE`, así como ciclos. También puede ejecutar otros procedimientos almacenados o funciones que ayudan a modularizar el código.

## Beneficios de un procedimiento almacenado

### 🔻 Reducir el tráfico de red
Se encapsulan varias sentencias SQL en un procedimiento almacenado. Al ejecutarlo, en lugar de enviar múltiples consultas (comandos SQL), solo se envía el nombre del procedimiento y sus parámetros.

### 🛠️ Fácil de mantener
El procedimiento almacenado es reutilizable. Podemos implementar la lógica de negocio dentro de un procedimiento y permitir que diversas aplicaciones o módulos lo usen. Esto aumenta la consistencia en la base de datos. Si se requiere un cambio, basta con modificar el procedimiento almacenado.

### 🔒 Seguro
Los procedimientos almacenados son más seguros que las consultas AdHoc (hechas a medida). Se puede otorgar permiso para ejecutar el procedimiento sin conceder acceso directo a las tablas que utiliza. Esto ayuda a prevenir ataques de inyección SQL.
