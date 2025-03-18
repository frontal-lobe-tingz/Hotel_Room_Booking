import Hotel from "../models/Hotel.js";

// Create
export const createdHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const savedHotel = await newHotel.save();
        res.status(201).json(savedHotel);
    } catch (e) {
        next(e);
    }
};

// Update
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(updatedHotel);
    } catch (e) {
        next(e);
    }
};

// Delete
export const deleteHotel = async (req, res, next) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
        if (!deletedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.status(200).json(deletedHotel);
    } catch (e) {
        next(e);
    }
};

// Get all
export const getAllHotels = async (req, res, next) => {
    const { min, max, limit, ...others } = req.query;
  
    try {
      // Convert min and max to numbers, with default values if they are undefined
      const minPrice = Number(min) || 1;
      const maxPrice = Number(max) || 999;
  
      // Convert limit to a number, with a default value if undefined
      const limitResults = Number(limit) || 0;
  
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: { $gt: minPrice, $lt: maxPrice },
      }).limit(limitResults); // Apply the limit here
  
      res.status(200).json(hotels);
    } catch (err) {
      next(err);
    }
  };

// Get by ID
export const getHotelById = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }
        res.json(hotel);
    } catch (e) {
        next(e);
    }
};

export const countByCity = async (req, res, next) => {
    try {
        if (!req.query.cities) {
            return res.status(400).json({ message: "Cities query parameter is required" });
        }

        const cities = req.query.cities.split(",");
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city });
        }));

        res.status(200).json(list);
    } catch (e) {
        next(e);
    }
};

export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "Hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };

