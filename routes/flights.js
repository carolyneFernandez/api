var express = require('express');
var router = express.Router();

/* get users listing. */
router.get('/', async (req, res, next) => {
  try {
    const {FLights} = req.db;
    //lo hemos puesto por qur es un parametro definido en swagger
    const flightNumber= req.query.flightNumber;
    const company= req.query.company;
    const departure= req.query.departure;
    const destination= req.query.destination;
    const date= req.query.date;
    const status= req.query.status;

    const flights = await FLights.findAll();
    return res.status(200).send(flights);
  } catch (err) {
    next(err);
  }
});
//Creer un vol avec les donnes qui viennent dans le req.body
//req.query /req.body /req.
// Post /flights/new
router.post('/', async (req, res, next) => {
    try {
        const data= req.body;
       // console.log(data);
        if (!data.flightNumber || !data.company || !data.departure||!data.destination || !data.date){
            return res.status(400).send("Missing data");
        }
        const {FLights} = req.db;
        const flight=await FLights.findOne({where: {flightNumber: data.flightNumber}})
        if(flight){
            return res.status(400).send("Il y a dejà un vol avec le flighNumber" + data.flightNumber)
        }

        const newFlight= await FLights.create(data);
        return res.status(201).send(newFlight);

    } catch (err) {
        next(err);
    }
    /*try {
      //lo hemos puesto por qur es un parametro definido en swagger
     /* const flightNumber= req.body.flightNumber;
      const company= req.body.company;
      const departure= req.body.departure;
      const destination= req.body.destination;
      const date= req.body.date;
      const status= req.body.status;

     const flights = await FLights.create({flightNumber,company,departure,destination,date,status});
    return res.status(201).send(flights);
    } catch (err) {
      next(err);
    }*/
  });
module.exports = router;
