declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        BASE_URL: string;
        //TUTAJ RESZTA 
      }
    }
  }
  
  export {}