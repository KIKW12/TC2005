# Arquitectura Modelo-Vista-Controlador (MVC)

Este texto explica la arquitectura **Modelo-Vista-Controlador (MVC)** como una forma de organizar el código de una aplicación web para evitar que se convierta en un "spaghetti". Este problema surge porque un código con muchas responsabilidades genera **deuda técnica**. 

Para solucionar esto, se aplica el **principio SRP (Single Responsibility Principle)** mediante el uso de capas.

## Componentes de MVC

MVC se compone de tres capas principales:

- **Controlador**: Tiene la responsabilidad de **recibir las peticiones del cliente y procesarlas**. El **router** es la capa que **recibe estas peticiones y las dirige al controlador adecuado**. A veces, el router no es explícito y se considera parte o una capa del controlador.  
  Las interacciones con el servidor web se realizan mediante **HTTP Requests (GET, POST)** y **HTTP Responses (HTML)**, además del procesamiento de scripts y generación de HTML.

- **Vista**: Es la capa que se encarga de **generar la interfaz para el usuario**. Esto implica **separar el código HTML del código JavaScript del servidor**.

- **Modelo**: Representa y maneja **los datos de la aplicación**. Esta capa es la que **se comunica con la base de datos**, en caso de que la aplicación la utilice. De esta manera, se **separa la lógica del negocio del código que manipula los datos**.

## Resumen

MVC es un **estilo arquitectónico** que ayuda a organizar el código en capas con responsabilidades específicas:

- **Modelo**: Para los datos  
- **Vista**: Para la interfaz  
- **Controlador**: Para la lógica de negocio y la recepción de peticiones  

Esto mejora la **mantenibilidad del código** y reduce la **deuda técnica**.
