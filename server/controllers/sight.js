import Sight from '../models/Sight.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

export const addSight = async (req, res) => {
  try {
    const { img, name, text, city, type } = req.body;
    const isAdded = await Sight.findOne({ name });

    if (isAdded) {
      return res.status(400).json({ message: 'This sight already exists' });
    }

    // if (req.files) {
    //   let fileName = Date.now().toString() + req.files.image.name;
    //   const __dirname = dirname(fileURLToPath(import.meta.url));
    //   req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
    // }
    const newSight = new Sight({
      name,
      text,
      img,
      type,
      city,
    });

    await newSight.save();
    console.log(newSight);
    res.json(newSight);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during adding sight',
      e: e.message,
    });
  }
};

export const updateSight = async (req, res) => {
  try {
    const { name, text, _id: id } = req.body;
    const sight = await Sight.findById(id);
    if (sight) {
      sight.name = name;
      sight.text = text;
      await sight.save();
      return res.json(sight);
    }
    res.status(400).json({ message: 'No such sight' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during updating sight',
      e: e.message,
    });
  }
};

export const getAllSights = async (req, res) => {
  try {
    const sights = await Sight.find();
    if (!sights) {
      return res.status(400).json({ message: 'No sights' });
    }
    res.json(sights);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during getting sights',
      e: e.message,
    });
  }
};

export const getSightById = async (req, res) => {
  try {
    const sight = await Sight.findById(req.params.id);
    if (!sight) {
      return res.status(400).json({ message: 'No such sight' });
    }
    res.json(sight);
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during getting sight',
      e: e.message,
    });
  }
};

export const removeSight = async (req, res) => {
  try {
    const sight = await Sight.findByIdAndDelete(req.params.id);
    if (!sight) {
      return res.status(400).json({ message: 'No such sight' });
    }

    res.json({ message: 'Sight was deleted' });
  } catch (e) {
    res.status(400).json({
      message: 'Error occured during removing sight',
      e: e.message,
    });
  }
};
