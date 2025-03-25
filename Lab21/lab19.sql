SELECT 
    SUM(E.Cantidad) AS TotalCantidad,
    SUM(E.Cantidad * M.Precio * (1 + M.Impuesto/100)) AS ImporteTotal
FROM Entregan E, Materiales M
WHERE E.Clave = M.Clave
AND YEAR(E.Fecha) = 1997;


SELECT 
    P.RazonSocial AS Proveedor,
    COUNT(*) AS NumeroEntregas,
    SUM(E.Cantidad * M.Precio * (1 + M.Impuesto/100)) AS ImporteTotal
FROM Entregan E, Proveedores P, Materiales M
WHERE E.RFC = P.RFC
AND E.Clave = M.Clave
GROUP BY P.RFC, P.RazonSocial
ORDER BY P.RazonSocial;


SELECT 
    M.Clave,
    M.Descripcion,
    SUM(E.Cantidad) AS CantidadTotal,
    MIN(E.Cantidad) AS CantidadMinima,
    MAX(E.Cantidad) AS CantidadMaxima,
    SUM(E.Cantidad * M.Precio * (1 + M.Impuesto/100)) AS ImporteTotal
FROM Materiales M, Entregan E
WHERE M.Clave = E.Clave
GROUP BY M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) > 400
ORDER BY CantidadTotal DESC;


SELECT 
    P.RazonSocial AS Proveedor,
    M.Clave,
    M.Descripcion,
    AVG(E.Cantidad) AS CantidadPromedio
FROM Proveedores P, Entregan E, Materiales M
WHERE P.RFC = E.RFC
AND E.Clave = M.Clave
GROUP BY P.RFC, P.RazonSocial, M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) >= 500


SELECT 
    P.RazonSocial AS Proveedor,
    M.Clave,
    M.Descripcion,
    AVG(E.Cantidad) AS CantidadPromedio
FROM Proveedores P, Entregan E, Materiales M
WHERE P.RFC = E.RFC
AND E.Clave = M.Clave
GROUP BY P.RFC, P.RazonSocial, M.Clave, M.Descripcion
HAVING AVG(E.Cantidad) < 370 OR AVG(E.Cantidad) > 450
ORDER BY CantidadPromedio;


SELECT M.Clave, M.Descripcion
FROM Materiales M
WHERE M.Clave NOT IN (
    SELECT E.Clave 
    FROM Entregan E
)
ORDER BY M.Clave;


SELECT RazonSocial
FROM Proveedores
WHERE RFC IN (
    SELECT DISTINCT RFC FROM Entregan WHERE Numero = 
        (SELECT Numero FROM Proyectos WHERE Denominacion = 'Vamos México')
)
AND RFC IN (
    SELECT DISTINCT RFC FROM Entregan WHERE Numero = 
        (SELECT Numero FROM Proyectos WHERE Denominacion = 'Querétaro Limpio')
);


SELECT Clave, Descripcion
FROM Materiales
WHERE Clave NOT IN (
    SELECT DISTINCT Clave FROM Entregan 
    WHERE Numero = (SELECT Numero FROM Proyectos WHERE Denominacion = 'CIT Yucatán')
);


SELECT 
    P.RazonSocial,
    AVG(E.Cantidad) AS PromedioEntregado
FROM Proveedores P, Entregan E
WHERE P.RFC = E.RFC
GROUP BY P.RFC, P.RazonSocial
HAVING AVG(E.Cantidad) > (
    SELECT AVG(E2.Cantidad)
    FROM Entregan E2
    WHERE E2.RFC = 'VAGO780901'
)
ORDER BY PromedioEntregado DESC;


SELECT Proveedores.RazonSocial, AVG(Entregan.Cantidad) AS PromedioCantidad
FROM Entregan
JOIN Proveedores ON Entregan.RFC = Proveedores.RFC
GROUP BY Proveedores.RazonSocial
HAVING AVG(Entregan.Cantidad) > (
    SELECT AVG(Cantidad) FROM Entregan WHERE RFC = 'VAGO780901'
);


SELECT Proveedores.RFC, Proveedores.RazonSocial
FROM Proveedores
JOIN Entregan ON Proveedores.RFC = Entregan.RFC
WHERE Entregan.Numero = (SELECT Numero FROM Proyectos WHERE Denominacion = 'Infonavit Durango')
GROUP BY Proveedores.RFC, Proveedores.RazonSocial
HAVING 
    SUM(CASE WHEN YEAR(Fecha) = 2000 THEN Cantidad ELSE 0 END) > 
    SUM(CASE WHEN YEAR(Fecha) = 2001 THEN Cantidad ELSE 0 END);
