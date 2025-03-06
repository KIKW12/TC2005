## Términos y conceptos clave

- Un **diagrama de interacción** muestra una interacción o conjunto de objetos, sus relaciones y los mensajes entre ellos.
- Un **diagrama de secuencia** es un tipo de diagrama de interacción que destaca el orden temporal. Consta de un eje x para objetos y un eje y para mensajes.
- Un **diagrama de colaboración** destaca la organización estructural y es una colección de nodos y arcos.
- Los **diagramas de secuencia** modelan la interacción entre objetos en un sistema. También se les conoce como "sequence diagram", "event-trace diagrams" o "event scenarios".
- Los diagramas de secuencia muestran la interacción de un conjunto de objetos en una aplicación a través del tiempo y se modela para cada caso de uso, describiendo métodos particulares de una clase. Contienen detalles de implementación del escenario, incluyendo los objetos y clases que se usan para implementar el escenario, y mensajes intercambiados entre los objetos.

## Componentes de un diagrama de secuencia

- **Línea de vida**: Una línea discontinua vertical que representa la existencia de un objeto.
- **Foco de control**: Un rectángulo delgado que representa el período de tiempo en que un objeto ejecuta una acción.
- **Creación y destrucción de objetos**: Los diagramas de secuencia pueden representar la creación de objetos mediante el estereotipo `<<create>>` y la destrucción de objetos mediante el estereotipo `<<destroy>>`.

## Tipos de flujo de control (mensajes)

- **Síncrono**: Se corresponden con llamadas a métodos del objeto que recibe el mensaje. El objeto que envía el mensaje queda bloqueado hasta que termina la llamada. Este tipo de mensajes se representan con flechas de cabeza llena.
- **Asíncrono**: Terminan inmediatamente y crean un nuevo hilo de ejecución dentro de la secuencia. Se representan con flechas de cabeza abierta.
- **Retorno de una llamada a procedimiento**: Representa la respuesta a un mensaje con una flecha discontinua. Puede omitirse si queda claro por el fin de la activación.

## Usos de los diagramas de secuencia

- **De instancia**: Describe un escenario específico (una instancia de la ejecución de un caso de uso).
- **Genérico**: Describe la interacción para un caso de uso; utiliza ramificaciones (*Branches*), condiciones y bucles.

## Fragmentos combinados y operadores

Un **fragmento combinado** es una o más secuencias de procesos incluidas en un marco y ejecutadas bajo circunstancias nombradas específicas. Algunos operadores comunes incluyen:

- **Alternativa (`alt`)**: Elección (mediante una guarda) de una interacción. Modela estructuras `if...then...else`.
- **Opción (`opt`)**: Equivale a un operador `alt` con un solo fragmento. Se ejecuta si la guarda se cumple. Modela estructuras `switch`.
- **Bucle (`loop`)**: El fragmento se ejecuta múltiples veces. La guarda indica cómo realizar la iteración.
- **Diagrama de secuencia (`sd`)**: Rodea un diagrama de secuencia.
- **Referencia (`ref`)**: El marco hace referencia a una interacción definida en otro diagrama. El marco dibujado cubre las líneas involucradas en la interacción e incluye parámetros y un valor de retorno.
- **Paralelo (`par`)**: Cada fragmento se ejecuta en paralelo.
- **Región crítica (`critical`)**: Sólo puede haber un proceso ejecutando simultáneamente el fragmento.
