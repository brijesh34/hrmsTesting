const multer = require('multer')

const fileStorageEngine = multer.diskStorage({

    destination: (req, file, cb) => {
      cb(null, './images')
  
    },
    filename: (req, file, cb) => {
      // cb(null,Date.now()+ '--'+ file.originalname)
      cb(null, file.originalname)
      //cb(null,"brijesh")    
  
  
  
  
    }
  
  })
  
  const upload = multer({ storage: fileStorageEngine });
  // const upload={
  //   upload2
  // }
  module.export=upload;