const corsOptions = {
    origin: ' 192.168.1.254', // Permite solo este origen
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type,Authorization', // Cabeceras permitidas
  };

export  default corsOptions
  