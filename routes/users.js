var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
//Model Connections
const Musteri = require('../models/Musteri');
const Atm = require('../models/Atm');
const Wallet = require('../models/Wallet');
const Personel = require('../models/Personel');
const Balance = require('../models/Balance');

//Personal Register endpoint on DB
router.post('/signup/personel', async (req, res, next) => {
  try {
    const { name, surname, tc } = req.body;

    const personel = new Personel({
      name: name,
      surname: surname,
      tc: tc
    });

    const savedPersonel = await personel.save();
    res.json(savedPersonel);
  } catch (error) {
    res.json(error);
  }
});
//User Register endpoint on DB
router.post('/signup', async (req, res, next) => {
  try {
    const { name, surname, tc, password } = req.body;

    const user = new Musteri({
      name: name,
      surname: surname,
      tc: tc,
      password: password
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    res.json(error);
  }
});
//ATM Creationg Endpoint on DB
router.post('/createatm', async (req, res, next) => {
  try {
    const { semt, bes, on, yirmi, elli, yuz, ikiyuz } = req.body;

    const atm = new Atm({
      semt,
      bes,
      on,
      yirmi,
      elli,
      yuz,
      ikiyuz
    });

    const savedAtm = await atm.save();
    res.json(savedAtm);
  } catch (error) {
    res.json(error);
  }
});
//Users Bank account balance creation on DB
router.post('/createbalance', async(req,res,next)=>{
  try {
    const { tc,bakiye } = req.body;

    const balance = new Balance({
      tc,
      bakiye
    });

    const savedBalance = await balance.save();
    res.json(savedBalance);
  } catch (error) {
    res.json(error);
  }



});
//Users cash money stock creation on DB
router.post('/createwallet', async (req, res, next) => {
  try {
    const { tc, bes, on, yirmi, elli, yuz, ikiyuz } = req.body;

    const wallet = new Wallet({
      tc,
      bes,
      on,
      yirmi,
      elli,
      yuz,
      ikiyuz
    });

    const savedWallet = await wallet.save();
    res.json(savedWallet);
  } catch (error) {
    res.json(error);
  }
});
//ATM Loader Person's endpoint for loading atm
router.post('/atmload/:_id/:tc', async (req, res, next) => {
  try {
    const atmId = req.params._id;
    const personelTc = req.params.tc;
    const personel = await Personel.findOne({ tc: personelTc });
    const dolum = await Wallet.findOne({ tc: personelTc });
    const atm = await Atm.findById(atmId);
    let bes = req.body.beslik;
    let on = req.body.onluk;
    let yirmi = req.body.yirmilik;
    let elli = req.body.ellilik;
    let yuz = req.body.yuzluk;
    let ikiyuz = req.body.ikiyuzluk;

    if (!personel) {
      throw new Error('Personel bulunamadi');
    }
    atm.ikiyuz += parseInt(ikiyuz);
      atm.yuz += parseInt(yuz);
      atm.elli += parseInt(elli);
      atm.yirmi += parseInt(yirmi);
      atm.on += parseInt(on);
      atm.bes += parseInt(bes);

      dolum.ikiyuz -= parseInt(ikiyuz);
      dolum.yuz -= parseInt(yuz);
      dolum.elli -= parseInt(elli);
      dolum.yirmi -= parseInt(yirmi);
      dolum.on -= parseInt(on);
      dolum.bes -= parseInt(bes);
      await atm.save();
      await personel.save();

    
    res.json({ message: 'ATM Doldurma işlemi tamamlandi' });
  } catch (error) {
    res.json(error);
  }
});
//Users depositing cash money endpoint
router.post('/deposit/:_id/:tc', async (req, res, next) => {
  try {
    const atmId = req.params._id; 
    const musteriTc = req.params.tc;
    let bes = req.body.beslik;
    let on = req.body.onluk;
    let yirmi = req.body.yirmilik;
    let elli = req.body.ellilik;
    let yuz = req.body.yuzluk;
    let ikiyuz = req.body.ikiyuzluk;
    
    const atm = await Atm.findById(atmId); 
    const musteri = await Wallet.findOne({ tc: musteriTc })

    
    if (!atm || !musteri) {

    
      throw new Error('ATM veya müşteri bulunamadi');
    }
      atm.ikiyuz += parseInt(ikiyuz);
      atm.yuz += parseInt(yuz);
      atm.elli += parseInt(elli);
      atm.yirmi += parseInt(yirmi);
      atm.on += parseInt(on);
      atm.bes += parseInt(bes);

      musteri.ikiyuz -= parseInt(ikiyuz);
      musteri.yuz -= parseInt(yuz);
      musteri.elli -= parseInt(elli);
      musteri.yirmi -= parseInt(yirmi);
      musteri.on -= parseInt(on);
      musteri.bes -= parseInt(bes);

      await atm.save();
      await musteri.save();

    

      res.json({ message: 'Para yatirma işlemi tamamlandi' });
  } catch (error) {
    res.json(error);
  }
});
//Users withdrawing cash money endpoint
router.post('/withdraw/:_id/:tc', async (req, res, next) => {
  try {
    const atmId = req.params._id; 
    const musteriTc = req.params.tc; 
    let tutar = req.body.tutar;

  
    const atm = await Atm.findById(atmId); 
    const musteri = await Wallet.findOne({ tc: musteriTc })
    
    console.log(atm)
    console.log(musteri)
    if (!atm || !musteri) {

    
      throw new Error('ATM veya müşteri bulunamadi');
    }

      let remaining = tutar;
      let count200 = 0;
      let count100 = 0;
      let count50 = 0;
      let count20 = 0;
      let count10 = 0;
      let count5 = 0;
      
      
      if (remaining >= 200 && atm.ikiyuz > 0) {
        count200 = Math.min(Math.floor(remaining / 200), atm.ikiyuz);
        remaining = remaining % 200;
      }
      if (remaining >= 100 && atm.yuz > 0) {
        count100 = Math.min(Math.floor(remaining / 100), atm.yuz);
        remaining = remaining % 100;
      }
      if (remaining >= 50 && atm.elli > 0) {
        count50 = Math.min(Math.floor(remaining / 50), atm.elli);
        remaining = remaining %50;
      }
      if (remaining >= 20 && atm.yirmi > 0) {
        count20 = Math.min(Math.floor(remaining / 20), atm.yirmi);
        remaining = remaining % 20
      }
      if (remaining >= 10 && atm.on > 0) {
        count10 = Math.min(Math.floor(remaining / 10), atm.on);
        remaining = remaining % 10;
      }
      if (remaining >= 5 && atm.bes > 0) {
        count5 = Math.min(Math.floor(remaining / 5), atm.bes);
        remaining = remaining % 5;
      }
      
      if (remaining > 0) {
        while (remaining > 0) {
          if (remaining >= 200 && count200 > atm.ikiyuz) {
            remaining -= atm.ikiyuz * 200;
            count200 = atm.ikiyuz;
          } else if (remaining >= 100 && count100 > atm.yuz) {
            remaining -= atm.yuz * 100;
            count100 = atm.yuz;
          } else if (remaining >= 50 && count50 > atm.elli) {
            remaining -= atm.elli * 50;
            count50 = atm.elli;
          } else if (remaining >= 20 && count20 > atm.yirmi) {
            remaining -= atm.yirmi * 20;
            count20 = atm.yirmi;
          } else if (remaining >= 10 && count10 > atm.on) {
            remaining -= atm.on * 10;
            count10 = atm.on;
          } else if (remaining >= 5 && count5 > atm.bes) {
            remaining -= atm.bes * 5;
            count5 = atm.bes;
          } else {
            const otherAtms = await Atm.find({ _id: { $ne: atmId } }); 
              for (let i = 0; i < otherAtms.length; i++) {
                const otherAtm = otherAtms[i];

                
                if (
                  otherAtm.ikiyuz >= count200 &&
                  otherAtm.yuz >= count100 &&
                  otherAtm.elli >= count50 &&
                  otherAtm.yirmi >= count20 &&
                  otherAtm.on >= count10 &&
                  otherAtm.bes >= count5
                  )
                  {
                    console.log("Onerilen ATM'de işlem yapabilirsiniz"+ otherAtm.semt)
                  }
                  
                }
                break
            }
        }
          
      }
      atm.ikiyuz -= count200;
      atm.yuz -= count100;
      atm.elli -= count50;
      atm.yirmi -= count20;
      atm.on -= count10;
      atm.bes -= count5;

      musteri.ikiyuz += count200;
      musteri.yuz += count100;
      musteri.elli += count50;
      musteri.yirmi += count20;
      musteri.on += count10;
      musteri.bes += count5;

      console.log('200 x ' + count200)
      console.log('100 x ' + count100)
      console.log('50 x ' + count50)
      console.log('20 x ' + count20)
      console.log('10 x ' + count10)
      console.log('5 x ' + count5)


  
    await atm.save();
   
    await musteri.save();
    


    res.json({ message: 'İslem basarıyla tamamlandı ' });
  } catch (error) {
    res.json({ error: error.message });
  }
});
//P2P money transfer endpoint
router.post('/sendmoney/:tc', async(req,res,next)=> {
  try{
  const musteriTc = req.params.tc;
  const recieverTc = req.body.tc;
  let tutar = req.body.tutar;
  

  const sender = await Balance.findOne({ tc: musteriTc })
  const reciever = await Balance.findOne({ tc: recieverTc })
  if (!musteriTc || !reciever) {

      throw new Error('ATM veya müşteri bulunamadi');
  }

  if(sender.bakiye < tutar)
    console.log('Yetersiz Bakiye')
  else
  {
    sender.bakiye -= parseInt(tutar)
    reciever.bakiye +=  parseInt(tutar)
    console.log("Hesabinizdan "+ tutar +" TL Para transferi gerçekleşti.İşlem sonrasi bakiye :"+ sender.bakiye)
  }
      await sender.save();
      await reciever.save();


      res.json({ message: 'Para Transfer İşlemi tamamlandi' });
}catch (error) {
  res.json({ message: 'ATM veya müşteri bulunamadi' });
}




});

module.exports = router;
