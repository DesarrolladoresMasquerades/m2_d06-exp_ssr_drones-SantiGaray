const express = require('express');
const router = express.Router();

const Drone = require("../models/Drone.model")
// require the Drone model here


router
  .post('/drones/:id/delete', (req, res, next) => {
      const id = req.params.id;
      Drone.findByIdAndDelete(id)            // Iteration #5: Delete the drone
        .then(() => res.redirect("/drones"))
        .catch(() => `Error while deleting the drone`)
});


router
  .route('/drones/:id/update')
  .get((req, res, next) => {
    const id = req.params.id;
  Drone.findById(id)
    .then((drone) => {
      console.log(drone);
      res.render("drones/update-form", drone) // Iteration #4: Update the drone
    })
  })
  .post((req, res, next) => {
    const id = req.params.id;

    const name = req.body.name;
    const propellers = req.body.propellers;
    const maxSpeed = req.body.maxSpeed;
    
    Drone.findByIdAndUpdate(id,{ name, propellers, maxSpeed })
    .then(() => {
      res.redirect( "/drones" );
    });
  });
    
  





router
  .route('/drones/create')
  .get((req, res, next) => {
    res.render("drones/create-form")    // Iteration #3: Add a new drone
  })
  .post((req, res, next) => {
  
  const name = req.body.name;
  const propellers = req.body.propellers;
  const maxSpeed = req.body.maxSpeed;

  Drone.create({name, propellers, maxSpeed})
    .then(()=>res.redirect("/drones"))
    .catch((error) => `Error while creatin a new drone: ${error}`)
});

router.get('/drones', (req, res, next) => {
  Drone.find()
    .then((drones)=>{
  
      res.render("drones/list",{drones});
    })
    .catch((err) => console.log("DB error reading '/drones'"))
  });



module.exports = router;
