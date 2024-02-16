const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = 'YOUR_MONGODB_URI/DATABASE_NAME';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const gameDataSchema = new mongoose.Schema({
  coins: Number,
  monsterHP: Number,
  clickDamage: Number,
  dps: Number,
  mana: Number, 
  upgradeHelmetCost: Number,
  upgradeChestplateCost: Number,
  upgradeLeggingsCost: Number,
  upgradeBootsCost: Number,
  upgradeWeaponCost: Number,
  upgradeShieldCost: Number,
});

const GameData = mongoose.model('GameData', gameDataSchema);

app.post('/api/save-game-data', async (req, res) => {
  const { coins, monsterHP, clickDamage, dps, mana,
    upgradeHelmetCost, upgradeChestplateCost, upgradeLeggingsCost, upgradeBootsCost, upgradeWeaponCost, upgradeShieldCost} = req.body;

  try {
    const updatedGameData = await GameData.findOneAndUpdate(
      {},
      {
        coins,
        monsterHP,
        clickDamage,
        dps,
        mana, 
        upgradeHelmetCost,
        upgradeChestplateCost,
        upgradeLeggingsCost,
        upgradeBootsCost,
        upgradeWeaponCost,
        upgradeShieldCost,
      },
      { upsert: true, new: true }
    );

    res.json(updatedGameData);
  } catch (error) {
    console.error('Error saving game data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/load-game-data', async (req, res) => {
  try {
    const latestGameData = await GameData.findOne().sort({ _id: -1 }).exec();

    if (latestGameData) {
      res.json(latestGameData);
    } else {
      const defaultGameData = {
        coins: 1000,
        monsterHP: 10,
        clickDamage: 1,
        dps: 0,
        mana: 10,
        upgradeHelmetCost: 10,
        upgradeChestplateCost: 40,
        upgradeLeggingsCost: 30,
        upgradeBootsCost: 20,
        upgradeWeaponCost: 20,
        upgradeShieldCost: 40,
      };

      const newGameData = await GameData.create(defaultGameData);
      res.json(newGameData);
    }
  } catch (error) {
    console.error('Error loading game data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
