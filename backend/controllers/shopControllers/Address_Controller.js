import Address_Schema from "../../models/Address.model.js";

const add_Address = async (req, res) => {
  try {
    const { city, address, pincode, phone, notes, userId } = req.body;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "please provide userId",
      });
    }

    if (!city && !address && !pincode) {
      return res.status(404).json({
        success: false,
        message: "Provide essential data must",
      });
    }

    const add_address = await Address_Schema.create({
      city,
      address,
      pincode,
      phone,
      notes,
      userId,
    });

    await add_address.save();

    res.status(201).json({
      success: true,
      data: add_address,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong..." || error.message,
    });
  }
};
const fetchall_Address = async (req, res) => {
  try {
    const { userId } = req.params;

    const address = await Address_Schema.find({ userId });

    if (!address) {
      return res.status(404).json({
        message: "address not found invalid user or inccorect id",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong..." || error.message,
    });
  }
};
const update_Address = async (req, res) => {
  try {
    const { addressId, userId } = req.params;
    const {formdata} = req.body;
    if (!userId || !addressId) {
      return res.status(404).json({
        success: false,
        message: "please provide userId or addressId",
      });
    }

    const edit_address = await Address_Schema.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formdata,
      { new: true }
    );

    if (!edit_address) {
      return res.status(404).json({
        success: false,
        message: "address not found",
      });
    }

    res.status(200).json({
      success: true,
      data: edit_address,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong..." || error.message,
    });
  }
};
const delete_Address = async (req, res) => {
  try {
    const { addressId, userId } = req.params;

    if (!userId || !addressId) {
      return res.status(404).json({
        success: false,
        message: "incorrect data userId or addressId",
      });
    }

    const DeleteAddress = await Address_Schema.findOneAndDelete({
      _id: addressId,
      userId,
    });

    if (!DeleteAddress) {
      return res.status(404).json({
        success: false,
        message: "address not found",
      });
    }

    res.status(200).json({
      success : true,
      message: "Address Deleted successfully...",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong..." || error.message,
    });
  }
};

export { add_Address, delete_Address, update_Address, fetchall_Address };
