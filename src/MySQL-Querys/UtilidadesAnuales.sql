USE `sistemo0_bd_diego`;
DROP procedure IF EXISTS `Prueba`;

DELIMITER $$
USE `sistemo0_bd_diego`$$
CREATE PROCEDURE `UtilidadesAnuales` (
    IN _Id_Empresa INT, IN _Bannys INT
)
BEGIN
declare _count int;
    declare _Mes varchar(50);
    declare _string varchar(100);
    declare _Gasto decimal(9,2);
    declare _GastoMes decimal(9,2); 

    -- Borramos la Tablas Temporales si existen
        DROP TEMPORARY TABLE IF EXISTS Utilidades;

        DROP TEMPORARY TABLE IF EXISTS RegistroGastoTemporal;
    
	-- Creamos Tabla Temporal Utilidades e Insertamos la Información de VentaSimple de los ultimos 12 meses
       CREATE TEMPORARY TABLE Utilidades(Mes varchar(50),Venta decimal(9,2), Gasto decimal(9,2), Utilidad decimal(9,2)) as(select Mes,sum(Monto) as Venta,0 as Gasto, 0 as Utilidad from VentaSimple 
       WHERE Fecha > DATE_SUB(now(), INTERVAL 12 MONTH) AND Id_Empresa=_Id_Empresa AND Bannys=_Bannys group by Mes);
    
    -- Creamos Tabla RegistroGastoTemporal e Insertamos la Información de RegistroCompras81
	   CREATE TEMPORARY TABLE RegistroGastoTemporal as (Select Mes,sum(ImporteTotal) as Gasto from RegistroCompras81 WHERE FechaEmision > DATE_SUB(now(), INTERVAL 12 MONTH)  AND Id_Empresa=_Id_Empresa AND Bannys=_Bannys group by Mes);
       
    -- Asignamos el numero de    
       select count(*) from RegistroGastoTemporal into _count;
       
       while _count>0 do
       SET _Gasto= NULL;
      
			set _Mes = (select Mes from RegistroGastoTemporal limit 1);
			set _GastoMes = (select Gasto from RegistroGastoTemporal limit 1);
            
            
             
             SELECT Gasto FROM Utilidades WHERE Mes=_Mes into _Gasto;
            
             
             IF _Gasto IS NOT NULL THEN
             	UPDATE Utilidades SET Gasto=_GastoMes where Mes=_Mes;
             ELSE
             	INSERT into Utilidades (Mes, Venta, Gasto, Utilidad)VALUES(_Mes,0,_GastoMes,0);
             END IF;
             
             UPDATE Utilidades Set Utilidad = Venta-Gasto;
            
            -- set _string=concat(_string,_Mes,_count,',');
			
			delete from RegistroGastoTemporal where Mes=_Mes;
            
           
			
			select count(*) from RegistroGastoTemporal into _count;
            -- select _count;
            
	   end while;
	
    select * from Utilidades;
END$$

DELIMITER ;


