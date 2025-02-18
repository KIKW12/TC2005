# Bases de Datos

- En el pasado, los datos estaban supeditados a los programas de aplicación, lo que resultaba en redundancia e inconsistencia de datos.
- El enfoque de bases de datos busca diseñar los datos de una empresa para describirla en su totalidad, evitando la repetición de datos.
- Una base de datos es una colección de archivos interrelacionados, diseñados cuidadosamente para minimizar la repetición de datos y cubrir las necesidades de la empresa.
- Los archivos en una base de datos contienen múltiples ocurrencias de un mismo tipo de registro, como alumnos, cursos o inscripciones.
- El uso de un sistema administrador de bases de datos (DBMS) marca la diferencia entre una base de datos y un sistema de archivos.
- Es conveniente usar bases de datos cuando la información presenta varios archivos interrelacionados y es requerida por varios usuarios o aplicaciones.

## Sistema de Gestión de Base de Datos (DBMS)

- Un DBMS consiste en una colección de datos interrelacionados y un conjunto de programas para acceder a esos datos, con el objetivo de proporcionar un entorno eficiente para extraer y almacenar información.
- Los sistemas de bases de datos están diseñados para gestionar grandes bloques de información, definiendo estructuras para el almacenamiento y proporcionando mecanismos para la gestión, seguridad y consistencia de la información.
- Un DBMS debe mantener la seguridad de la información almacenada, evitar resultados anómalos cuando los datos son compartidos y garantizar la integridad de los datos.
- Un gestor de base de datos es un módulo de programa que proporciona el interfaz entre los datos de bajo nivel almacenados en la base de datos y los programas de aplicación y consultas hechas al sistema.

### Tareas del gestor de base de datos:

- **Interacción con el gestor de archivos** para el almacenamiento, recuperación y actualización de datos.
- **Implantación de la integridad, seguridad y control de concurrencia**.
- **Copia de seguridad y recuperación** de la base de datos ante fallos.

## Objetivos de los Sistemas de Base de Datos

- Un sistema de procesamiento de archivos tradicional presenta desventajas como:
  - Redundancia e inconsistencia de datos.
  - Dificultad para acceder a los datos.
  - Aislamiento de los datos.
  - Anomalías del acceso concurrente.
  - Problemas de seguridad.
  - Problemas de integridad.
- Los sistemas de gestión de bases de datos (DBMS) se desarrollan para resolver estos problemas.
- Las bases de datos empresariales pueden medirse en **gigabytes o terabytes** y se almacenan en discos, requiriendo una estructuración eficiente para minimizar el movimiento de datos entre el disco y la memoria principal.
- El objetivo de un sistema de bases de datos es **simplificar y facilitar el acceso a los datos**, proporcionando vistas de alto nivel y garantizando un funcionamiento eficiente.
